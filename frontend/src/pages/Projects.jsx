import { useEffect, useState } from 'react';
import api from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const loadProjects = async () => {
    const response = await api.get('/projects');
    setProjects(response.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setEditId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editId) {
        await api.put(`/projects/${editId}`, { name, description });
      } else {
        await api.post('/projects', { name, description });
      }
      await loadProjects();
      resetForm();
      setMessage('Project saved successfully.');
    } catch (error) {
      setMessage('Could not save project.');
    }
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setName(project.name);
    setDescription(project.description || '');
  };

  const handleDelete = async (id) => {
    await api.delete(`/projects/${id}`);
    await loadProjects();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <p className="mt-2 text-slate-400">Create and manage your project containers.</p>
        {message && <div className="mt-4 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div>}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          />
          <button className="sm:col-span-2 rounded-2xl bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-500">
            {editId ? 'Update Project' : 'Add Project'}
          </button>
        </form>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-sm shadow-slate-900/30">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{project.description || 'No description added.'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(project)} className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)} className="rounded-xl border border-red-600 px-3 py-2 text-sm text-red-300 hover:bg-red-600/10">
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
