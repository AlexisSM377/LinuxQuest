const WORLD_META = [
  { id: 1, label: 'MUNDO 1', color: 'var(--amber)' },
  { id: 2, label: 'MUNDO 2', color: 'var(--leaf)' },
  { id: 3, label: 'MUNDO 3', color: 'var(--sky)' },
  { id: 4, label: 'MUNDO 4', color: 'var(--plum)' },
  { id: 5, label: 'MUNDO 5', color: 'var(--blood)' },
];

export default function WorldProgress({ questsByWorld, userProgress }) {
  const getProgress = (worldId) => {
    const worldQuests = questsByWorld[worldId] || [];
    const completed = userProgress.filter(
      p => p.status === 'completed' && worldQuests.some(q => q.id === p.quest_id)
    ).length;
    const total = worldQuests.length;
    return { completed, total, pct: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {WORLD_META.map(w => {
        const { completed, total, pct } = getProgress(w.id);
        return (
          <div key={w.id} className="pcard" style={{ background: 'var(--bg-2)', padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28,
                  background: w.color,
                  border: '3px solid var(--ink)',
                  flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: w.color }}>
                  {w.label}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: w.color }}>
                {completed}/{total}
              </span>
            </div>
            <div className="bar">
              <i style={{ width: pct + '%', background: w.color }} />
            </div>
            <div className="tiny up muted" style={{ marginTop: 6 }}>{pct}% COMPLETADO</div>
          </div>
        );
      })}
    </div>
  );
}
