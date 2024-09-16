// TodoForm.js
import React, { useState, useEffect } from 'react';
import './TodoForm.css';

function TodoForm({ task, onSave, onClose }) {
  const [taskName, setTaskName] = useState(task ? task.taskName : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [startDate, setStartDate] = useState(task ? task.startDate : '');
  const [endDate, setEndDate] = useState(task ? task.endDate : '');
  const [status, setStatus] = useState(task ? task.status : 'pending');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setDescription(task.description);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
      setStatus(task.status);
    }
  }, [task]);

  const validate = () => {
    const newErrors = {};
    if (!taskName) newErrors.taskName = 'Task name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (new Date(startDate) > new Date(endDate)) newErrors.endDate = 'End date must be after start date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newTask = {
        taskName,
        description,
        startDate,
        endDate,
        status,
        id: task ? task.id : Date.now()
      };
      // Save task to local storage
      saveTaskToLocalStorage(newTask);
      onSave(newTask);
    }
  };

  const saveTaskToLocalStorage = (task) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (task.id) {
      tasks = tasks.map(t => t.id === task.id ? task : t);
    } else {
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return (

    <div className="todo-form">
      <div className="form-header">
        <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder='Task Name'
          />
          {errors.taskName && <p className="error">{errors.taskName}</p>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Write here'
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
          />
          {errors.startDate && <p className="error">{errors.startDate}</p>}
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate} // Prevent dates before the start date
          />
          {errors.endDate && <p className="error">{errors.endDate}</p>}
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
