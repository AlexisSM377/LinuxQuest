export default function AchievementBadge({ achievement, earned, earnedAt }) {
  return (
    <div
      className={earned ? 'pcard' : 'pcard locked'}
      style={{
        background: earned ? 'var(--bg-2)' : 'var(--bg)',
        padding: 14,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}
    >
      <div style={{
        width: 48, height: 48, flexShrink: 0,
        background: earned ? 'var(--amber)' : 'var(--bg-3)',
        border: '4px solid var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>
        {achievement.icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 9,
          color: earned ? 'var(--parchment)' : 'var(--parchment-2)',
          marginBottom: 4,
          textShadow: earned ? '2px 2px 0 var(--ink)' : 'none',
        }}>
          {achievement.title}
        </div>
        <div className="vt muted" style={{ fontSize: 16 }}>{achievement.description}</div>
        {earned ? (
          <div className="tiny up" style={{ color: 'var(--leaf)', marginTop: 4 }}>✓ DESBLOQUEADO</div>
        ) : (
          <div className="tiny up muted" style={{ marginTop: 4 }}>✕ BLOQUEADO</div>
        )}
      </div>
    </div>
  );
}
