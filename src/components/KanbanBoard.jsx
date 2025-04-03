import React from 'react';
import { Card, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const KanbanBoard = ({ tasksByStatus, handleEdit, handleDelete, isAdmin }) => {
  const statusColumns = [
    { title: 'Pendiente', key: 'Pendiente', color: 'volcano' },
    { title: 'En progreso', key: 'En progreso', color: 'geekblue' },
    { title: 'Completada', key: 'Completada', color: 'green' },
  ];

  return (
    <div className="kanban-board">
      {statusColumns.map((column) => (
        <div key={column.key} className="kanban-column">
          <h3>
            <Tag color={column.color}>{column.title}</Tag>
            <span className="task-count">({tasksByStatus[column.key]?.length || 0})</span>
          </h3>
          <div className="kanban-cards">
            {tasksByStatus[column.key]?.map((task) => (
              <Card
                key={task.id}
                className="kanban-card"
                actions={isAdmin ? [
                  <EditOutlined 
                    key="edit" 
                    onClick={() => handleEdit(task)} 
                    className="edit-icon" 
                  />,
                  <DeleteOutlined 
                    key="delete" 
                    onClick={() => handleDelete(task.id)} 
                    className="delete-icon" 
                  />
                ] : []}
              >
                <div className="task-content">
                  <h4 className="task-title">{task.nameTask}</h4>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <Tag color="purple">{task.category}</Tag>
                    {task.deadline && (
                      <Tag color="orange">
                        📅 {new Date(task.deadline).toLocaleDateString()}
                      </Tag>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;