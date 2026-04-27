import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';
import LeaderboardPanel from '../components/LeaderboardPanel';

export default function StatsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { userStats, userAchievements, quests, userProgress } = useGameStore();
  const [questsByWorld, setQuestsByWorld] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Group quests by world
    const grouped = {};
    quests.forEach(quest => {
      if (!grouped[quest.world]) {
        grouped[quest.world] = [];
      }
      grouped[quest.world].push(quest);
    });
    setQuestsByWorld(grouped);
  }, [quests]);

  const getWorldProgress = (worldId) => {
    const worldQuests = questsByWorld[worldId] || [];
    const completed = userProgress.filter(
      p => p.status === 'completed' &&
      worldQuests.some(q => q.id === p.quest_id)
    ).length;
    return {
      completed,
      total: worldQuests.length,
      percent: worldQuests.length > 0 ? Math.round((completed / worldQuests.length) * 100) : 0
    };
  };

  const totalCompleted = userProgress.filter(p => p.status === 'completed').length;
  const totalQuests = quests.length;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-emerald-400 font-bold text-3xl">📊 Tus Estadísticas</h1>
          <button
            onClick={() => navigate('/game')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded font-bold transition"
          >
            ← Volver al Juego
          </button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Nivel</p>
            <p className="text-emerald-400 font-bold text-3xl">{userStats.level}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">XP Total</p>
            <p className="text-blue-400 font-bold text-3xl">{userStats.xp.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Monedas</p>
            <p className="text-amber-400 font-bold text-3xl">🪙 {userStats.coins}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Quests</p>
            <p className="text-purple-400 font-bold text-3xl">{totalCompleted}/{totalQuests}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Logros</p>
            <p className="text-orange-400 font-bold text-3xl">🏆 {userAchievements.length}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-8">
          <p className="text-gray-400 text-sm mb-2">Progreso General</p>
          <div className="w-full bg-gray-900 rounded-full h-6 overflow-hidden border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${(totalCompleted / totalQuests) * 100}%` }}
            />
          </div>
          <p className="text-gray-400 text-xs mt-2">{totalCompleted} de {totalQuests} quests completadas</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mundos Progress */}
        <div className="lg:col-span-1">
          <h2 className="text-emerald-400 font-bold text-xl mb-4">🗺️ Mundos</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(worldId => {
              const progress = getWorldProgress(worldId);
              return (
                <div key={worldId} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-emerald-400">Mundo {worldId}</p>
                    <p className="text-gray-400 text-xs">{progress.completed}/{progress.total}</p>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{progress.percent}%</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="lg:col-span-1">
          <h2 className="text-orange-400 font-bold text-xl mb-4">🏆 Logros Desbloqueados</h2>
          <div className="space-y-2">
            {userAchievements.length === 0 ? (
              <p className="text-gray-400 text-sm">No hay logros desbloqueados aún</p>
            ) : (
              userAchievements.map(achievement => (
                <div key={achievement.id} className="bg-gray-800 rounded p-2 border border-gray-700">
                  <p className="font-bold text-purple-400 text-sm">{achievement.title}</p>
                  <p className="text-gray-500 text-xs">{achievement.icon}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-1">
          <h2 className="text-yellow-400 font-bold text-xl mb-4">🏅 Top Jugadores</h2>
          <LeaderboardPanel userId={user?.id} />
        </div>
      </div>
    </div>
  );
}
