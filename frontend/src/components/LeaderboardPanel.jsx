import { useState, useEffect } from 'react';

export default function LeaderboardPanel({ userId }) {
  const [players, setPlayers] = useState([]);
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('global');

  useEffect(() => {
    fetchLeaderboard();
    if (userId) {
      fetchPlayerStats();
    }
  }, [userId, tab]);

  const fetchLeaderboard = async () => {
    try {
      const endpoint = tab === 'global'
        ? `${import.meta.env.VITE_API_URL}/api/leaderboard/top?limit=10`
        : `${import.meta.env.VITE_API_URL}/api/leaderboard/world/${tab}`;

      const response = await fetch(endpoint);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayerStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/leaderboard/player/${userId}`
      );
      const data = await response.json();
      setPlayerStats(data);
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => { setTab('global'); setLoading(true); }}
          className={`px-4 py-2 rounded font-bold transition ${
            tab === 'global'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          🌍 Global
        </button>
        {[1, 2, 3, 4, 5].map(world => (
          <button
            key={world}
            onClick={() => { setTab(world); setLoading(true); }}
            className={`px-4 py-2 rounded font-bold transition ${
              tab === world
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            M{world}
          </button>
        ))}
      </div>

      {/* Your Stats */}
      {playerStats && (
        <div className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-lg p-4 border border-purple-600">
          <h3 className="text-purple-300 font-bold mb-2">Tu Posición</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-yellow-400 font-bold text-2xl">{playerStats.rank}</p>
              <p className="text-gray-400 text-xs">Rank</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold text-2xl">{playerStats.user.level}</p>
              <p className="text-gray-400 text-xs">Nivel</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold text-2xl">{playerStats.questStats.completed_quests}</p>
              <p className="text-gray-400 text-xs">Quests</p>
            </div>
            <div>
              <p className="text-orange-400 font-bold text-2xl">{playerStats.achievements}</p>
              <p className="text-gray-400 text-xs">Logros</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 border-b border-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-400">Rank</th>
              <th className="px-4 py-2 text-left text-gray-400">Jugador</th>
              <th className="px-4 py-2 text-right text-gray-400">Nivel</th>
              <th className="px-4 py-2 text-right text-gray-400">XP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-400">
                  Cargando...
                </td>
              </tr>
            ) : players.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-400">
                  Sin datos
                </td>
              </tr>
            ) : (
              players.map(player => (
                <tr
                  key={player.id}
                  className={`border-b border-gray-700 hover:bg-gray-750 transition ${
                    userId === player.id ? 'bg-emerald-900 bg-opacity-30' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-yellow-400">
                    {getMedalEmoji(player.rank)}
                  </td>
                  <td className="px-4 py-3 text-white font-bold">
                    {player.username}
                  </td>
                  <td className="px-4 py-3 text-right text-emerald-400 font-bold">
                    {player.level}
                  </td>
                  <td className="px-4 py-3 text-right text-blue-400">
                    {player.xp.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
