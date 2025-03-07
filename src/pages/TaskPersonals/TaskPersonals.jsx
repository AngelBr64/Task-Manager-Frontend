import React, { useState, useEffect } from "react";
import { message } from "antd";
import AuthService from "../../services/authService";
import TaskCard from "../../components/TaskCard";
import FormTask from "../../components/FormTask";
import FloatingButton from "../../components/FloatButton";

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

  const handleFinishTask = async (values) => {
    const formattedValues = { ...values, userId, deadline: values.deadline?.toISOString() };
    
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
    <div>
      <h1>Bienvenido, {username}</h1>
      <p>Tus Tareas</p>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      ))}

      <FloatingButton onClick={handleAddTask} />

      <FormTask visible={isModalVisible} onClose={() => setIsModalVisible(false)} onFinish={handleFinishTask} initialValues={editingTask} />
    </div>
  );
};

export default TaskPersonals;
