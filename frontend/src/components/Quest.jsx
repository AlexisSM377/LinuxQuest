import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';
import QuestCard from './QuestCard';
import NPCProfile from './NPCProfile';
import BattleSystem from './BattleSystem';
import { DIFF_MAP, WORLD_COLORS } from '../config/gameConfig';

function SectionLabel({ color, children }) {
  return (
    <div className="tiny up" style={{ color: color || 'var(--amber)', marginBottom: 10 }}>
      ▸ {children}
    </div>
  );
}

function QuestInfo({ quest }) {
  const [showHint, setShowHint] = useState(false);
  const diff = DIFF_MAP[quest.difficulty] || { label: '?', cls: 'diff-med' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <span className={'diff ' + diff.cls}>{diff.label}</span>
          <span className="tiny up muted">MUNDO {quest.world} · MISIÓN {String(quest.order).padStart(2, '0')}</span>
          {quest.rewards && (
            <span className="chip" style={{ marginLeft: 'auto', fontSize: 9 }}>
              +{quest.rewards.xp || 0} XP
            </span>
          )}
        </div>
        <h3 style={{ fontSize: 13, marginBottom: 8 }}>{quest.title.toUpperCase()}</h3>
        {quest.description && (
          <p className="vt" style={{ color: 'var(--parchment-2)', fontSize: 18 }}>{quest.description}</p>
        )}
      </div>

      {/* NPC */}
      {quest.npc && <NPCProfile npc={quest.npc} />}

      {/* Story */}
      {quest.story && (
        <div className="pcard" style={{ background: 'var(--bg-3)', padding: 14 }}>
          <SectionLabel color="var(--sky)">HISTORIA</SectionLabel>
          <p className="vt" style={{ color: 'var(--parchment-2)', fontSize: 17 }}>{quest.story}</p>
        </div>
      )}

      {/* Objectives */}
      {quest.objectives?.length > 0 && (
        <div className="pcard" style={{ background: 'var(--bg-3)', padding: 14 }}>
          <SectionLabel color="var(--leaf)">OBJETIVOS</SectionLabel>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quest.objectives.map((obj, i) => (
              <li key={i} className="vt" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 18 }}>
                <span style={{
                  width: 14, height: 14, flexShrink: 0, marginTop: 4,
                  border: '3px solid var(--ink)', background: 'transparent', display: 'inline-block',
                }} />
                {obj.description || obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Commands */}
      {quest.required_commands?.length > 0 && (
        <div className="pcard" style={{ background: 'var(--bg-3)', padding: 14 }}>
          <SectionLabel color="var(--sky)">COMANDOS PERMITIDOS</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {quest.required_commands.map((cmd, i) => (
              <code key={i} style={{ fontSize: 12, padding: '4px 8px' }}>{cmd}</code>
            ))}
          </div>
        </div>
      )}

      {/* Rewards */}
      {quest.rewards && (
        <div className="pcard" style={{ background: 'var(--bg-3)', padding: 14 }}>
          <SectionLabel color="var(--amber)">RECOMPENSAS</SectionLabel>
          <div style={{ display: 'flex', gap: 16 }}>
            <span className="chip">XP: +{quest.rewards.xp || 0}</span>
            <span className="chip">◈ +{quest.rewards.coins || 0}</span>
          </div>
        </div>
      )}

      {/* Hints */}
      {quest.hints?.length > 0 && (
        <>
          <button
            className="btn btn-ghost"
            onClick={() => setShowHint(s => !s)}
            style={{ fontSize: 9, padding: '10px 14px' }}
          >
            {showHint ? '✕ OCULTAR PISTA' : '? PEDIR PISTA'}
          </button>
          {showHint && (
            <div className="pcard" style={{ background: 'var(--amber)', padding: 14 }}>
              <SectionLabel color="var(--ink)">PISTA</SectionLabel>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {quest.hints.map((h, i) => (
                  <li key={i} className="vt" style={{ color: 'var(--ink)', fontSize: 18 }}>• {h}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function Quest({ onCompleteClick, battleRef }) {
  const {
    currentQuestId, currentQuest, quests, loading, npcs, enemies,
    setCurrentQuest, setCurrentQuestId, userProgress, fetchUserProgress, fetchNPCs,
  } = useGameStore();
  const { user } = useAuthStore();
  const [expandedWorlds, setExpandedWorlds] = useState({ 1: true });
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (quests.length > 0 && !currentQuest && !currentQuestId) {
      const first = quests[0];
      setCurrentQuestId(first.id);
      setCurrentQuest(first);
    }
  }, [quests, currentQuest, currentQuestId, setCurrentQuest, setCurrentQuestId]);

  useEffect(() => {
    if (user?.id) fetchUserProgress();
    fetchNPCs();
  }, [user, fetchUserProgress, fetchNPCs]);

  const getQuestStatus = (questId) => {
    const p = userProgress.find(p => p.quest_id === questId);
    return p?.status || 'locked';
  };

  const isQuestUnlocked = (quest) => {
    if (!quest.prerequisites?.length) return true;
    const done = userProgress.filter(p => p.status === 'completed').map(p => p.quest_id);
    return quest.prerequisites.every(id => done.includes(id));
  };

  const getMissingPrereqs = (quest) => {
    if (!quest.prerequisites?.length) return [];
    const done = userProgress.filter(p => p.status === 'completed').map(p => p.quest_id);
    return quest.prerequisites
      .filter(id => !done.includes(id))
      .map(id => {
        const q = quests.find(q => q.id === id);
        return q ? `${String(q.order).padStart(2, '0')} · ${q.title}` : `Quest ${id}`;
      });
  };

  const getNPC = (npcName) => npcs.find(n => n.name === npcName);

  const BOSS_QUEST_IDS = [15, 35, 50, 70, 90];
  const getBossEnemy = () => {
    if (!currentQuest || !BOSS_QUEST_IDS.includes(currentQuest.id)) return null;
    return enemies.find(e => e.world === currentQuest.world && e.isBoss);
  };

  const handleCompleteClick = async () => {
    if (completing) return;
    setCompleting(true);
    try { await onCompleteClick?.(); } finally { setCompleting(false); }
  };

  const worlds = [...new Set(quests.map(q => q.world))].sort((a, b) => a - b);

  const toggleWorld = (world) => setExpandedWorlds(p => ({ ...p, [world]: !p[world] }));

  const selectQuest = (quest) => {
    setCurrentQuestId(quest.id);
    setCurrentQuest(quest);
  };

  // Enrich quest with NPC object
  const questWithNPC = currentQuest
    ? { ...currentQuest, npc: currentQuest.npc ? getNPC(currentQuest.npc) : null }
    : null;

  if (loading) {
    return (
      <div style={{
        width: '100%', height: '100%', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-2)', borderRight: '4px solid var(--ink)',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--amber)' }}>
          CARGANDO...
        </div>
      </div>
    );
  }

  if (!currentQuest) {
    return (
      <div style={{
        width: '100%', height: '100%', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-2)', borderRight: '4px solid var(--ink)',
      }}>
        <div className="tiny up muted">SELECCIONA UNA MISIÓN</div>
      </div>
    );
  }

  const unlocked = isQuestUnlocked(currentQuest);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--bg-2)', borderRight: '4px solid var(--ink)', overflow: 'hidden',
    }}>

      {/* Quest detail — scrollable */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <QuestInfo quest={questWithNPC || currentQuest} />

        {/* Boss battle */}
        {getBossEnemy() && (
          <div style={{ marginTop: 16, borderTop: '4px solid var(--ink)', paddingTop: 16 }}>
            <BattleSystem
              enemy={getBossEnemy()}
              onVictory={() => onCompleteClick?.()}
              onDefeat={() => {}}
              battleRef={battleRef}
            />
          </div>
        )}
      </div>

      {/* Complete / Locked button */}
      <div style={{ padding: 12, borderTop: '4px solid var(--ink)', flexShrink: 0 }}>
        {unlocked ? (
          <button
            className={completing ? 'btn' : 'btn btn-leaf'}
            onClick={handleCompleteClick}
            disabled={completing}
            style={{ width: '100%', opacity: completing ? 0.6 : 1 }}
          >
            {completing ? 'COMPLETANDO...' : '✓ COMPLETAR MISIÓN'}
          </button>
        ) : (
          <div>
            <div className="btn" style={{ width: '100%', opacity: 0.5, cursor: 'not-allowed', marginBottom: 10 }}>
              ✕ MISIÓN BLOQUEADA
            </div>
            <div className="pcard" style={{ background: 'var(--bg-3)', padding: 10 }}>
              <div className="tiny up" style={{ color: 'var(--blood)', marginBottom: 6 }}>REQUISITOS PREVIOS</div>
              {getMissingPrereqs(currentQuest).map((r, i) => (
                <div key={i} className="vt" style={{ fontSize: 16, color: 'var(--amber)' }}>• {r}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* World / Quest list */}
      <div style={{
        borderTop: '4px solid var(--ink)',
        maxHeight: 200, overflowY: 'auto', flexShrink: 0,
        background: 'var(--bg)',
      }}>
        {worlds.map((world, wi) => (
          <div key={world}>
            <button
              onClick={() => toggleWorld(world)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '10px 14px',
                background: 'var(--bg-2)',
                border: 'none', borderBottom: '4px solid var(--ink)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <span className="tiny up" style={{ color: WORLD_COLORS[wi % WORLD_COLORS.length] }}>
                MUNDO {world}
              </span>
              <span className="tiny" style={{ color: 'var(--parchment-2)' }}>
                {expandedWorlds[world] ? '▼' : '▶'}
              </span>
            </button>

            {expandedWorlds[world] && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '4px 8px 8px' }}>
                {quests
                  .filter(q => q.world === world)
                  .sort((a, b) => a.order - b.order)
                  .map(quest => {
                    const status = getQuestStatus(quest.id);
                    const locked = !isQuestUnlocked(quest);
                    return (
                      <QuestCard
                        key={quest.id}
                        quest={quest}
                        isActive={currentQuest.id === quest.id}
                        isLocked={locked}
                        status={locked ? 'locked' : status}
                        onClick={() => selectQuest(quest)}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
