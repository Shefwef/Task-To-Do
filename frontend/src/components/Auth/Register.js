import React, { useState } from 'react';
import api from '../../api';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/register', form);
      alert('Registration successful! Please login.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl mb-4">Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="block w-full mb-2 p-2 border" required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="block w-full mb-2 p-2 border" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="block w-full mb-2 p-2 border" required />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}