import { DIFF_MAP } from '../config/gameConfig';

const STATUS_ICON = {
  completed:     '✓',
  'in-progress': '►',
  'in_progress': '►',
  locked:        '✕',
};

const STATUS_STYLE = {
  completed: {
    background: 'var(--bg-3)',
    borderLeft: '4px solid var(--leaf)',
  },
  active: {
    background: 'var(--amber)',
    boxShadow: '4px 4px 0 var(--shadow)',
  },
  locked: {},
  default: {
    background: 'var(--bg-2)',
  },
};

export default function QuestCard({ quest, isActive, isLocked, status, onClick }) {
  const diff = DIFF_MAP[quest.difficulty] || { label: '?', cls: 'diff-med' };
  const icon = STATUS_ICON[status] || '·';

  const isCompleted = status === 'completed';

  const cardStyle = {
    width: '100%',
    textAlign: 'left',
    border: '4px solid var(--ink)',
    padding: '12px 12px',
    minHeight: 44,
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    cursor: isLocked ? 'not-allowed' : 'pointer',
    outline: isActive ? '4px solid var(--amber-2)' : 'none',
    outlineOffset: 2,
    transition: 'background 0.15s, opacity 0.15s',
    ...(isLocked ? {} : { opacity: 1 }),
    ...(isActive ? STATUS_STYLE.active : {}),
    ...(!isActive && isCompleted ? STATUS_STYLE.completed : {}),
    ...(!isActive && !isCompleted && !isLocked ? STATUS_STYLE.default : {}),
  };

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={isLocked ? 'locked' : 'tile'}
      style={cardStyle}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        color: isActive ? 'var(--ink)' : isCompleted ? 'var(--leaf)' : 'var(--parchment-2)',
        flexShrink: 0,
        marginTop: 2,
        ...(isCompleted && !isActive ? { textShadow: '0 0 6px var(--leaf)' } : {}),
      }}>
        {icon}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-code)',
          fontSize: 12,
          color: isActive ? 'var(--ink)' : isCompleted ? 'var(--leaf)' : 'var(--parchment)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textDecoration: isCompleted ? 'none' : 'none',
        }}>
          {String(quest.order).padStart(2, '0')} · {quest.title}
        </div>
        {!isLocked && (
          <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center' }}>
            <span className={'diff ' + diff.cls} style={{
              fontSize: 7, padding: '2px 5px',
              ...(isCompleted ? { opacity: 0.6 } : {}),
            }}>
              {diff.label}
            </span>
            <span className="tiny" style={{
              color: isActive ? 'var(--ink)' : isCompleted ? 'var(--leaf)' : 'var(--amber)',
            }}>
              {isCompleted ? '✓ HECHA' : `+${quest.rewards?.xp || 0}XP`}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
