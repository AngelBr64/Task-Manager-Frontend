import React, { useState, useEffect } from "react";
import { message } from "antd";
import AuthService from "../../services/authService";
import FormTask from "../../components/FormTask";
import FloatingButton from "../../components/FloatButton";
import "./TaskPersonals.css";

const TaskPersonals = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const fetchTasks = async () => {
    try {
      const data = await AuthService.getTasksByUser(userId);
      setTasks(data);
    } catch (err) {
      message.error("Error al obtener las tareas");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const tasksByStatus = {
    Pendiente: tasks.filter(task => task.status === "Pendiente"),
    "En progreso": tasks.filter(task => task.status === "En progreso"),
    Completada: tasks.filter(task => task.status === "Completada")
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await AuthService.deleteTask(taskId);
      message.success("Tarea eliminada exitosamente");
      fetchTasks();
    } catch (err) {
      message.error("Error en el servidor");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await AuthService.updateTask(taskId, { status: newStatus });
      message.success("Estado actualizado");
      fetchTasks();
    } catch (err) {
      message.error("Error al actualizar el estado");
    }
  };

  const handleFinishTask = async (values) => {
    const formattedValues = { 
      ...values, 
      userId, 
      deadline: values.deadline?.toISOString(),
      status: values.status || "Pendiente"
    };
    
    try {
      if (editingTask) {
        await AuthService.updateTask(editingTask.id, formattedValues);
        message.success("Tarea actualizada exitosamente");
      } else {
        await AuthService.createTask(formattedValues);
        message.success("Tarea creada exitosamente");
      }
      setIsModalVisible(false);
      fetchTasks();
    } catch (err) {
      message.error("Error en el servidor");
    }
  };

  return (
    <div className="task-container">
      <h1>Bienvenido, {username}</h1>
      <p>Tus tareas personales</p>

      <div className="kanban-board">
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <div key={status} className="kanban-column" data-status={status}>
            <div className="kanban-column-header">{status}</div>
            <div className="kanban-tasks">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="kanban-task"
                  onClick={() => handleEditTask(task)}
                >
                  <span className="task-title">{task.nameTask}</span>
                  {task.description && <p className="task-description">{task.description}</p>}
                  {task.deadline && (
                    <div className="task-deadline">
                      📅 {new Date(task.deadline).toLocaleDateString()}
                    </div>
                  )}
                  <div className="task-actions">
                    <button 
                      className="status-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newStatus = 
                          status === "Pendiente" ? "En progreso" :
                          status === "En progreso" ? "Completada" : "Pendiente";
                        handleStatusChange(task.id, newStatus);
                      }}
                    >
                      Cambiar estado
                    </button>
                    <button 
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <FloatingButton onClick={handleAddTask} />

      <FormTask 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onFinish={handleFinishTask} 
        initialValues={editingTask} 
      />
    </div>
  );
};

export default TaskPersonals;