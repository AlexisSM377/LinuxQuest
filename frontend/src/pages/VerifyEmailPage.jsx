import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../utils/api';
import AuthCard from '../components/auth/AuthCard';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setErrorMsg('No se encontró el token en la URL.');
      return;
    }

    apiClient.get(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((res) => {
        login(res.user, res.token);
        setStatus('success');
        setTimeout(() => navigate('/game'), 2500);
      })
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err.message || 'Token inválido o expirado.');
      });
  }, []);

  if (status === 'verifying') {
    return (
      <AuthCard title="VERIFICANDO..." subtitle="Espera un momento">
        <div style={{
          textAlign: 'center', padding: '24px 0',
          fontFamily: 'var(--font-display)', fontSize: 9,
          color: 'var(--amber)', letterSpacing: 2,
        }}>
          PROCESANDO TOKEN...
        </div>
      </AuthCard>
    );
  }

  if (status === 'success') {
    return (
      <AuthCard title="¡CUENTA VERIFICADA!" subtitle="Redirigiendo al juego...">
        <div style={{
          textAlign: 'center', padding: '24px 0',
          fontFamily: 'var(--font-display)', fontSize: 9,
          color: 'var(--leaf)', letterSpacing: 1,
        }}>
          ✓ EMAIL VERIFICADO
        </div>
        <p className="vt" style={{ textAlign: 'center', color: 'var(--parchment-2)', fontSize: 16 }}>
          Bienvenido a LinuxQuest. Entrando al juego...
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="ERROR DE VERIFICACIÓN" subtitle="El link no es válido">
      <div style={{
        background: 'var(--blood)',
        border: '4px solid var(--ink)',
        padding: '10px 14px',
        fontFamily: 'var(--font-code)',
        fontSize: 13,
        color: 'var(--parchment)',
        marginBottom: 16,
      }}>
        ✗ {errorMsg}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="btn" onClick={() => navigate('/login')} style={{ width: '100%' }}>
          IR AL LOGIN
        </button>
        <button className="btn btn-ghost" onClick={() => navigate('/register')} style={{ width: '100%' }}>
          CREAR CUENTA NUEVA
        </button>
      </div>
    </AuthCard>
  );
}
