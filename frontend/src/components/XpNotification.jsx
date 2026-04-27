import { useState, useEffect } from 'react';

export default function XpNotification({ xpGained, coinsGained, questTitle, leveledUp, newLevel, newAchievements, onClose }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const delayMultiplier = newAchievements && newAchievements.length > 0 ? 4000 : 3000;
    const timer = setTimeout(() => {
      setAnimate(false);
      setTimeout(onClose, 300);
    }, delayMultiplier);
    return () => clearTimeout(timer);
  }, [onClose, newAchievements]);

  if (leveledUp || (newAchievements && newAchievements.length > 0)) {
    return (
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {leveledUp && (
          <div className="bg-gradient-to-b from-yellow-400 to-orange-500 rounded-lg px-8 py-6 text-center shadow-2xl border-2 border-yellow-300 mb-4">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">¡NIVEL {newLevel}!</h2>
            <p className="text-white text-lg mb-4">{questTitle}</p>
            <p className="text-yellow-100 text-sm">Explorador Experimentado</p>
          </div>
        )}
        {newAchievements && newAchievements.length > 0 && (
          <div className="space-y-3">
            {newAchievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-6 py-4 text-center shadow-2xl border-2 border-purple-400 animate-pulse"
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
                <p className="text-purple-100 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        animate ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'
      }`}
    >
      <div className="bg-gray-800 border-l-4 border-emerald-400 rounded px-6 py-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">+{xpGained}</div>
            <div className="text-xs text-gray-400">XP</div>
          </div>
          <div className="w-px h-10 bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">+{coinsGained}</div>
            <div className="text-xs text-gray-400">🪙</div>
          </div>
          <div className="w-px h-10 bg-gray-700"></div>
          <div className="text-sm text-gray-300">
            <p className="font-bold">{questTitle}</p>
            <p className="text-xs text-gray-500">¡Completada!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
