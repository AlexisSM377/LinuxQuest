import express from 'express';
import Quest from '../models/Quest.js';
import Progress from '../models/Progress.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Obtener todas las quests
router.get('/', async (req, res) => {
  try {
    const quests = await Quest.findAll();
    res.json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ error: 'Error fetching quests' });
  }
});

// Obtener quest por ID
router.get('/:id', async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }
    res.json(quest);
  } catch (error) {
    console.error('Error fetching quest:', error);
    res.status(500).json({ error: 'Error fetching quest' });
  }
});

// Obtener quests por mundo
router.get('/world/:worldId', async (req, res) => {
  try {
    const quests = await Quest.findByWorld(req.params.worldId);
    res.json(quests);
  } catch (error) {
    console.error('Error fetching world quests:', error);
    res.status(500).json({ error: 'Error fetching quests' });
  }
});

// Obtener progreso del usuario
router.get('/user/progress', verifyToken, async (req, res) => {
  try {
    const progress = await Progress.findByUser(req.userId);
    const stats = await Progress.getStats(req.userId);
    res.json({ progress, stats });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Error fetching progress' });
  }
});

// Completar una quest
router.post('/:id/complete', verifyToken, async (req, res) => {
  try {
    const questId = req.params.id;
    const quest = await Quest.findById(questId);

    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    let progress = await Progress.findByUserAndQuest(req.userId, questId);

    if (!progress) {
      progress = await Progress.create(req.userId, questId);
    }

    const updated = await Progress.updateStatus(req.userId, questId, 'completed');
    res.json({ success: true, progress: updated });
  } catch (error) {
    console.error('Error completing quest:', error);
    res.status(500).json({ error: 'Error completing quest' });
  }
});

export default router;
