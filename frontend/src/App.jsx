import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import GamePage from './pages/GamePage'
import StatsPage from './pages/StatsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import ToastContainer from './components/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import { useAuthStore } from './store/authStore'

function App() {
  const validateToken = useAuthStore(s => s.validateToken);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <ErrorBoundary>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/verificar-email" element={<VerifyEmailPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
