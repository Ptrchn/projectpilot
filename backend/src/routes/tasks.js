const express = require('express');
const prisma = require('../prismaClient');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { project: { userId: req.userId } },
    orderBy: { createdAt: 'desc' },
    include: { project: true },
  });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description, status, priority, deadline, projectId } = req.body;
  if (!title || !projectId) {
    return res.status(400).json({ message: 'Title and project are required.' });
  }

  const project = await prisma.project.findUnique({ where: { id: Number(projectId) } });
  if (!project || project.userId !== req.userId) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  const task = await prisma.task.create({
    data: {
      title,
      description: description || '',
      status: status || 'Todo',
      priority: priority || 'Medium',
      deadline: deadline ? new Date(deadline) : null,
      projectId: Number(projectId),
    },
  });
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const taskId = Number(req.params.id);
  const { title, description, status, priority, deadline } = req.body;
  const task = await prisma.task.findUnique({ where: { id: taskId }, include: { project: true } });

  if (!task || task.project.userId !== req.userId) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      description,
      status,
      priority,
      deadline: deadline ? new Date(deadline) : null,
    },
  });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const taskId = Number(req.params.id);
  const task = await prisma.task.findUnique({ where: { id: taskId }, include: { project: true } });

  if (!task || task.project.userId !== req.userId) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  await prisma.task.delete({ where: { id: taskId } });
  res.json({ message: 'Task deleted.' });
});

module.exports = router;
