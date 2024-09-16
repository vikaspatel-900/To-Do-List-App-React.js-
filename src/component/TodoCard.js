// TodoCard.js
import React,{useState} from 'react';
import './TodoCard.css';

function TodoCard({ task, index, onEdit, onDelete, onStatusChange }) {

  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const styleBorder={
    borderTop:task.status==='pending' ? '6px solid red':task.status==='complete'?'6px solid green':'6px solid yellow',
    backdropFilter:task.status==='complete'?'blur(10px)':'0px'
  }


  const startdate=new Date(task.startDate).toLocaleDateString()
  const enddate=new Date(task.endDate).toLocaleDateString()
  

  // console.log(mydate.toLocaleDateString())

  






  return (
    <div className="todo-card" style={styleBorder}>
      <h3>{index+1}. {task.taskName}</h3>
      {/* <div className='description'><p>{task.description}</p></div> */}
      <p><strong>Start Date: </strong> {startdate}</p>
      <p><strong>Deadline: </strong> {enddate}</p>
      {/* <p><strong>Status:</strong> {task.status}</p> */}
      <div className="card-buttons">
        <div className='icon-div'>
          <i className="bi bi-pencil-square" onClick={() => onEdit(task)}></i>
          <i className="bi bi-trash3" onClick={() => onDelete(task.id)}></i>
        </div>
        {/* <button onClick={() => onEdit(task)}>Edit</button> */}
        {/* <button onClick={() => onDelete(task.id)}>Delete</button> */}
        <div className='status'>
          <label>Status:</label>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>

          <button onClick={toggleDescription} className='more-details' >
            {isDescriptionVisible ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>

      {isDescriptionVisible && (
        <div className="task-description">
          <p style={{fontWeight:'600'}}>Description :-</p>
          <p>{task.description}</p>
        </div>
      )}
    </div>
  );
}

export default TodoCard;
