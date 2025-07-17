import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate, Link } from 'react-router-dom';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks/');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  const handleToggle = async (task) => {
    try {
      await api.put(`/tasks/${task.id}`, { ...task, status: !task.status });
      fetchTasks();
    } catch {
      setError('Failed to update task');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl mb-4">My Tasks</h2>
      <button onClick={() => navigate('/tasks/new')} className="mb-4 bg-green-500 text-white px-4 py-2 rounded">Add Task</button>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border p-4 mb-2 flex justify-between items-center">
            <div>
              <h3 className="font-bold">
                <Link to={`/tasks/${task.id}`} className="text-blue-600 hover:underline">
                  {task.title}
                </Link>
              </h3>
              <p>{task.description}</p>
              <p>Status: {task.status ? 'Completed' : 'Incomplete'}</p>
              <p>Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div>
              <button onClick={() => handleToggle(task)} className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded">
                Toggle Status
              </button>
              <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}