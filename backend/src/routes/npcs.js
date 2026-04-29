import express from 'express';
import { getNPCsByWorld, getNPC, NPCs } from '../config/npcConfig.js';

const router = express.Router();

// Get all NPCs
router.get('/', async (req, res) => {
  try {
    const npcs = Object.values(NPCs);
    res.json(npcs);
  } catch (error) {
    console.error('Error fetching NPCs:', error);
    res.status(500).json({ error: 'Error fetching NPCs' });
  }
});

// Get NPCs by world
router.get('/world/:worldId', async (req, res) => {
  try {
    const npcs = getNPCsByWorld(parseInt(req.params.worldId));
    res.json(npcs);
  } catch (error) {
    console.error('Error fetching NPCs by world:', error);
    res.status(500).json({ error: 'Error fetching NPCs' });
  }
});

// Get specific NPC
router.get('/:npcId', async (req, res) => {
  try {
    const npc = getNPC(req.params.npcId);
    if (!npc) {
      return res.status(404).json({ error: 'NPC not found' });
    }
    res.json(npc);
  } catch (error) {
    console.error('Error fetching NPC:', error);
    res.status(500).json({ error: 'Error fetching NPC' });
  }
});

export default router;
