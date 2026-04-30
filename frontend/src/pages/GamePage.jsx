import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Terminal from '../components/Terminal';
import Quest from '../components/Quest';
import XpNotification from '../components/XpNotification';
import AchievementsPanel from '../components/AchievementsPanel';
import GameNav from '../components/game/GameNav';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

export default function GamePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    currentQuestId, currentQuest, userStats, achievements, userAchievements,
    userProgress,
    fetchQuests, fetchUserStats, fetchAchievements, fetchUserAchievements,
    fetchNPCs, fetchEnemies, completeQuest,
  } = useGameStore();
  const [notification, setNotification] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const battleRef = useRef(null);
  const executedCommandsRef = useRef(new Set());

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchQuests();
    fetchUserStats();
    fetchAchievements();
    fetchUserAchievements();
    fetchNPCs();
    fetchEnemies();
  }, []);

  // Reset executed commands when quest changes
  useEffect(() => {
    executedCommandsRef.current = new Set();
  }, [currentQuestId]);

  const handleQuestComplete = useCallback(async () => {
    if (!currentQuestId) return;
    const result = await completeQuest(currentQuestId);
    if (!result?.success) return;

    const notificationData = {
      xpGained: result.xpGained,
      coinsGained: result.coinsGained,
      achievementBonusXp: result.achievementBonusXp || 0,
      questTitle: 'Misión Completada',
      leveledUp: result.leveledUp,
      newLevel: result.newLevel,
    };

    if (result.newAchievements?.length > 0) {
      notificationData.newAchievements = result.newAchievements
        .map(id => achievements.find(a => a.id === id))
        .filter(Boolean);
    }

    setNotification(notificationData);
    await fetchUserAchievements();
  }, [currentQuestId, completeQuest, achievements, fetchUserAchievements]);

  const handleCommandExec = useCallback((command, response) => {
    if (!currentQuest || !response) return;

    const quest = currentQuest;
    const required = quest.required_commands || [];
    const cmdName = command.trim().split(/\s+/)[0];

    // Battle: solo registrar hits por comandos requeridos de la quest
    const isRequiredCommand = required.length === 0 || required.includes(cmdName);
    if (battleRef.current && isRequiredCommand) {
      if (response.error) {
        battleRef.current.handleIncorrectCommand?.();
      } else {
        battleRef.current.handleCorrectCommand?.();
      }
    }

    if (response.error) return;
    if (required.length === 0) return;

    // Verificar que el comando tiene argumentos reales (no solo --help/-h)
    const args = command.trim().split(/\s+/).slice(1);
    const isHelpOnly = args.length > 0 && args.every(a => a === '--help' || a === '-h');
    if (isHelpOnly) return;

    // Trackear comando ejecutado
    if (required.includes(cmdName)) {
      executedCommandsRef.current.add(cmdName);
    }

    // Solo completar cuando TODOS los required_commands hayan sido ejecutados
    const allDone = required.every(cmd => executedCommandsRef.current.has(cmd));
    if (allDone) {
      const alreadyDone = userProgress.some(
        p => p.quest_id === quest.id && p.status === 'completed'
      );
      if (!alreadyDone) {
        handleQuestComplete();
      }
    }
  }, [currentQuest, userProgress, handleQuestComplete]);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      <GameNav onShowAchievements={() => setShowAchievements(true)} />

      {/* Breadcrumb bar */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '4px solid var(--ink)',
        background: 'var(--bg-2)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexShrink: 0,
      }}>
        <button
          className="btn btn-ghost"
          onClick={() => navigate('/')}
          style={{ fontSize: 9, padding: '8px 12px' }}
        >
          ◀ MAPA DE MISIONES
        </button>
        <div style={{ flex: 1 }} />
        {userStats && (
          <>
            <span className="chip" style={{ fontSize: 9 }}>
              NIV {String(userStats.level).padStart(2, '0')}
            </span>
            <span className="chip" style={{ fontSize: 9 }}>
              XP: {userStats.xp}
            </span>
          </>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        {/* Left: Quest panel */}
        <div style={{ width: '40%', minWidth: 300, maxWidth: 480, flexShrink: 0 }}>
          <Quest onCompleteClick={handleQuestComplete} battleRef={battleRef} />
        </div>

        {/* Right: Terminal */}
        <div style={{ flex: 1, minWidth: 0, borderLeft: '4px solid var(--ink)' }}>
          <Terminal
            questId={currentQuestId}
            userLevel={userStats?.level || 1}
            onCommandExec={handleCommandExec}
          />
        </div>
      </div>

      {notification && (
        <XpNotification {...notification} onClose={() => setNotification(null)} />
      )}

      {showAchievements && (
        <AchievementsPanel
          achievements={achievements}
          userAchievements={userAchievements}
          onClose={() => setShowAchievements(false)}
        />
      )}
    </div>
  );
}
