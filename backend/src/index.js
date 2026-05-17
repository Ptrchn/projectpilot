require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const dashboardRoutes = require('./routes/dashboard');
const aiRoutes = require('./routes/aiSummary');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://projectpilot-frontend-yrqu.onrender.com',
  credentials: true
}))
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai-summary', aiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ProjectPilot AI backend is running.' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
