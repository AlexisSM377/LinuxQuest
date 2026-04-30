import { useState, useEffect } from 'react';

export default function XpNotification({ xpGained, coinsGained, questTitle, leveledUp, newLevel, newAchievements, onClose }) {
  const [animate, setAnimate] = useState(false);
  const timerRef = { current: null };
  const innerTimerRef = { current: null };

  useEffect(() => {
    setAnimate(true);
    const delay = newAchievements && newAchievements.length > 0 ? 4000 : 3000;
    timerRef.current = setTimeout(() => {
      setAnimate(false);
      innerTimerRef.current = setTimeout(onClose, 300);
    }, delay);
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(innerTimerRef.current);
    };
  }, [onClose, newAchievements]);

  if (leveledUp || (newAchievements && newAchievements.length > 0)) {
    return (
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${animate ? 1 : 0})`,
        opacity: animate ? 1 : 0,
        transition: 'all 0.3s',
        zIndex: 50, display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {leveledUp && (
          <div style={{
            background: 'var(--amber)', color: 'var(--ink)',
            padding: '24px 32px', textAlign: 'center',
            border: '4px solid var(--ink)',
            boxShadow: '6px 6px 0 var(--shadow)',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8 }}>
              NIVEL {newLevel}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, marginBottom: 4 }}>
              {questTitle}
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 8, opacity: 0.7 }}>
              EXPLORADOR EXPERIMENTADO
            </p>
          </div>
        )}
        {newAchievements && newAchievements.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {newAchievements.map((achievement, idx) => (
              <div key={idx} style={{
                background: 'var(--plum)', color: 'var(--parchment)',
                padding: '16px 24px', textAlign: 'center',
                border: '4px solid var(--ink)',
                boxShadow: '6px 6px 0 var(--shadow)',
              }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{achievement.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 11,
                  marginBottom: 4,
                }}>
                  {achievement.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, opacity: 0.8 }}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 50,
      transform: `translateX(${animate ? 0 : 400}px)`,
      opacity: animate ? 1 : 0,
      transition: 'all 0.3s',
    }}>
      <div style={{
        background: 'var(--bg-2)', color: 'var(--parchment)',
        padding: '14px 20px',
        border: '4px solid var(--ink)',
        borderLeft: '4px solid var(--leaf)',
        boxShadow: '4px 4px 0 var(--shadow)',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 14,
            color: 'var(--leaf)',
          }}>
            +{xpGained}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: 'var(--parchment-2)' }}>
            XP
          </div>
        </div>
        <div style={{ width: 2, height: 32, background: 'var(--ink)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 14,
            color: 'var(--amber)',
          }}>
            +{coinsGained}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: 'var(--parchment-2)' }}>
            COINS
          </div>
        </div>
        <div style={{ width: 2, height: 32, background: 'var(--ink)' }} />
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: 'var(--parchment)' }}>
            {questTitle}
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: 'var(--parchment-2)' }}>
            COMPLETADA
          </p>
        </div>
      </div>
    </div>
  );
}
