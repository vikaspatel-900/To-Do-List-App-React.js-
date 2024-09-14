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

  return (
    <>

      <div className="navbar">
        <h3>Todo List</h3>
        <input type="search" placeholder="search here" />
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
            <li><i class="bi bi-house-fill"></i><a href="/#">Home</a></li>

            <li><i class="bi bi-hourglass-split"></i><a href="/#">Progress</a></li>
            <li><i class="bi bi-hourglass-top"></i><a href="/#">Pending</a></li>
            <li><i class="bi bi-hourglass-bottom"></i><a href="/#">Complete</a></li>
            <li><i class="bi bi-gear-fill"></i><a href="/#">Settings</a></li>
            <li>
              <i class="bi bi-person-circle"></i>
              <a href="/#">Profile</a>
            </li>
          </div>

        </div>

        <div className="task-cards">

          {tasks.map((task, index) => (
            <TodoCard
              key={task.id}
              index={index}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Todolist;
