import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../utils/api';
import AuthCard from '../components/auth/AuthCard';
import PixelInput from '../components/auth/PixelInput';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.post('/api/auth/register', { email, username, password });
      register(response.user, response.token);
      navigate('/game');
    } catch (err) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <>
      ¿Ya tienes cuenta?{' '}
      <button
        onClick={() => navigate('/login')}
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
        INICIAR SESIÓN
      </button>
    </>
  );

  return (
    <AuthCard
      title="CREAR CUENTA"
      subtitle="Únete y empieza tu viaje al terminal"
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
          label="USUARIO"
          type="text"
          placeholder="aprendiz_de_kernel"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <PixelInput
          label="CONFIRMAR CONTRASEÑA"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <div style={{
            background: 'var(--blood)',
            border: '4px solid var(--ink)',
            padding: '12px 14px',
            minHeight: 44,
            fontFamily: 'var(--font-code)',
            fontSize: 13,
            color: 'var(--parchment)',
            display: 'flex',
            alignItems: 'center',
          }}>
            ✗ {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-leaf"
          disabled={loading}
          style={{ width: '100%', marginTop: 8, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA ▶'}
        </button>
      </form>
    </AuthCard>
  );
}
