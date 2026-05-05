import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../utils/api';
import AuthCard from '../components/auth/AuthCard';
import PixelInput from '../components/auth/PixelInput';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notVerified, setNotVerified] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState(''); // '' | 'sending' | 'sent' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotVerified(false);
    setResendStatus('');
    setLoading(true);
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      login(response.user, response.token);
      navigate('/game');
    } catch (err) {
      if (err.code === 'EMAIL_NOT_VERIFIED') {
        setNotVerified(true);
        setResendEmail(email);
        setError(err.message);
      } else {
        setError(err.message || 'Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus('sending');
    try {
      await apiClient.post('/api/auth/resend-verification', { email: resendEmail });
      setResendStatus('sent');
    } catch (err) {
      setError(err.message || 'Error reenviando correo');
      setResendStatus('error');
    }
  };

  const footer = (
    <>
      ¿Sin cuenta?{' '}
      <button
        onClick={() => navigate('/register')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--amber)', fontFamily: 'var(--font-body)',
          fontSize: 'inherit', textDecoration: 'underline',
        }}
      >
        REGISTRARSE
      </button>
    </>
  );

  return (
    <AuthCard
      title="INICIAR SESIÓN"
      subtitle="Continúa tu aventura en el terminal"
      footer={footer}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PixelInput
          label="EMAIL"
          type="email"
          placeholder="aprendiz@linuxquest.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PixelInput
          label="CONTRASEÑA"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div style={{
            background: 'var(--blood)', border: '4px solid var(--ink)',
            padding: '10px 14px', fontFamily: 'var(--font-code)',
            fontSize: 13, color: 'var(--parchment)',
          }}>
            ✗ {error}
          </div>
        )}

        {notVerified && (
          <div style={{
            background: 'var(--bg-3)', border: '4px solid var(--amber)',
            padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <span className="tiny up" style={{ color: 'var(--amber)' }}>
              EMAIL NO VERIFICADO
            </span>
            {resendStatus === 'sent' ? (
              <span className="vt" style={{ color: 'var(--leaf)', fontSize: 15 }}>
                ✓ Correo reenviado. Revisa tu bandeja.
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleResend}
                disabled={resendStatus === 'sending'}
                style={{ fontSize: 9, padding: '8px 12px', opacity: resendStatus === 'sending' ? 0.6 : 1 }}
              >
                {resendStatus === 'sending' ? 'ENVIANDO...' : '↻ REENVIAR CORREO DE VERIFICACIÓN'}
              </button>
            )}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-amber"
          disabled={loading}
          style={{ width: '100%', marginTop: 8, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'ACCEDIENDO...' : 'ACCEDER ▶'}
        </button>
      </form>
    </AuthCard>
  );
}
