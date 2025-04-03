import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './KanbanBoard.css';

const KanbanBoard = ({ tasksByStatus, onTaskClick, handleDelete, handleStatusChange }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    if (!destination) return;

    handleStatusChange(
      result.draggableId,
      destination.droppableId.split('-')[1]
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {Object.entries(tasksByStatus).map(([status, tasks], columnIndex) => (
          <Droppable key={status} droppableId={`column-${columnIndex}-${status}`}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="kanban-column"
                data-status={status}
              >
                <div className="kanban-column-header">{status}</div>
                <div className="kanban-tasks">
                  {tasks.map((task, taskIndex) => (
                    <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`kanban-task ${task.groupId ? 'group' : 'personal'}`}
                          onClick={() => onTaskClick(task)}
                        >
                          <span className={`task-badge ${task.groupId ? 'group' : 'personal'}`}>
                            {task.groupId ? 'Grupo' : 'Personal'}
                          </span>
                          <h4 className="task-title">{task.nameTask}</h4>
                          {task.description && <p className="task-description">{task.description}</p>}
                          {task.deadline && (
                            <div className="task-deadline">
                              📅 {new Date(task.deadline).toLocaleDateString()}
                            </div>
                          )}
                          <div className="task-actions">
                            <Button 
                              icon={<EditOutlined />} 
                              onClick={(e) => {
                                e.stopPropagation();
                                onTaskClick(task);
                              }}
                            />
                            <Button 
                              icon={<DeleteOutlined />} 
                              danger 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(task.id);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;