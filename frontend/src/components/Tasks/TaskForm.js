import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function TaskForm() {
  const [form, setForm] = useState({ title: '', description: '', status: false, due_date: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/tasks/', {
        ...form,
        due_date: form.due_date ? new Date(form.due_date).toISOString() : null,
      });
      navigate('/tasks');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl mb-4">Create Task</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="block w-full mb-2 p-2 border" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <label className="block mb-2">
        <input type="checkbox" name="status" checked={form.status} onChange={handleChange} />
        Completed
      </label>
      <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="block w-full mb-2 p-2 border" />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
}