const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DEFAULT_TIMEOUT = 15000;
const MAX_RETRIES = 1;
const RETRY_DELAY = 1000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STATUS_LABELS = {
  400: 'Bad Request — datos inválidos',
  401: 'Unauthorized — sesión expirada o sin permisos',
  403: 'Forbidden — acceso denegado',
  404: 'Not Found — recurso no encontrado',
  409: 'Conflict — recurso duplicado',
  422: 'Unprocessable Entity — datos no procesables',
  429: 'Too Many Requests — rate limit excedido',
  500: 'Internal Server Error — error en servidor',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};

function logHttpError(method, url, status, body) {
  const label = STATUS_LABELS[status] || `HTTP ${status}`;
  const color = status >= 500 ? '#ff5f5f' : status >= 400 ? '#ffd58a' : '#5fb3d4';

  console.groupCollapsed(
    `%c[HTTP ${status}]%c ${method} ${url} — ${label}`,
    `color: ${color}; font-weight: bold;`,
    'color: inherit; font-weight: normal;'
  );
  console.log('Status:', status, label);
  console.log('URL:', url);
  console.log('Method:', method);
  if (body) {
    console.log('Response body:', body);
    if (body.error) console.log('Error message:', body.error);
    if (body.code) console.log('Error code:', body.code);
    if (body.details) console.log('Details:', body.details);
    if (body.stack) console.log('Stack:', body.stack);
  }
  console.groupEnd();
}

async function fetchWithTimeout(url, options = {}, timeout = DEFAULT_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
  const method = options.method || 'GET';
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options);

      if (!response.ok) {
        const cloned = response.clone();
        let body = null;
        try { body = await cloned.json(); } catch {}
        logHttpError(method, url, response.status, body);
      }

      return response;
    } catch (error) {
      lastError = error;
      if (error.name === 'AbortError') {
        lastError = new Error('Tiempo de espera agotado. Verifica tu conexión.');
      }
      console.error(`[NETWORK ERROR] ${method} ${url} (intento ${attempt + 1}/${retries + 1}):`, lastError.message);
      if (attempt < retries) {
        await sleep(RETRY_DELAY);
      }
    }
  }
  throw lastError;
}

export const apiFetch = fetchWithRetry;

export const apiClient = {
  baseURL: API_URL,

  async post(endpoint, data) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetchWithRetry(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      const err = new Error(error.error || `Request failed (${response.status})`);
      err.status = response.status;
      err.code = error.code;
      err.details = error.details;
      throw err;
    }
    return response.json();
  },

  async get(endpoint, token) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetchWithRetry(url, { headers });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      const err = new Error(error.error || `Request failed (${response.status})`);
      err.status = response.status;
      err.code = error.code;
      err.details = error.details;
      throw err;
    }
    return response.json();
  },
};
