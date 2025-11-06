import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm'; 

// Define the API base URL
const API_URL = 'http://127.0.0.1:8000/api/tasks/';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // R: Read/Fetch Logic (Already Working)
  const fetchTasks = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data); 
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(`Failed to load tasks. Please check the Django server status.`); 
    } finally {
      setLoading(false); 
    }
  };

  // Create or Update Logic
  const handleTaskSubmit = async (taskData) => {
    if (taskData.id) {
      // UPDATE (PUT Request)
      try {
        // Send ALL task data for a PUT request
        const response = await axios.put(`${API_URL}${taskData.id}/`, taskData);
        // Update the task in the local state with the server's response
        setTasks(tasks.map(t => t.id === taskData.id ? response.data : t));
        setEditingTask(null); // Exit edit mode
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // CREATE (POST Request)
      try {
        // Send new task data (title, description)
        const response = await axios.post(API_URL, taskData);
        // Add the new task to the local state
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };
  
  // Toggle Completion Logic (PATCH Request)
  const handleToggle = async (id, newCompletedStatus) => {
    try {
      // Send a PATCH request with only the field to be changed
      const response = await axios.patch(`${API_URL}${id}/`, { completed: newCompletedStatus });
      
      // Update local state with the specific task object returned by the server
      setTasks(tasks.map(task => 
        task.id === id ? response.data : task
      ));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  // Delete Logic
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request (no data body needed)
      await axios.delete(`${API_URL}${id}/`);
      
      // Remove the task from the local state for immediate UI update
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  // Edit Mode Handlers
  const startEditing = (task) => {
    setEditingTask(task);
  };
  
  const cancelEditing = () => {
    setEditingTask(null);
  };

  //Lifecycle Hook
  useEffect(() => {
    fetchTasks();
  }, []);

  //Rendering for Loading and Error
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}><h2>⏳ Loading tasks...</h2></div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', border: '2px solid red', color: 'red' }}>
        <h2>❌ Error Fetching Data</h2>
        <p>{error}</p>
        <button onClick={fetchTasks} style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}>Try Again</button>
      </div>
    );
  }

  //Main Render
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Django REST Task Manager</h1>
      
      {/* 1. Task Form */}
      <TaskForm 
          onTaskSubmit={handleTaskSubmit} 
          editingTask={editingTask} 
          onCancelEdit={cancelEditing}
      />
      
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="task-list">
        {/* Render the list of TaskItem components */}
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onStartEdit={startEditing} 
          />
        ))}
        {tasks.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>You have no tasks!</p>}
      </div>
    </div>
  );
};

export default TaskList;
