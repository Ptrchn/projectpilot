import { useEffect, useState } from 'react';
import api from '../api';

const statusOptions = ['Todo', 'In Progress', 'Done'];
const priorityOptions = ['Low', 'Medium', 'High'];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Todo');
  const [deadline, setDeadline] = useState('');
  const [message, setMessage] = useState('');

  const loadData = async () => {
    const [taskRes, projectRes] = await Promise.all([api.get('/tasks'), api.get('/projects')]);
    setTasks(taskRes.data);
    setProjects(projectRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setProjectId('');
    setPriority('Medium');
    setStatus('Todo');
    setDeadline('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/tasks', { title, description, projectId, priority, status, deadline });
      await loadData();
      clearForm();
      setMessage('Task created successfully.');
    } catch (error) {
      setMessage('Unable to create task.');
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    await loadData();
  };

  const updateStatus = async (task, nextStatus) => {
    await api.put(`/tasks/${task.id}`, { ...task, status: nextStatus });
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
        <h2 className="text-xl font-semibold text-white">New Task</h2>
        <p className="mt-2 text-slate-400">Add a task to your project and track its progress.</p>
        {message && <div className="mt-4 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div>}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          />
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          >
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="sm:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          >
            {statusOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          >
            {priorityOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          />
          <button className="rounded-2xl bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-500 sm:col-span-2">
            Create task
          </button>
        </form>
      </div>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{task.description || 'No description'}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">{task.project?.name || 'Project'}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">{task.priority}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">{task.status}</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-500">Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'None'}</div>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => updateStatus(task, option)}
                    className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
                  >
                    {option}
                  </button>
                ))}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="rounded-full border border-red-600 px-3 py-1 text-xs text-red-300 hover:bg-red-600/10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
