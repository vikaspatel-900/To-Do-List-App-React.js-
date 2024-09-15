// TodoList.js
import React, { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import "./TodoList.css";
import logo from '../images/logo.png'

function Todolist() {

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const handleSave = (task) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks
        .filter((t) => t.id !== task.id)
        .concat(task);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleStatusChange = (id, status) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((t) =>
        t.id === id ? { ...t, status } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };



  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };


  const filteredTasks = tasks
    .filter(task => task.taskName.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(task => {
      if (filter === 'all') return true; // Show all tasks
      return task.status === filter; // Show tasks matching the filter (pending, inprogress, complete)
    });


  return (
    <>

      <div className="navbar">
       <img src={logo} alt="" />
        <input type="search" value={searchQuery} onChange={handleSearchChange}  placeholder="Search tasks by title" />
        <button className="add-task-btn" onClick={() => { setEditingTask(null); setShowForm(true); }}> Add Task </button>
      </div>
      <div className="todo-list">


        {showForm && (
          <div className="form-upper">
            <TodoForm
              task={editingTask}
              onSave={handleSave}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="side-bar">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="side-bar-link">
            <li><i class="bi bi-house-fill"></i><a href="/#" onClick={() => handleFilterChange('all')}>Home</a></li>
            <li><i class="bi bi-hourglass-top"></i><a href="/#" onClick={() => handleFilterChange('pending')}>Pending</a></li>
            <li><i class="bi bi-hourglass-split"></i><a href="/#" onClick={() => handleFilterChange('in progress')}>Progress</a></li>
            <li><i class="bi bi-hourglass-bottom"></i><a href="/#" onClick={() => handleFilterChange('complete')}>Complete</a></li>
            <li><i class="bi bi-gear-fill"></i><a href="/#">Settings</a></li>
            <li>
              <i class="bi bi-person-circle"></i>
              <a href="/#">Profile</a>
            </li>
          </div>

        </div>

        <div className="task-cards">

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TodoCard
              key={task.id}
              index={index}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <p>No tasks found for the current filter.</p>
        )}

          



        </div>
      </div>
    </>
  );
}

export default Todolist;
