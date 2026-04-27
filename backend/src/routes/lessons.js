import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Lesson from '../models/Lesson.js';
import UserProgress from '../models/UserProgress.js';

const router = express.Router();

// Obtener todas las lecciones
router.get('/', verifyToken, async (req, res) => {
  try {
    const lessons = await Lesson.getAll();
    const userProgress = await UserProgress.getByUserId(req.userId);

    const lessonsWithProgress = lessons.map((lesson) => {
      const progress = userProgress.find((p) => p.lesson_id === lesson.id);
      return {
        ...lesson,
        completed: progress?.completed || false
      };
    });

    res.json(lessonsWithProgress);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Error fetching lessons' });
  }
});

// Obtener una lección específica
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const lesson = await Lesson.getById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const progress = await UserProgress.getProgress(req.userId, lesson.id);
    res.json({ ...lesson, completed: progress?.completed || false });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Error fetching lesson' });
  }
});

// Marcar lección como completada
router.post('/:id/complete', verifyToken, async (req, res) => {
  try {
    const lesson = await Lesson.getById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const progress = await UserProgress.markComplete(req.userId, lesson.id);
    res.json({ message: 'Lesson marked as complete', progress });
  } catch (error) {
    console.error('Error marking lesson complete:', error);
    res.status(500).json({ error: 'Error marking lesson complete' });
  }
});

export default router;
