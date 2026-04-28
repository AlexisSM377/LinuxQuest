export default function NPCProfile({ npc }) {
  if (!npc) return null;

  return (
    <div className="pcard" style={{ background: 'var(--bg-3)', padding: 16 }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        <span style={{ fontSize: 34, lineHeight: 1, flexShrink: 0 }}>{npc.avatar}</span>
        <div>
          <div className="tiny up" style={{ color: 'var(--plum)', marginBottom: 4 }}>{npc.title}</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            color: 'var(--parchment)',
            textShadow: '2px 2px 0 var(--ink)',
          }}>
            {npc.name}
          </div>
          {npc.specialty && (
            <div className="tiny up" style={{ color: 'var(--sky)', marginTop: 4 }}>{npc.specialty}</div>
          )}
        </div>
        {npc.isBoss && (
          <span className="diff diff-dif" style={{ marginLeft: 'auto', flexShrink: 0 }}>BOSS</span>
        )}
      </div>

      <div style={{
        background: 'var(--ink)',
        border: '3px solid var(--bg-3)',
        padding: '10px 14px',
        fontFamily: 'var(--font-code)',
        fontSize: 13,
        color: 'var(--parchment-2)',
        fontStyle: 'italic',
      }}>
        "{npc.greeting}"
      </div>
    </div>
  );
}
