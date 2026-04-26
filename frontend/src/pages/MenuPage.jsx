import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function MenuPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleNewGame = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/game');
    }
  };

  const handleContinue = () => {
    if (isAuthenticated) {
      navigate('/game');
    }
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleExit = () => {
    window.close();
  };

  return (
    <Menu
      onNewGame={handleNewGame}
      onContinue={handleContinue}
      onSettings={handleSettings}
      onExit={handleExit}
    />
  );
}
