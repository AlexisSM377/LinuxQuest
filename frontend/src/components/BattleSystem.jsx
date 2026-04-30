import { useState, useEffect, useCallback, useRef } from 'react';

export default function BattleSystem({ enemy, onVictory, onDefeat, battleRef }) {
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
  const battleActiveRef = useRef(true);
  const victoryTimeoutRef = useRef(null);
  const defeatTimeoutRef = useRef(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (victoryTimeoutRef.current) clearTimeout(victoryTimeoutRef.current);
      if (defeatTimeoutRef.current) clearTimeout(defeatTimeoutRef.current);
    };
  }, []);

  const addLog = useCallback((type, message) => {
    setBattleLog(prev => [...prev, { type, message }]);
  }, []);

  const handleCorrectCommand = useCallback(() => {
    if (!battleActiveRef.current) return;

    const damage = Math.floor(Math.random() * 30) + 20;

    setAnimation('player-attack');
    setTimeout(() => setAnimation(null), 600);
    addLog('success', `¡Golpe crítico! -${damage} HP al enemigo`);

    setEnemyHp(prev => {
      const newHp = Math.max(0, prev - damage);
      if (newHp <= 0) {
        battleActiveRef.current = false;
        setBattleActive(false);
        addLog('victory', `¡${enemy?.name} ha sido derrotado!`);
        addLog('victory', enemy?.defeatMessage || '¡VICTORIA!');
        victoryTimeoutRef.current = setTimeout(() => onVictory?.(), 1500);
      } else {
        setTimeout(() => {
          if (!battleActiveRef.current) return;
          const counterDamage = Math.floor(Math.random() * 20) + 10;
          setPlayerHp(p => {
            const hp = Math.max(0, p - counterDamage);
            if (hp <= 0) {
              battleActiveRef.current = false;
              setBattleActive(false);
              addLog('defeat', 'Has sido derrotado...');
              defeatTimeoutRef.current = setTimeout(() => onDefeat?.(), 1500);
            }
            return hp;
          });
          addLog('enemy', `${enemy?.name} te golpea! -${counterDamage} HP`);
        }, 800);
      }
      return newHp;
    });
  }, [enemy, addLog, onVictory, onDefeat]);

  const handleIncorrectCommand = useCallback(() => {
    if (!battleActiveRef.current) return;

    const damage = Math.floor(Math.random() * 15) + 5;
    setAnimation('player-hurt');
    setTimeout(() => setAnimation(null), 600);

    addLog('error', `Comando rechazado. ${enemy?.name} te ataca! -${damage} HP`);
    setPlayerHp(prev => {
      const newHp = Math.max(0, prev - damage);
      if (newHp <= 0) {
        battleActiveRef.current = false;
        setBattleActive(false);
        addLog('defeat', 'Has sido derrotado...');
        defeatTimeoutRef.current = setTimeout(() => onDefeat?.(), 1500);
      }
      return newHp;
    });
  }, [enemy, addLog, onDefeat]);

  useEffect(() => {
    if (battleRef) {
      battleRef.current = { handleCorrectCommand, handleIncorrectCommand };
    }
    return () => {
      if (battleRef) battleRef.current = null;
    };
  }, [battleRef, handleCorrectCommand, handleIncorrectCommand]);

  const enemyHpPercent = Math.max(0, (enemyHp / maxEnemyHp) * 100);
  const playerHpPercent = Math.max(0, (playerHp / maxPlayerHp) * 100);

  return (
    <div className="pcard" style={{ background: 'var(--bg-3)', padding: 16, borderColor: 'var(--blood)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            fontSize: 48, marginBottom: 8,
            transform: animation === 'enemy-hurt' ? 'translateX(4px)' : 'none',
            transition: 'transform 0.15s',
          }}>
            {enemy?.avatar}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--blood)', marginBottom: 4 }}>
            {enemy?.name}
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--parchment-2)' }}>
            {enemy?.description}
          </p>
        </div>

        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--blood)', margin: '0 12px' }}>
          ⚔
        </div>

        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            fontSize: 48, marginBottom: 8,
            transform: animation === 'player-hurt' ? 'translateX(-4px)' : 'none',
            transition: 'transform 0.15s',
          }}>
            🧙
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--sky)', marginBottom: 4 }}>
            Explorador
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--parchment-2)' }}>¡Tú!</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: 'var(--blood)' }}>{enemy?.name} HP</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: 'var(--parchment-2)' }}>{Math.max(0, enemyHp)}/{maxEnemyHp}</span>
          </div>
          <div className="bar" style={{ height: 14 }}>
            <div style={{ height: '100%', width: `${enemyHpPercent}%`, background: 'var(--blood)', transition: 'width 0.3s', backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0 4px, transparent 4px 8px)' }} />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: 'var(--sky)' }}>Tu HP</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: 'var(--parchment-2)' }}>{Math.max(0, playerHp)}/{maxPlayerHp}</span>
          </div>
          <div className="bar" style={{ height: 14 }}>
            <div style={{ height: '100%', width: `${playerHpPercent}%`, background: 'var(--sky)', transition: 'width 0.3s', backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0 4px, transparent 4px 8px)' }} />
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--ink)', padding: 10, height: 120, overflowY: 'auto', marginBottom: 12, border: '3px solid var(--bg)' }}>
        {battleLog.map((log, idx) => (
          <p key={idx} style={{
            fontFamily: 'var(--font-code)', fontSize: 11, marginBottom: 3,
            color: log.type === 'success' ? 'var(--leaf)' : log.type === 'error' ? 'var(--blood)' : log.type === 'enemy' ? 'var(--amber)' : log.type === 'victory' ? 'var(--amber)' : log.type === 'defeat' ? 'var(--blood)' : 'var(--parchment-2)',
            fontWeight: log.type === 'victory' || log.type === 'defeat' ? 'bold' : 'normal',
          }}>
            {log.message}
          </p>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        {!battleActive && playerHp > 0 && (
          <div style={{ padding: 10, background: 'var(--leaf)', color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: 11 }}>¡VICTORIA!</div>
        )}
        {!battleActive && playerHp <= 0 && (
          <div style={{ padding: 10, background: 'var(--blood)', color: 'var(--parchment)', fontFamily: 'var(--font-display)', fontSize: 11 }}>DERROTA — Intenta de nuevo</div>
        )}
        {battleActive && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--parchment-2)' }}>
            Ejecuta los comandos correctos para ganar la batalla
          </p>
        )}
      </div>
    </div>
  );
}
