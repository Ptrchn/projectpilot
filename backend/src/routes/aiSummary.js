const express = require('express');
const prisma = require('../prismaClient');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { project: { userId: req.userId } } });
  const now = new Date();
  const overdue = tasks.filter((task) => task.deadline && new Date(task.deadline) < now && task.status !== 'Done').length;
  const highPriority = tasks.filter((task) => task.priority === 'High' && task.status !== 'Done').length;
  const completed = tasks.filter((task) => task.status === 'Done').length;

  const parts = [];
  if (overdue) parts.push(`You have ${overdue} overdue task${overdue === 1 ? '' : 's'}.`);
  if (highPriority) parts.push(`There ${highPriority === 1 ? 'is' : 'are'} ${highPriority} high priority task${highPriority === 1 ? '' : 's'} waiting.`);
  if (completed) parts.push(`You have completed ${completed} task${completed === 1 ? '' : 's'}.`);
  if (!parts.length) {
    parts.push('Your task board is looking good — keep the momentum going.');
  }

  res.json({ summary: parts.join(' ') });
});

module.exports = router;
