import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Terminal from '../components/Terminal';
import Quest from '../components/Quest';
import XpNotification from '../components/XpNotification';
import AchievementsPanel from '../components/AchievementsPanel';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

export default function GamePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const { currentQuestId, userStats, achievements, userAchievements, fetchQuests, fetchUserStats, fetchAchievements, fetchUserAchievements, fetchNPCs, fetchEnemies, completeQuest } = useGameStore();
  const [notification, setNotification] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchQuests();
    fetchUserStats();
    fetchAchievements();
    fetchUserAchievements();
    fetchNPCs();
    fetchEnemies();
  }, [fetchQuests, fetchUserStats, fetchAchievements, fetchUserAchievements, fetchNPCs, fetchEnemies]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleQuestComplete = async () => {
    if (!currentQuestId) return;
    try {
      const result = await completeQuest(currentQuestId);
      if (result?.success) {
        const notificationData = {
          xpGained: result.xpGained,
          coinsGained: result.coinsGained,
          questTitle: 'Quest Completada',
          leveledUp: result.leveledUp,
          newLevel: result.newLevel
        };

        if (result.newAchievements && result.newAchievements.length > 0) {
          const achievementIds = result.newAchievements;
          const newAchievementObjects = achievementIds
            .map(id => achievements.find(a => a.id === id))
            .filter(Boolean);
          notificationData.newAchievements = newAchievementObjects;
        }

        setNotification(notificationData);
        await fetchUserAchievements();
      } else {
        console.error('Failed to complete quest:', result?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black">
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex justify-between items-center">
        <h1 className="text-emerald-400 font-bold text-lg">LinuxQuest</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded">
            <div className="text-right">
              <div className="text-emerald-400 font-bold text-sm">Nivel {userStats.level}</div>
              <div className="text-gray-400 text-xs">{userStats.xp} XP</div>
            </div>
            <div className="w-32 h-4 bg-gray-700 rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${userStats.progress}%` }}
              ></div>
            </div>
            <div className="text-amber-400 font-bold">🪙 {userStats.coins}</div>
          </div>

          <button
            onClick={() => setShowAchievements(true)}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition font-bold"
            title="Logros"
          >
            🏆 Logros
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex">
        <div className="w-1/3 overflow-y-auto">
          <Quest onCompleteClick={handleQuestComplete} />
        </div>
        <div className="w-2/3 overflow-hidden">
          <Terminal questId={currentQuestId} />
        </div>
      </div>

      {notification && (
        <XpNotification
          {...notification}
          onClose={() => setNotification(null)}
        />
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
