import { useEffect, useState } from 'react';
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
    currentQuestId, userStats, achievements, userAchievements,
    fetchQuests, fetchUserStats, fetchAchievements, fetchUserAchievements,
    fetchNPCs, fetchEnemies, completeQuest,
  } = useGameStore();
  const [notification, setNotification] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);

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

  const handleQuestComplete = async () => {
    if (!currentQuestId) return;
    const result = await completeQuest(currentQuestId);
    if (!result?.success) return;

    const notificationData = {
      xpGained: result.xpGained,
      coinsGained: result.coinsGained,
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
  };

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
        <div style={{ width: '33%', minWidth: 280, maxWidth: 400, flexShrink: 0 }}>
          <Quest onCompleteClick={handleQuestComplete} />
        </div>

        {/* Right: Terminal */}
        <div style={{ flex: 1, minWidth: 0, borderLeft: '4px solid var(--ink)' }}>
          <Terminal questId={currentQuestId} />
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
