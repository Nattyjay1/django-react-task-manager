
import React from 'react';

const TaskItem = ({ task, onToggle, onDelete, onStartEdit }) => {
  const itemStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: task.completed ? '#f0fff0' : '#ffffff',
    borderRadius: '4px',
  };

  const textStyle = {
    flexGrow: 1,
    textDecoration: task.completed ? 'line-through' : 'none',
    marginRight: '20px',
  };

  const actionStyle = {
    display: 'flex',
    gap: '10px',
  };

  return (
    <div style={itemStyle}>
      <div style={textStyle}>
        <h4>{task.title}</h4>
        <p style={{ fontSize: '0.9em', color: '#555' }}>{task.description || 'No description'}</p>
      </div>

      <div style={actionStyle}>
        <button 
          onClick={() => onToggle(task.id, !task.completed)}
          style={{ backgroundColor: task.completed ? '#ffc107' : '#28a745', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px' }}
        >
          {task.completed ? 'Reopen' : 'Complete'}
        </button>
        
        <button 
          onClick={() => onStartEdit(task)}
          style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px' }}
        >
          Edit
        </button>
        
        <button 
          onClick={() => onDelete(task.id)}
          style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;