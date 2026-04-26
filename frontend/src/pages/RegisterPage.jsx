import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        username,
        password
      });

      register(response.data.user, response.data.token);
      navigate('/game');
    } catch (err) {
      setError(err.response?.data?.error || 'Register error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-white text-center mb-8 tracking-widest">Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold disabled:opacity-50 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-emerald-400 hover:text-emerald-300 font-bold"
          >
            Login
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
