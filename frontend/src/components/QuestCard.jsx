const DIFF_MAP = {
  1: { label: 'FÁCIL',   cls: 'diff-fac' },
  2: { label: 'MEDIO',   cls: 'diff-med' },
  3: { label: 'DIFÍCIL', cls: 'diff-dif' },
  4: { label: 'MUY DIF', cls: 'diff-dif' },
  5: { label: 'LEGEND',  cls: 'diff-dif' },
};

const STATUS_ICON = {
  completed:     '✓',
  'in-progress': '►',
  'in_progress': '►',
  locked:        '✕',
};

export default function QuestCard({ quest, isActive, isLocked, status, onClick }) {
  const diff = DIFF_MAP[quest.difficulty] || { label: '?', cls: 'diff-med' };
  const icon = STATUS_ICON[status] || '·';

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={isLocked ? 'locked' : 'tile'}
      style={{
        width: '100%',
        textAlign: 'left',
        background: isActive ? 'var(--amber)' : 'var(--bg-2)',
        border: '4px solid var(--ink)',
        padding: '10px 12px',
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        outline: isActive ? '4px solid var(--amber-2)' : 'none',
        outlineOffset: 2,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        boxShadow: isActive ? '4px 4px 0 var(--shadow)' : 'none',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        color: isActive ? 'var(--ink)' : status === 'completed' ? 'var(--leaf)' : 'var(--parchment-2)',
        flexShrink: 0,
        marginTop: 2,
      }}>
        {icon}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-code)',
          fontSize: 12,
          color: isActive ? 'var(--ink)' : 'var(--parchment)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {String(quest.order).padStart(2, '0')} · {quest.title}
        </div>
        {!isLocked && (
          <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center' }}>
            <span className={'diff ' + diff.cls} style={{ fontSize: 7, padding: '2px 5px' }}>
              {diff.label}
            </span>
            <span className="tiny" style={{ color: isActive ? 'var(--ink)' : 'var(--amber)' }}>
              +{quest.rewards?.xp || 0}XP
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
