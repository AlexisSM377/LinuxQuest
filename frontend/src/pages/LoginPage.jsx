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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      login(response.user, response.token);
      navigate('/game');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <>
      ¿Sin cuenta?{' '}
      <button
        onClick={() => navigate('/register')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--amber)',
          fontFamily: 'var(--font-body)',
          fontSize: 'inherit',
          textDecoration: 'underline',
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
            background: 'var(--blood)',
            border: '4px solid var(--ink)',
            padding: '10px 14px',
            fontFamily: 'var(--font-code)',
            fontSize: 13,
            color: 'var(--parchment)',
          }}>
            ✗ {error}
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
