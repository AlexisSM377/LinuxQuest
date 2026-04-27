import express from 'express';
import { ENEMIES, getEnemiesbyWorld } from '../config/enemiesConfig.js';

const router = express.Router();

// Get all enemies
router.get('/', async (req, res) => {
  try {
    const enemies = Object.values(ENEMIES);
    res.json(enemies);
  } catch (error) {
    console.error('Error fetching enemies:', error);
    res.status(500).json({ error: 'Error fetching enemies' });
  }
});

// Get enemies by world
router.get('/world/:worldId', async (req, res) => {
  try {
    const enemies = getEnemiesbyWorld(parseInt(req.params.worldId));
    res.json(enemies);
  } catch (error) {
    console.error('Error fetching enemies by world:', error);
    res.status(500).json({ error: 'Error fetching enemies' });
  }
});

// Get specific enemy
router.get('/:enemyId', async (req, res) => {
  try {
    const enemy = ENEMIES[req.params.enemyId];
    if (!enemy) {
      return res.status(404).json({ error: 'Enemy not found' });
    }
    res.json(enemy);
  } catch (error) {
    console.error('Error fetching enemy:', error);
    res.status(500).json({ error: 'Error fetching enemy' });
  }
});

export default router;
