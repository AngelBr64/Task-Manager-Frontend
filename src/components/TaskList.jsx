import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks = [], isOwner, handleEdit, handleDelete, handleStatusChange }) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            isOwner={isOwner} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            handleStatusChange={handleStatusChange}
          />
        ))
      ) : (
        <p>No hay tareas disponibles.</p>
      )}
    </div>
  );
};

export default TaskList;
