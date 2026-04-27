import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Terminal from '../components/Terminal';
import Quest from '../components/Quest';
import XpNotification from '../components/XpNotification';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

export default function GamePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const { currentQuestId, userStats, fetchQuests, fetchUserStats, completeQuest } = useGameStore();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchQuests();
    fetchUserStats();
  }, [fetchQuests, fetchUserStats]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleQuestComplete = async () => {
    if (!currentQuestId) return;
    const result = await completeQuest(currentQuestId);
    if (result?.success) {
      setNotification({
        xpGained: result.xpGained,
        coinsGained: result.coinsGained,
        questTitle: 'Quest Completada',
        leveledUp: result.leveledUp,
        newLevel: result.newLevel
      });
      setTimeout(() => fetchUserStats(), 100);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black">
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex justify-between items-center">
        <h1 className="text-emerald-400 font-bold text-lg">LinuxQuest</h1>

        <div className="flex items-center gap-6">
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
    </div>
  );
}
