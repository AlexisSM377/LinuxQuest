import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';

export default function Quest({ onCompleteClick }) {
  const { currentQuestId, currentQuest, quests, loading, setCurrentQuest, setCurrentQuestId, userProgress, fetchUserProgress } = useGameStore();
  const { user } = useAuthStore();
  const [expandedWorlds, setExpandedWorlds] = useState({ 1: true });

  useEffect(() => {
    if (quests.length > 0 && !currentQuest && !currentQuestId) {
      const firstQuest = quests[0];
      setCurrentQuestId(firstQuest.id);
      setCurrentQuest(firstQuest);
    }
  }, [quests, currentQuest, currentQuestId, setCurrentQuest, setCurrentQuestId]);

  useEffect(() => {
    if (user?.id) {
      fetchUserProgress();
    }
  }, [user, fetchUserProgress]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 border-r border-gray-700">
        <p className="text-emerald-400">Cargando misiones...</p>
      </div>
    );
  }

  if (!currentQuest) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 border-r border-gray-700">
        <p className="text-gray-400">Selecciona una misión</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      1: 'text-green-400',
      2: 'text-blue-400',
      3: 'text-yellow-400',
      4: 'text-orange-400',
      5: 'text-red-400'
    };
    return colors[difficulty] || 'text-gray-400';
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = ['', 'Fácil', 'Medio', 'Difícil', 'Muy Difícil', 'Legendario'];
    return labels[difficulty] || 'Desconocida';
  };

  const getQuestStatus = (questId) => {
    const progress = userProgress.find(p => p.quest_id === questId);
    return progress?.status || 'locked';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-emerald-900 text-emerald-300 border-emerald-600',
      'in-progress': 'bg-blue-900 text-blue-300 border-blue-600',
      'in_progress': 'bg-blue-900 text-blue-300 border-blue-600',
      locked: 'bg-gray-800 text-gray-400 border-gray-700'
    };
    return colors[status] || 'bg-gray-800 text-gray-400 border-gray-700';
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

  const worlds = [...new Set(quests.map(q => q.world))].sort((a, b) => a - b);

  const toggleWorld = (world) => {
    setExpandedWorlds(prev => ({
      ...prev,
      [world]: !prev[world]
    }));
  };

  const selectQuest = (quest) => {
    setCurrentQuestId(quest.id);
    setCurrentQuest(quest);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 border-r border-gray-700 overflow-hidden">
      {/* Quest Details - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-gray-700 bg-gray-850 sticky top-0">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-emerald-400 font-bold text-lg">{currentQuest.title}</h2>
            <span className={`text-xs font-bold px-2 py-1 rounded ${getDifficultyColor(currentQuest.difficulty)}`}>
              {getDifficultyLabel(currentQuest.difficulty)}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Mundo {currentQuest.world}</p>
          <p className="text-gray-500 text-sm italic">PNJ: {currentQuest.npc}</p>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-blue-400 font-bold mb-2">Descripción</h3>
          <p className="text-gray-300 text-sm">{currentQuest.description}</p>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-blue-400 font-bold mb-2">Historia</h3>
          <p className="text-gray-300 text-sm">{currentQuest.story}</p>
        </div>

        {currentQuest.hints && currentQuest.hints.length > 0 && (
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-yellow-400 font-bold mb-2">💡 Pistas</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              {currentQuest.hints.map((hint, idx) => (
                <li key={idx} className="text-yellow-600">• {hint}</li>
              ))}
            </ul>
          </div>
        )}

        {currentQuest.required_commands && currentQuest.required_commands.length > 0 && (
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-green-400 font-bold mb-2">Comandos Permitidos</h3>
            <div className="flex flex-wrap gap-2">
              {currentQuest.required_commands.map((cmd, idx) => (
                <code key={idx} className="bg-black px-2 py-1 rounded text-green-400 text-xs font-mono border border-green-700">
                  {cmd}
                </code>
              ))}
            </div>
          </div>
        )}

        {currentQuest.objectives && currentQuest.objectives.length > 0 && (
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-purple-400 font-bold mb-2">Objetivos</h3>
            <ol className="text-gray-300 text-sm space-y-2">
              {currentQuest.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-purple-400 mr-2">{idx + 1}.</span>
                  <span>{obj.description}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {currentQuest.rewards && (
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-amber-400 font-bold mb-2">🏆 Recompensas</h3>
            <div className="text-sm text-gray-300">
              <p>⭐ XP: <span className="text-amber-400 font-bold">{currentQuest.rewards?.xp || 0}</span></p>
              <p>🪙 Monedas: <span className="text-amber-400 font-bold">{currentQuest.rewards?.coins || 0}</span></p>
            </div>
          </div>
        )}
      </div>

      {/* Complete Button */}
      <div className="border-t border-gray-700 p-3">
        <button
          onClick={() => onCompleteClick?.()}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition"
        >
          ✓ Completar Misión
        </button>
      </div>

      {/* World/Quest List - Scrollable */}
      <div className="border-t border-gray-700 bg-gray-850 max-h-48 overflow-y-auto">
        <div className="p-2">
          {worlds.map(world => (
            <div key={world}>
              <button
                onClick={() => toggleWorld(world)}
                className="w-full px-3 py-2 hover:bg-gray-800 rounded text-left text-sm font-bold text-emerald-400 transition flex justify-between items-center"
              >
                <span>Mundo {world}</span>
                <span className="text-xs text-gray-500">
                  {expandedWorlds[world] ? '▼' : '▶'}
                </span>
              </button>

              {expandedWorlds[world] && (
                <div className="pl-2 space-y-1">
                  {quests
                    .filter(q => q.world === world)
                    .sort((a, b) => a.order - b.order)
                    .map(quest => {
                      const status = getQuestStatus(quest.id);
                      const isActive = currentQuest.id === quest.id;
                      return (
                        <button
                          key={quest.id}
                          onClick={() => selectQuest(quest)}
                          className={`w-full px-3 py-2 rounded text-left text-xs transition border ${
                            isActive
                              ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                              : `${getStatusColor(status)} hover:opacity-80`
                          }`}
                        >
                          <span className="mr-2">{getStatusIcon(status)}</span>
                          <span>M{quest.order}: {quest.title.substring(0, 20)}</span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
