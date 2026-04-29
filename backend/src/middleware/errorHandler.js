export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    code: 'NOT_FOUND',
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
};

export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const isDev = process.env.NODE_ENV !== 'production';

  console.error(`[ERROR ${status}] ${req.method} ${req.originalUrl}`);
  console.error(err.stack || err.message);

  const body = {
    error: err.message || 'Error interno del servidor',
    code: err.code || `HTTP_${status}`,
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  };

  if (isDev) {
    body.stack = err.stack;
    if (err.details) body.details = err.details;
  }

  res.status(status).json(body);
};

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const originalJson = res.json;

  res.json = function (body) {
    const duration = Date.now() - start;
    if (res.statusCode >= 400) {
      console.warn(`[${res.statusCode}] ${req.method} ${req.originalUrl} (${duration}ms) → ${body?.error || 'Error'}`);
    }
    return originalJson.call(this, body);
  };

  next();
};
