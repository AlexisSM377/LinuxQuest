import pool from '../db.js';

export default class Quest {
  static async findAll() {
    const result = await pool.query('SELECT * FROM quests ORDER BY world, "order"');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM quests WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByWorld(world) {
    const result = await pool.query(
      'SELECT * FROM quests WHERE world = $1 ORDER BY "order"',
      [world]
    );
    return result.rows;
  }

  static async create(questData) {
    const {
      title,
      description,
      world,
      order,
      difficulty,
      npc,
      story,
      hints,
      requiredCommands,
      objectives,
      prerequisites,
      rewards,
      timeLimit
    } = questData;

    const result = await pool.query(
      `INSERT INTO quests
       (title, description, world, "order", difficulty, npc, story, hints, required_commands, objectives, prerequisites, rewards, time_limit)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        title,
        description,
        world,
        order,
        difficulty,
        npc,
        story,
        JSON.stringify(hints),
        JSON.stringify(requiredCommands),
        JSON.stringify(objectives),
        JSON.stringify(prerequisites),
        JSON.stringify(rewards),
        timeLimit
      ]
    );

    return result.rows[0];
  }
}
