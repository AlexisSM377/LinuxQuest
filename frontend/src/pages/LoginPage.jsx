import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      login(response.data.user, response.data.token);
      navigate('/game');
    } catch (err) {
      setError(err.response?.data?.error || 'Login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-white text-center mb-8 tracking-widest">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold disabled:opacity-50 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          No account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-emerald-400 hover:text-emerald-300 font-bold"
          >
            Register
          </button>
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 px-4 py-2 border border-gray-700 text-gray-400 rounded hover:text-white transition"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}
