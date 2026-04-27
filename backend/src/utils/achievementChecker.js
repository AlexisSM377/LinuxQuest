import pool from '../db.js';
import { ACHIEVEMENTS } from '../config/achievementsConfig.js';

export default class AchievementChecker {
  static async checkAchievements(userId, context) {
    const { questId, level, totalQuests, leveledUp } = context;
    const newAchievements = [];

    try {
      // Check primer_paso (first quest completion)
      const firstQuestCheck = await this.checkFirstQuest(userId);
      if (firstQuestCheck) newAchievements.push('primer_paso');

      // Check level achievements
      const levelAchievements = await this.checkLevelAchievements(level);
      newAchievements.push(...levelAchievements);

      // Check world completion achievements
      const worldAchievements = await this.checkWorldAchievements(userId);
      newAchievements.push(...worldAchievements);

      // Check quest count achievements
      const countAchievements = await this.checkQuestCountAchievements(userId, totalQuests);
      newAchievements.push(...countAchievements);

      // Check daily quests achievement
      const dailyAchievement = await this.checkDailyQuests(userId);
      if (dailyAchievement) newAchievements.push('velocista');

      // Check all quests completed
      const allQuestsAchievement = await this.checkAllQuestsCompleted(userId);
      if (allQuestsAchievement) newAchievements.push('completista');

      // Remove duplicates and filter out already earned
      const uniqueAchievements = [...new Set(newAchievements)];
      const earnedAchievements = await this.getEarnedAchievements(userId);
      const newEarned = uniqueAchievements.filter(a => !earnedAchievements.includes(a));

      return newEarned;
    } catch (error) {
      console.error('Error checking achievements:', error);
      return [];
    }
  }

  static async checkFirstQuest(userId) {
    const result = await pool.query(
      `SELECT COUNT(*) as count FROM user_quest_progress
       WHERE user_id = $1 AND status = 'completed'`,
      [userId]
    );
    return result.rows[0].count === 1;
  }

  static async checkLevelAchievements(level) {
    const achievements = [];
    if (level >= 5) achievements.push('nivel_5');
    if (level >= 10) achievements.push('nivel_10');
    if (level >= 20) achievements.push('nivel_20');
    return achievements;
  }

  static async checkWorldAchievements(userId) {
    const achievements = [];

    const worldQuests = {
      1: await this.getWorldCompletionCount(userId, 1),
      2: await this.getWorldCompletionCount(userId, 2),
      3: await this.getWorldCompletionCount(userId, 3)
    };

    const worldTotals = {
      1: await this.getTotalWorldQuests(1),
      2: await this.getTotalWorldQuests(2),
      3: await this.getTotalWorldQuests(3)
    };

    if (worldQuests[1] === worldTotals[1]) achievements.push('mundo_1');
    if (worldQuests[2] === worldTotals[2]) achievements.push('mundo_2');
    if (worldQuests[3] === worldTotals[3]) achievements.push('mundo_3');

    return achievements;
  }

  static async checkQuestCountAchievements(userId, totalCompleted) {
    const achievements = [];
    if (totalCompleted >= 50) achievements.push('coleccionista');
    if (totalCompleted >= 100) achievements.push('guerrero_persistente');
    return achievements;
  }

  static async checkDailyQuests(userId) {
    const result = await pool.query(
      `SELECT COUNT(*) as count FROM user_quest_progress
       WHERE user_id = $1 AND status = 'completed'
       AND DATE(completed_at) = CURRENT_DATE`,
      [userId]
    );
    return result.rows[0].count >= 5;
  }

  static async checkAllQuestsCompleted(userId) {
    const result = await pool.query(
      `SELECT COUNT(*) as completed FROM user_quest_progress
       WHERE user_id = $1 AND status = 'completed'`,
      [userId]
    );
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM quests');

    return result.rows[0].completed === totalResult.rows[0].total;
  }

  static async getWorldCompletionCount(userId, worldId) {
    const result = await pool.query(
      `SELECT COUNT(*) as count FROM user_quest_progress uqp
       JOIN quests q ON uqp.quest_id = q.id
       WHERE uqp.user_id = $1 AND q.world = $2 AND uqp.status = 'completed'`,
      [userId, worldId]
    );
    return result.rows[0].count;
  }

  static async getTotalWorldQuests(worldId) {
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM quests WHERE world = $1',
      [worldId]
    );
    return result.rows[0].count;
  }

  static async getEarnedAchievements(userId) {
    const result = await pool.query(
      `SELECT achievement_id FROM user_achievements WHERE user_id = $1`,
      [userId]
    );
    return result.rows.map(r => r.achievement_id);
  }

  static async saveAchievements(userId, achievementIds) {
    if (achievementIds.length === 0) return;

    const values = achievementIds.map((id, idx) => `($1, $${idx + 2})`).join(',');
    const params = [userId, ...achievementIds];

    await pool.query(
      `INSERT INTO user_achievements (user_id, achievement_id) VALUES ${values}
       ON CONFLICT (user_id, achievement_id) DO NOTHING`,
      params
    );
  }
}
