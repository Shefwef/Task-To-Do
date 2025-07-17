import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import TaskDetail from './components/Tasks/TaskDetail';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskDetail />
            </PrivateRoute>
          }
        />
        {/* Default route: redirect to /tasks if logged in, else to /login */}
        <Route
          path="/"
          element={
            localStorage.getItem('token') ? <Navigate to="/tasks" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;