import { useState, useEffect } from 'react';

export default function BattleSystem({ enemy, onVictory, onDefeat }) {
  const [enemyHp, setEnemyHp] = useState(enemy?.hp || 100);
  const [playerHp, setPlayerHp] = useState(100);
  const [maxEnemyHp] = useState(enemy?.hp || 100);
  const [maxPlayerHp] = useState(100);
  const [battleLog, setBattleLog] = useState([
    { type: 'info', message: `¡${enemy?.name} ha aparecido!` },
    { type: 'info', message: '¡Comienza el combate!' }
  ]);
  const [battleActive, setBattleActive] = useState(true);
  const [animation, setAnimation] = useState(null);

  const addLog = (type, message) => {
    setBattleLog(prev => [...prev, { type, message }]);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      1: 'text-green-400',
      2: 'text-blue-400',
      3: 'text-yellow-400',
      4: 'text-orange-400',
      5: 'text-red-600 font-bold'
    };
    return colors[difficulty] || 'text-gray-400';
  };

  const handleCorrectCommand = () => {
    if (!battleActive) return;

    const damage = Math.floor(Math.random() * 30) + 20; // 20-50 daño
    const newEnemyHp = Math.max(0, enemyHp - damage);

    setAnimation('player-attack');
    setTimeout(() => setAnimation(null), 600);

    addLog('success', `¡Golpe crítico! -${damage} HP al enemigo`);
    setEnemyHp(newEnemyHp);

    if (newEnemyHp <= 0) {
      setBattleActive(false);
      addLog('victory', `¡${enemy?.name} ha sido derrotado!`);
      addLog('victory', enemy?.defeatMessage || '¡VICTORIA!');
      setTimeout(() => onVictory?.(), 1500);
    } else {
      // Contraataque del enemigo
      setTimeout(() => {
        const counterDamage = Math.floor(Math.random() * 20) + 10; // 10-30 daño
        setPlayerHp(prev => Math.max(0, prev - counterDamage));
        addLog('enemy', `${enemy?.name} te golpea! -${counterDamage} HP`);

        if (playerHp - counterDamage <= 0) {
          setBattleActive(false);
          addLog('defeat', 'Has sido derrotado...');
          setTimeout(() => onDefeat?.(), 1500);
        }
      }, 800);
    }
  };

  const handleIncorrectCommand = () => {
    if (!battleActive) return;

    const damage = Math.floor(Math.random() * 15) + 5; // 5-20 daño
    setAnimation('player-hurt');
    setTimeout(() => setAnimation(null), 600);

    addLog('error', `Comando rechazado. ${enemy?.name} te ataca! -${damage} HP`);
    setPlayerHp(prev => Math.max(0, prev - damage));

    if (playerHp - damage <= 0) {
      setBattleActive(false);
      addLog('defeat', 'Has sido derrotado...');
      setTimeout(() => onDefeat?.(), 1500);
    }
  };

  useEffect(() => {
    handleCorrectCommand();
  }, []);

  return (
    <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-4 mb-4">
      {/* Enemy */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <div className={`text-6xl mb-2 ${animation === 'enemy-hurt' ? 'animate-bounce' : ''}`}>
            {enemy?.avatar}
          </div>
          <h3 className={`font-bold text-lg ${getDifficultyColor(enemy?.difficulty)}`}>
            {enemy?.name}
          </h3>
          <p className="text-gray-400 text-sm">{enemy?.description}</p>
        </div>

        {/* VS */}
        <div className="text-2xl font-bold text-red-500 mx-4">⚔️</div>

        {/* Player */}
        <div className="text-center flex-1">
          <div className={`text-6xl mb-2 ${animation === 'player-hurt' ? 'animate-bounce' : 'animate-pulse' }`}>
            🧙
          </div>
          <h3 className="font-bold text-lg text-blue-400">Explorador</h3>
          <p className="text-gray-400 text-sm">¡Tú!</p>
        </div>
      </div>

      {/* Health Bars */}
      <div className="space-y-3 mb-4">
        {/* Enemy HP */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className={getDifficultyColor(enemy?.difficulty)}>
              {enemy?.name} HP
            </span>
            <span className="text-gray-400">{Math.max(0, enemyHp)}/{maxEnemyHp}</span>
          </div>
          <div className="w-full bg-gray-800 rounded h-6 border border-red-600 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300"
              style={{ width: `${Math.max(0, (enemyHp / maxEnemyHp) * 100)}%` }}
            />
          </div>
        </div>

        {/* Player HP */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-blue-400">Tu HP</span>
            <span className="text-gray-400">{Math.max(0, playerHp)}/{maxPlayerHp}</span>
          </div>
          <div className="w-full bg-gray-800 rounded h-6 border border-blue-600 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300"
              style={{ width: `${Math.max(0, (playerHp / maxPlayerHp) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Battle Log */}
      <div className="bg-black rounded p-3 h-32 overflow-y-auto mb-3 border border-gray-700">
        <div className="space-y-1 text-xs font-mono">
          {battleLog.map((log, idx) => (
            <p
              key={idx}
              className={
                log.type === 'success' ? 'text-emerald-400' :
                log.type === 'error' ? 'text-red-400' :
                log.type === 'enemy' ? 'text-orange-400' :
                log.type === 'victory' ? 'text-yellow-400 font-bold' :
                log.type === 'defeat' ? 'text-red-600 font-bold' :
                'text-gray-400'
              }
            >
              {log.message}
            </p>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        {!battleActive && playerHp > 0 && (
          <div className="p-3 bg-emerald-900 border border-emerald-600 rounded">
            <p className="text-emerald-300 font-bold">¡VICTORIA!</p>
          </div>
        )}
        {!battleActive && playerHp <= 0 && (
          <div className="p-3 bg-red-900 border border-red-600 rounded">
            <p className="text-red-300 font-bold">Derrota - Intenta de nuevo</p>
          </div>
        )}
        {battleActive && (
          <p className="text-gray-400 text-sm">
            Ejecuta los comandos correctos para ganar la batalla
          </p>
        )}
      </div>

      {/* Hidden functions for Terminal to call */}
      <div style={{ display: 'none' }}>
        <button
          ref={el => window.handleBattleCorrect = () => handleCorrectCommand()}
        />
        <button
          ref={el => window.handleBattleIncorrect = () => handleIncorrectCommand()}
        />
      </div>
    </div>
  );
}
