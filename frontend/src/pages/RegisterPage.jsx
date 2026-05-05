import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import AuthCard from '../components/auth/AuthCard';
import PixelInput from '../components/auth/PixelInput';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/api/auth/register', { email, username, password });
      setRegisteredEmail(email);
      setRegistered(true);
    } catch (err) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <AuthCard
        title="¡REVISA TU CORREO!"
        subtitle={`Enviamos un link a ${registeredEmail}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: 'var(--bg-3)',
            border: '4px solid var(--leaf)',
            padding: '16px',
            fontFamily: 'var(--font-code)',
            fontSize: 13,
            color: 'var(--leaf)',
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
            ✓ CUENTA CREADA<br />
            <span style={{ color: 'var(--parchment-2)', fontSize: 12 }}>
              Haz clic en el link del correo para activar tu cuenta
            </span>
          </div>

          <p className="vt" style={{ color: 'var(--parchment-2)', fontSize: 15, textAlign: 'center' }}>
            ¿No llegó el correo? Revisa la carpeta de spam o vuelve al login para reenviar.
          </p>

          <button
            className="btn btn-amber"
            onClick={() => navigate('/login')}
            style={{ width: '100%' }}
          >
            IR AL LOGIN ▶
          </button>
        </div>
      </AuthCard>
    );
  }

  const footer = (
    <>
      ¿Ya tienes cuenta?{' '}
      <button
        onClick={() => navigate('/login')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--amber)', fontFamily: 'var(--font-body)',
          fontSize: 'inherit', textDecoration: 'underline',
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
            background: 'var(--blood)', border: '4px solid var(--ink)',
            padding: '10px 14px', fontFamily: 'var(--font-code)',
            fontSize: 13, color: 'var(--parchment)',
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
