import Menu from './components/Menu'

function App() {
  const handleNewGame = () => console.log('Nuevo Juego')
  const handleContinue = () => console.log('Continuar Partida')
  const handleSettings = () => console.log('Configuración')
  const handleExit = () => console.log('Salir')

  return (
    <Menu
      onNewGame={handleNewGame}
      onContinue={handleContinue}
      onSettings={handleSettings}
      onExit={handleExit}
    />
  )
}

export default App
