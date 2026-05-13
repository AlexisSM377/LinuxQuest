import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';
import GameNav from '../components/game/GameNav';
import WorldProgress from '../components/stats/WorldProgress';
import AchievementBadge from '../components/stats/AchievementBadge';
import LeaderboardPanel from '../components/LeaderboardPanel';
import AchievementsPanel from '../components/AchievementsPanel';

const STAT_CELLS = (userStats, totalCompleted, totalQuests, achievementCount) => [
  { k: 'NIVEL',       v: String(userStats.level).padStart(2, '0'), c: 'var(--amber)' },
  { k: 'XP TOTAL',    v: userStats.xp?.toLocaleString(),           c: 'var(--leaf)' },
  { k: 'MISIONES',    v: `${totalCompleted}/${totalQuests}`,        c: 'var(--sky)' },
  { k: 'MONEDAS',     v: `◈ ${userStats.coins}`,                   c: 'var(--amber)' },
  { k: 'LOGROS',      v: achievementCount,                         c: 'var(--plum)' },
];

export default function StatsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { userStats, achievements, userAchievements, quests, userProgress } = useGameStore();
  const [questsByWorld, setQuestsByWorld] = useState({});
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const grouped = {};
    quests.forEach(q => {
      if (!grouped[q.world]) grouped[q.world] = [];
      grouped[q.world].push(q);
    });
    setQuestsByWorld(grouped);
  }, [quests]);

  const totalCompleted = userProgress.filter(p => p.status === 'completed').length;
  const totalQuests = quests.length;
  const totalPct = totalQuests > 0 ? Math.round((totalCompleted / totalQuests) * 100) : 0;
  const earnedIds = userAchievements.map(a => a.id);

  const cells = STAT_CELLS(userStats, totalCompleted, totalQuests, userAchievements.length);

  return (
    <div className="stats-page">
      <GameNav onShowAchievements={() => setShowAchievements(true)} />

      {/* Breadcrumb */}
      <div className="stats-breadcrumb">
        <button
          className="btn btn-ghost"
          onClick={() => navigate('/game')}
          style={{ fontSize: 9, padding: '8px 12px', whiteSpace: 'nowrap' }}
        >
          ◀ VOLVER AL JUEGO
        </button>
        <div style={{ flex: 1 }} />
        <div className="tiny up" style={{ color: 'var(--amber)', whiteSpace: 'nowrap' }}>▸ ESTADÍSTICAS</div>
      </div>

      {/* Player hero */}
      <div className="stats-hero">
        <div style={{
          width: 80, height: 80, flexShrink: 0,
          background: 'var(--bg-2)',
          border: '4px solid var(--ink)',
          boxShadow: '6px 6px 0 var(--shadow)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40,
        }}>
          ⬡
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="tiny up" style={{ color: 'var(--amber)', marginBottom: 8 }}>▸ APRENDIZ DE KERNEL</div>
          <h1 className="stats-hero-username">
            {user?.username?.toUpperCase() || 'JUGADOR'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div className="bar" style={{ width: 160, flex: 'none' }}>
              <i style={{ width: totalPct + '%', transition: 'width 0.3s' }} />
            </div>
            <span className="tiny up muted">{totalCompleted} DE {totalQuests} MISIONES</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-amber" onClick={() => navigate('/game')}>
            CONTINUAR ▶
          </button>
          <button className="btn btn-ghost" onClick={() => setShowAchievements(true)}>
            LOGROS
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="stats-strip">
        {cells.map((s, i) => (
          <div key={i} className="stats-strip-cell" style={{
            borderRight: i < 4 ? '4px solid var(--ink)' : 'none',
            background: i % 2 ? 'var(--bg-2)' : 'var(--bg)',
          }}>
            <div className="tiny up muted">{s.k}</div>
            <div className="stat-value" style={{ color: s.c }}>
              {s.v}
            </div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="stats-body">

        {/* Mundos */}
        <div>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>PROGRESO POR MUNDO</h2>
          <WorldProgress questsByWorld={questsByWorld} userProgress={userProgress} />
        </div>

        {/* Logros recientes */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 16 }}>LOGROS</h2>
            <button
              className="btn btn-ghost"
              style={{ fontSize: 8, padding: '6px 10px' }}
              onClick={() => setShowAchievements(true)}
            >
              VER TODOS →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {achievements.length === 0 ? (
              <div className="pcard" style={{ background: 'var(--bg-2)', padding: 14 }}>
                <div className="tiny up muted">SIN LOGROS AÚN</div>
              </div>
            ) : (
              achievements.slice(0, 5).map(a => (
                <AchievementBadge
                  key={a.id}
                  achievement={a}
                  earned={earnedIds.includes(a.id)}
                  earnedAt={userAchievements.find(ua => ua.id === a.id)?.earned_at}
                />
              ))
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>CLASIFICACIÓN</h2>
          <LeaderboardPanel userId={user?.id} />
        </div>
      </div>

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
