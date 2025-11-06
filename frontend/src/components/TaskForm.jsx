// frontend/src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';

const TaskForm = ({ onTaskSubmit, editingTask, onCancelEdit }) => {
  // 1. Local State Initialization
  // Initialize state based on whether 'editingTask' is provided
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 2. useEffect for Edit Mode Initialization
  // This hook runs whenever 'editingTask' changes (i.e., when 'Edit' is clicked or canceled)
  useEffect(() => {
    if (editingTask) {
      // Load existing task data into the form fields
      setTitle(editingTask.title);
      setDescription(editingTask.description || ''); // Use empty string if description is null
    } else {
      // Clear the form fields for Create mode
      setTitle('');
      setDescription('');
    }
  }, [editingTask]); // Dependency array ensures it runs when editingTask prop changes

  // 3. Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Basic validation: title is required

    // Prepare data object to send back to the parent component (TaskList)
    const taskData = {
      title,
      description,
      // If in edit mode, include the ID and the current completion status
      ...(editingTask 
          ? { id: editingTask.id, completed: editingTask.completed } 
          : { completed: false } // Default to false for new tasks
      )
    };
    
    // Call the CRUD handler function passed from TaskList
    onTaskSubmit(taskData);
    
    // Reset form and exit edit mode locally
    setTitle('');
    setDescription('');
    if (editingTask) {
        onCancelEdit();
    }
  };

  const formStyle = { 
    border: `2px solid ${editingTask ? '#ffc107' : '#007bff'}`, 
    padding: '25px', 
    marginBottom: '30px', 
    borderRadius: '5px' 
  };
  
  const buttonStyle = { padding: '10px 20px', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' };
  
  return (
    <div style={formStyle}>
      <h2>{editingTask ? '📝 Edit Task' : '➕ Add New Task'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Task Title (Required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '10px', border: '1px solid #000000ff', borderRadius: '4px' }}
        />
        <textarea
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '10px', border: '1px solid #000000ff', borderRadius: '4px' }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
            <button 
                type="submit" 
                style={{ 
                    ...buttonStyle, 
                    backgroundColor: editingTask ? '#ffc107' : '#007bff',
                }}
            >
                {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
            
            {editingTask && (
                <button 
                    type="button" 
                    onClick={onCancelEdit}
                    style={{ 
                        ...buttonStyle, 
                        backgroundColor: '#6c757d', 
                    }}
                >
                    Cancel Edit
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;