import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/auth/register', { email, password });
      localStorage.setItem('projectpilot_token', response.data.token);
      localStorage.setItem('projectpilot_email', response.data.email);
      navigate('/');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-950/95 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="text-3xl font-semibold text-white">Register</h2>
      <p className="mt-2 text-slate-400">Create a new account and start managing your tasks.</p>
      {message && <div className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-200">{message}</div>}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-slate-300">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          />
        </label>
        <button className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
          Create account
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-400">
        Already a member? <Link to="/login" className="text-indigo-300 hover:text-indigo-200">Sign in</Link>
      </p>
    </div>
  );
}
