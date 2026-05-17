const express = require('express');
const prisma = require('../prismaClient');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const projectCount = await prisma.project.count({ where: { userId: req.userId } });
  const taskCount = await prisma.task.count({ where: { project: { userId: req.userId } } });
  const completedTasks = await prisma.task.count({ where: { project: { userId: req.userId }, status: 'Done' } });
  const progress = taskCount ? Math.round((completedTasks / taskCount) * 100) : 0;

  res.json({ projectCount, taskCount, completedTasks, progress });
});

module.exports = router;
