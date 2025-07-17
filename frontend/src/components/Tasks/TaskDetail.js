import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', status: false, due_date: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
        setForm({
          title: res.data.title,
          description: res.data.description || '',
          status: res.data.status,
          due_date: res.data.due_date ? res.data.due_date.slice(0, 10) : '',
        });
      } catch {
        setError('Failed to fetch task');
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, {
        ...form,
        due_date: form.due_date ? new Date(form.due_date).toISOString() : null,
      });
      navigate('/tasks');
    } catch {
      setError('Failed to update task');
    }
  };

  if (!task) return <div className="text-center mt-8">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl mb-4">Edit Task</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="block w-full mb-2 p-2 border" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <label className="block mb-2">
        <input type="checkbox" name="status" checked={form.status} onChange={handleChange} />
        Completed
      </label>
      <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="block w-full mb-2 p-2 border" />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}