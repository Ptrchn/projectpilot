import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('projectpilot_token');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {token ? <Sidebar /> : null}

      {token && (
        <div className="fixed inset-x-0 top-0 z-50 border-b border-slate-800 bg-slate-950/95 p-3 shadow-sm shadow-slate-950/40 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-white">ProjectPilot AI</span>
            <div className="flex gap-2">
              <a href="/" className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200">Dashboard</a>
              <a href="/projects" className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200">Projects</a>
              <a href="/tasks" className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200">Tasks</a>
            </div>
          </div>
        </div>
      )}

      <main className={`${token ? 'md:pl-72' : ''} ${token ? 'pt-20 md:pt-0' : ''} p-4 sm:p-6`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<ProtectedRoute>{<Dashboard />}</ProtectedRoute>}
          />
          <Route
            path="/projects"
            element={<ProtectedRoute>{<Projects />}</ProtectedRoute>}
          />
          <Route
            path="/tasks"
            element={<ProtectedRoute>{<Tasks />}</ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to={token ? '/' : '/login'} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
