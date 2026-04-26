import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import GamePage from './pages/GamePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  )
}

export default App
