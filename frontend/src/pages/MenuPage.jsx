import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function MenuPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleNewGame = () => {
    navigate(isAuthenticated ? '/game' : '/register');
  };

  const handleContinue = () => {
    if (isAuthenticated) navigate('/game');
  };

  return <Menu onNewGame={handleNewGame} onContinue={handleContinue} />;
}
