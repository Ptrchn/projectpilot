import { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ projectCount: 0, taskCount: 0, completedTasks: 0, progress: 0 });
  const [summary, setSummary] = useState('Loading summary...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboard, aiData] = await Promise.all([api.get('/dashboard'), api.get('/ai-summary')]);
        setStats(dashboard.data);
        setSummary(aiData.data.summary);
      } catch (error) {
        setSummary('Unable to load summary.');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Projects</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stats.projectCount}</p>
          <p className="mt-2 text-sm text-slate-400">Active project folders</p>
        </div>
        <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Tasks</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stats.taskCount}</p>
          <p className="mt-2 text-sm text-slate-400">Total tasks across projects</p>
        </div>
        <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Completed</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stats.completedTasks}</p>
          <p className="mt-2 text-sm text-slate-400">Tasks finished successfully</p>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Progress</p>
            <p className="mt-2 text-2xl font-semibold text-white">{stats.progress}% Complete</p>
          </div>
          <div className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">Keep moving forward</div>
        </div>
        <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-900">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" style={{ width: `${stats.progress}%` }} />
        </div>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
        <h2 className="text-lg font-semibold text-white">AI Assistant Summary</h2>
        <p className="mt-3 text-slate-300">{summary}</p>
      </div>
    </div>
  );
}
