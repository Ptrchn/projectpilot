const express = require('express');
const prisma = require('../prismaClient');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(projects);
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Project name is required.' });
  }
  const project = await prisma.project.create({
    data: { name, description: description || '', userId: req.userId },
  });
  res.json(project);
});

router.put('/:id', async (req, res) => {
  const projectId = Number(req.params.id);
  const { name, description } = req.body;
  const existing = await prisma.project.findUnique({ where: { id: projectId } });

  if (!existing || existing.userId !== req.userId) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { name, description },
  });
  res.json(project);
});

router.delete('/:id', async (req, res) => {
  const projectId = Number(req.params.id);
  const existing = await prisma.project.findUnique({ where: { id: projectId } });
  if (!existing || existing.userId !== req.userId) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  await prisma.task.deleteMany({ where: { projectId } });
  await prisma.project.delete({ where: { id: projectId } });
  res.json({ message: 'Project deleted.' });
});

module.exports = router;
