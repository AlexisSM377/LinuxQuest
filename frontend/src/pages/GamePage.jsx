import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Terminal from '../components/Terminal';
import Quest from '../components/Quest';
import XpNotification from '../components/XpNotification';
import AchievementsPanel from '../components/AchievementsPanel';
import GameNav from '../components/game/GameNav';
import GameTutorial from '../components/GameTutorial';
import IntroOverlay from '../components/IntroOverlay';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

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
  const [introDone, setIntroDone] = useState(() => !!localStorage.getItem('lq-intro-shown'));
  const [showTutorial, setShowTutorial] = useState(false);
  const [canComplete, setCanComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('quest');
  const battleRef = useRef(null);
  const executedCommandsRef = useRef(new Set());
  const completedObjectivesRef = useRef(new Set());
  const isMobile = useIsMobile();

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

  useEffect(() => {
    executedCommandsRef.current = new Set();
    completedObjectivesRef.current = new Set();
    const objectives = currentQuest?.objectives || [];
    setCanComplete(objectives.length === 0);
  }, [currentQuestId, currentQuest]);

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

    const objectives = currentQuest.objectives || [];
    const output = response.output || '';
    const cmdName = command.trim().split(/\s+/)[0];

    const required = currentQuest.required_commands || [];
    const isRequiredCommand = required.length === 0 || required.includes(cmdName);
    if (battleRef.current && isRequiredCommand) {
      if (response.error) {
        battleRef.current.handleIncorrectCommand?.();
      } else {
        battleRef.current.handleCorrectCommand?.();
      }
    }

    if (response.error || objectives.length === 0) return;

    const normalized = command.trim().replace(/\s+/g, ' ');

    for (const obj of objectives) {
      if (completedObjectivesRef.current.has(obj.id)) continue;

      const expected = obj.expectedCommand;
      let cmdMatches = false;

      if (Array.isArray(expected)) {
        cmdMatches = expected.some(e => normalized === e.trim().replace(/\s+/g, ' '));
      } else if (expected) {
        cmdMatches = normalized === expected.trim().replace(/\s+/g, ' ');
      }

      if (!cmdMatches) continue;

      if (obj.validationFn) {
        try {
          // eslint-disable-next-line no-new-func
          const check = new Function('output', `return ${obj.validationFn}`);
          if (!check(output)) continue;
        } catch {
          continue;
        }
      }

      completedObjectivesRef.current.add(obj.id);
    }

    const allDone = objectives.length > 0 &&
      objectives.every(obj => completedObjectivesRef.current.has(obj.id));

    if (allDone) {
      setCanComplete(true);
      const alreadyDone = userProgress.some(
        p => p.quest_id === currentQuest.id && p.status === 'completed'
      );
      if (!alreadyDone) {
        handleQuestComplete();
      }
    }
  }, [currentQuest, userProgress, handleQuestComplete]);

  // En móvil: cambiar a terminal cuando el usuario completa comandos
  const handleCommandExecMobile = useCallback((command, response) => {
    handleCommandExec(command, response);
  }, [handleCommandExec]);

  const questPanel = (
    <div data-tutorial="quest-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Quest
        onCompleteClick={handleQuestComplete}
        battleRef={battleRef}
        canComplete={canComplete}
        onGoToTerminal={isMobile ? () => setActiveTab('terminal') : undefined}
      />
    </div>
  );

  const terminalPanel = (
    <div data-tutorial="terminal" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Terminal
        questId={currentQuestId}
        userLevel={userStats?.level || 1}
        onCommandExec={isMobile ? handleCommandExecMobile : handleCommandExec}
      />
    </div>
  );

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      <div data-tutorial="nav">
        <GameNav onShowAchievements={() => setShowAchievements(true)} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        {isMobile ? (
          /* Mobile: single panel visible, tabs abajo */
          <>
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: activeTab === 'quest' ? 'flex' : 'none', flexDirection: 'column' }}>
              {questPanel}
            </div>
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: activeTab === 'terminal' ? 'flex' : 'none', flexDirection: 'column' }}>
              {terminalPanel}
            </div>
          </>
        ) : (
          /* Desktop: side by side */
          <>
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              {questPanel}
            </div>
            <div style={{ width: '50%', minWidth: 300, flexShrink: 0, borderLeft: '4px solid var(--ink)' }}>
              {terminalPanel}
            </div>
          </>
        )}
      </div>

      {/* Tab bar — solo en móvil */}
      {isMobile && (
        <div style={{
          display: 'flex',
          borderTop: '4px solid var(--ink)',
          background: 'var(--bg-2)',
          flexShrink: 0,
        }}>
          <button
            onClick={() => setActiveTab('quest')}
            style={{
              flex: 1,
              padding: '16px 8px',
              fontFamily: 'var(--font-display)',
              fontSize: 9,
              letterSpacing: 1,
              color: activeTab === 'quest' ? 'var(--ink)' : 'var(--parchment-2)',
              background: activeTab === 'quest' ? 'var(--amber)' : 'var(--bg-2)',
              border: 'none',
              borderRight: '4px solid var(--ink)',
              cursor: 'pointer',
            }}
          >
            MISIÓN
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            style={{
              flex: 1,
              padding: '16px 8px',
              fontFamily: 'var(--font-display)',
              fontSize: 9,
              letterSpacing: 1,
              color: activeTab === 'terminal' ? 'var(--ink)' : 'var(--parchment-2)',
              background: activeTab === 'terminal' ? 'var(--leaf)' : 'var(--bg-2)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            TERMINAL
          </button>
        </div>
      )}

      {!introDone && (
        <IntroOverlay onComplete={() => {
          setIntroDone(true);
          setTimeout(() => setShowTutorial(!localStorage.getItem('lq-tutorial-done')), 500);
        }} />
      )}

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

      {showTutorial && introDone && (
        <GameTutorial onComplete={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
