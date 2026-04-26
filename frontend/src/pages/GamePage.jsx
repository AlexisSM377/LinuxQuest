import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Terminal from '../components/Terminal';
import { useAuthStore } from '../store/authStore';

export default function GamePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black">
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex justify-between items-center">
        <h1 className="text-emerald-400 font-bold text-lg">LinuxQuest</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
        >
          Logout
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <Terminal />
      </div>
    </div>
  );
}
