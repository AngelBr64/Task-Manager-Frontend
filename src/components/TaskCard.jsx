import React from "react";
import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      title={task.nameTask}
      style={{ marginBottom: "20px", maxHeight: "300px" }}
      extra={
        <div style={{ display: "flex", gap: "5px" }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(task)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(task.id)}
          />
        </div>
      }
    >
      <p style={{ fontSize: "14px"}}><strong>Descripción:</strong> {task.description}</p>
      <p style={{ fontSize: "14px"}}><strong>Categoría:</strong> {task.category}</p>
      <p style={{ fontSize: "14px"}}><strong>Estado:</strong> {task.status}</p>
      <p style={{ fontSize: "14px"}}><strong>Vence el:</strong> {task.deadline}</p>
    </Card>
  );
};

export default TaskCard;
