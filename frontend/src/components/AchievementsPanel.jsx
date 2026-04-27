import { useState } from 'react';

export default function AchievementsPanel({ achievements, userAchievements, onClose }) {
  const [filter, setFilter] = useState('all');

  const earnedIds = userAchievements.map(a => a.id);
  const earnedCount = earnedIds.length;
  const totalCount = achievements.length;
  const completionPercent = Math.round((earnedCount / totalCount) * 100);

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'earned') return earnedIds.includes(achievement.id);
    if (filter === 'locked') return !earnedIds.includes(achievement.id);
    return true;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-700 max-w-2xl w-full max-h-96 overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-700 p-4 flex justify-between items-center bg-gray-850">
          <div>
            <h2 className="text-emerald-400 font-bold text-xl">🏆 Logros</h2>
            <p className="text-gray-400 text-sm mt-1">
              {earnedCount} de {totalCount} completados ({completionPercent}%)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="border-b border-gray-700 px-4 pt-3 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 text-sm font-bold rounded transition ${
              filter === 'all'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('earned')}
            className={`px-3 py-2 text-sm font-bold rounded transition ${
              filter === 'earned'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Desbloqueados
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-2 text-sm font-bold rounded transition ${
              filter === 'locked'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Bloqueados
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="overflow-y-auto flex-1 p-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredAchievements.map(achievement => {
              const isEarned = earnedIds.includes(achievement.id);
              const earnedData = userAchievements.find(a => a.id === achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={`p-3 rounded border transition ${
                    isEarned
                      ? 'bg-emerald-900 border-emerald-600'
                      : 'bg-gray-800 border-gray-700 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className={`font-bold text-sm ${
                    isEarned ? 'text-emerald-300' : 'text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{achievement.description}</p>
                  {isEarned && earnedData?.earned_at && (
                    <p className="text-xs text-emerald-500 mt-2">
                      ✓ Desbloqueado
                    </p>
                  )}
                  {!isEarned && (
                    <p className="text-xs text-gray-500 mt-2">🔒 Bloqueado</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
