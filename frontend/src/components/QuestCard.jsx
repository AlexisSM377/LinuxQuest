export default function QuestCard({ quest, isActive, isCompleted, isLocked, onClick, status }) {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      1: 'from-green-500 to-green-600',
      2: 'from-blue-500 to-blue-600',
      3: 'from-yellow-500 to-yellow-600',
      4: 'from-orange-500 to-orange-600',
      5: 'from-red-500 to-red-600'
    };
    return colors[difficulty] || 'from-gray-500 to-gray-600';
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = ['', 'Fácil', 'Medio', 'Difícil', 'Muy Difícil', 'Legendario'];
    return labels[difficulty] || 'Desconocida';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: '✓',
      'in-progress': '►',
      'in_progress': '►',
      locked: '🔒'
    };
    return icons[status] || '?';
  };

  const getStatusBgColor = (status) => {
    const colors = {
      completed: 'bg-emerald-900 border-emerald-600 hover:bg-emerald-800',
      'in-progress': 'bg-blue-900 border-blue-600 hover:bg-blue-800',
      'in_progress': 'bg-blue-900 border-blue-600 hover:bg-blue-800',
      locked: 'bg-gray-800 border-gray-700 hover:bg-gray-750 cursor-not-allowed'
    };
    return colors[status] || 'bg-gray-800 border-gray-700';
  };

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        w-full p-3 rounded border transition-all
        ${isActive
          ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400 shadow-lg'
          : `${getStatusBgColor(status)} text-gray-200 border`
        }
        ${isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md'}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 text-left">
          <span className="text-lg min-w-fit">{getStatusIcon(status)}</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">
              M{quest.order}: {quest.title.substring(0, 25)}
            </p>
            {!isLocked && (
              <div className="flex items-center gap-2 mt-1 text-xs opacity-80">
                <span className={`bg-gradient-to-r ${getDifficultyColor(quest.difficulty)} text-white px-2 py-0.5 rounded`}>
                  {getDifficultyLabel(quest.difficulty)}
                </span>
                <span>⭐ {quest.rewards?.xp || 0} XP</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
