import React from 'react';
import { Card, Select, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const KanbanBoard = ({ tasksByStatus, isOwner, handleEdit, handleDelete, handleStatusChange }) => {
  return (
    <div className="kanban-board">
      {Object.entries(tasksByStatus).map(([status, tasks]) => (
        <Card key={status} title={status} className="kanban-column">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="kanban-task"
              actions={isOwner ? [
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(task)}
                />,
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(task.id)}
                />,
              ] : []}
            >
              <div className="task-content">
                <div className="task-title">{task.nameTask}</div>
                <div className="task-description">{task.description}</div>
                <div className="task-deadline">
                  <strong>Fecha límite:</strong>{' '}
                  {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Sin fecha'}
                </div>
                <div className="task-status">
                  <Select
                    defaultValue={task.status}
                    style={{ width: '100%', marginTop: '8px' }}
                    onChange={(value) => handleStatusChange(task.id, value)}
                  >
                    <Select.Option value="Pendiente">Pendiente</Select.Option>
                    <Select.Option value="En progreso">En progreso</Select.Option>
                    <Select.Option value="Completada">Completada</Select.Option>
                  </Select>
                </div>
              </div>
            </Card>
          ))}
        </Card>
      ))}
    </div>
  );
};

export default KanbanBoard;