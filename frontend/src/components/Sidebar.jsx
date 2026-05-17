import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from '../auth';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/projects', label: 'Projects' },
  { to: '/tasks', label: 'Tasks' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 overflow-y-auto bg-slate-950 border-r border-slate-800 px-6 py-8 text-slate-100 z-50">
      <div className="mb-10">
        <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500">ProjectPilot AI</div>
        <h1 className="text-2xl font-semibold text-white">Project Control</h1>
        <p className="mt-3 text-sm text-slate-400">A modern workspace for tasks and goals.</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-900/70'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-10 w-full rounded-xl bg-slate-800 px-4 py-3 text-left text-sm font-semibold text-slate-100 hover:bg-slate-700"
      >
        Logout
      </button>
    </aside>
  );
}
