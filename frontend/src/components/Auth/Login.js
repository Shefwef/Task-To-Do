import React, { useState } from 'react';
import api from '../../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/login', new URLSearchParams(form), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      localStorage.setItem('token', res.data.access_token);
      onLogin && onLogin();
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="block w-full mb-2 p-2 border" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="block w-full mb-2 p-2 border" required />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}