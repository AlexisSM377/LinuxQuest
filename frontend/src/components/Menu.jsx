export default function Menu({ onNewGame, onContinue, onSettings, onExit }) {
  const buttons = [
    { label: 'Nuevo Juego', handler: onNewGame, color: 'border-emerald-500 text-emerald-400 hover:bg-emerald-500' },
    { label: 'Continuar Partida', handler: onContinue, color: 'border-blue-500 text-blue-400 hover:bg-blue-500' },
    { label: 'Configuración', handler: onSettings, color: 'border-yellow-500 text-yellow-400 hover:bg-yellow-500' },
    { label: 'Salir', handler: onExit, color: 'border-red-500 text-red-400 hover:bg-red-500' },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="flex flex-col items-center gap-10 w-full max-w-sm">
        <div className="text-center">
          <h1
            className="text-5xl sm:text-6xl font-bold text-white tracking-widest uppercase"
            style={{ fontFamily: '"Courier New", Courier, monospace', textShadow: '0 0 20px rgba(34,197,94,0.6)' }}
          >
            LinuxQuest
          </h1>
          <p className="mt-3 text-gray-400 text-sm sm:text-base tracking-widest uppercase">
            Aprende Linux jugando
          </p>
        </div>

        <nav className="flex flex-col gap-4 w-full">
          {buttons.map(({ label, handler, color }) => (
            <button
              key={label}
              onClick={handler}
              className={`w-full py-3 px-6 border-2 rounded font-bold tracking-widest uppercase text-sm sm:text-base transition-all duration-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${color}`}
              style={{ fontFamily: '"Courier New", Courier, monospace' }}
            >
              {label}
            </button>
          ))}
        </nav>

        <p className="text-gray-700 text-xs tracking-widest">v0.1.0</p>
      </div>
    </div>
  )
}
