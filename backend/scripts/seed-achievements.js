import pool from '../src/db.js';
import { ACHIEVEMENTS } from '../src/config/achievementsConfig.js';

const seedAchievements = async () => {
  try {
    console.log('Seeding achievements...');

    for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
      await pool.query(
        `INSERT INTO achievements (id, title, description, icon, xp_bonus)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE
         SET title = $2, description = $3, icon = $4, xp_bonus = $5`,
        [achievement.id, achievement.title, achievement.description, achievement.icon, achievement.xp_bonus]
      );
    }

    console.log(`✓ ${Object.keys(ACHIEVEMENTS).length} achievements seeded`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding achievements:', error.message);
    process.exit(1);
  }
};

seedAchievements();
