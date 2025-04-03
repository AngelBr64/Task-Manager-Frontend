import React, { useState, useEffect } from 'react';
import { FloatButton, Modal, Button, Select, message, Form, Tag, Empty, Typography } from 'antd';
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import moment from 'moment';
import AuthService from '../../services/authService';
import TaskForm from '../../components/TaskFormGroup';
import GroupForm from '../../components/GroupForm';
import UserListModal from '../../components/UserListModal';
import KanbanBoard from '../../components/KanbanBoard';
import './DashboardPage.css';

const { Text } = Typography;

const DashboardPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('rol') || 'user';
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [groupForm] = Form.useForm();
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  // Permisos
  const isAdmin = userRole === 'admin';
  const isOwnerOfSelectedGroup = selectedGroup 
    ? groups.some(group => group.id === selectedGroup && group.ownerId === userId)
    : false;
  const canModifyGroup = isAdmin || isOwnerOfSelectedGroup;

  const fetchTasks = async () => {
    if (!selectedGroup) return;
    try {
      const data = await AuthService.getTasksByGroup(selectedGroup);
      setTasks(data);
    } catch (err) {
      message.error('Error al obtener las tareas del grupo');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedGroup]);

  const fetchGroups = async () => {
    try {
      const data = await AuthService.getGroupsByUser(userId);
      setGroups(data);
    } catch (err) {
      message.error('Error al obtener los grupos');
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);

  const handleCreateGroup = async (values) => {
    try {
      await AuthService.createGroup({ ...values, ownerId: userId });
      message.success('Grupo creado exitosamente');
      setIsGroupModalVisible(false);
      groupForm.resetFields();
      fetchGroups();
    } catch (err) {
      message.error('Error al crear el grupo');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await AuthService.getUsers(userId);
      setUsers(data);
    } catch (err) {
      message.error('Error al obtener la lista de usuarios');
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleAddUsers = async () => {
    if (!selectedGroup) {
      message.error('No se ha seleccionado un grupo');
      return;
    }

    try {
      const currentGroup = groups.find((group) => group.id === selectedGroup);
      const currentMembers = currentGroup.members || [];

      const usersToAdd = selectedUsers.filter((userId) => !currentMembers.includes(userId));
      const usersToRemove = currentMembers.filter((userId) => !selectedUsers.includes(userId));

      await Promise.all([
        ...usersToAdd.map(async (userId) => {
          await AuthService.addMemberToGroup(selectedGroup, userId);
        }),
        ...usersToRemove.map(async (userId) => {
          await AuthService.removeMemberFromGroup(selectedGroup, userId);
        })
      ]);

      message.success('Miembros del grupo actualizados');
      setIsUserModalVisible(false);
      fetchGroups();
    } catch (err) {
      message.error('Error al actualizar los miembros del grupo');
    }
  };

  const handleDelete = async (taskId) => {
    if (!isAdmin) {
      message.warning('Solo administradores pueden eliminar tareas');
      return;
    }
    try {
      await AuthService.deleteTask(taskId);
      message.success('Tarea eliminada exitosamente');
      fetchTasks();
    } catch (err) {
      message.error('Error en el servidor');
    }
  };

  const handleClick = () => {
    if (!canModifyGroup) {
      message.warning('Solo administradores o dueños del grupo pueden crear tareas');
      return;
    }
    setEditingTask(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      if (editingTask) {
        await AuthService.updateTask(editingTask.id, { ...values, userId });
        message.success('Tarea actualizada exitosamente');
      } else {
        await AuthService.createTask({ ...values, userId, group: selectedGroup });
        message.success('Tarea creada exitosamente');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchTasks();
    } catch (err) {
      message.error('Error en el servidor');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
    form.resetFields();
  };

  const handleEdit = (task) => {
    if (!isAdmin) {
      message.warning('Solo administradores pueden editar tareas');
      return;
    }
    setEditingTask(task);
    form.setFieldsValue({
      nameTask: task.nameTask,
      description: task.description,
      category: task.category,
      deadline: task.deadline ? moment(task.deadline) : null,
      status: task.status,
    });
    setIsModalVisible(true);
  };

  const tasksByStatus = {
    Pendiente: tasks.filter((task) => task.status === 'Pendiente'),
    'En progreso': tasks.filter((task) => task.status === 'En progreso'),
    Completada: tasks.filter((task) => task.status === 'Completada'),
  };

  const handleOpenUserModal = () => {
    const currentGroup = groups.find((group) => group.id === selectedGroup);
    setSelectedUsers(currentGroup?.members || []);
    fetchUsers();
    setIsUserModalVisible(true);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Hola, {username} {isAdmin && <Tag color="gold">Admin</Tag>}</h1>
        <p>Gestiona tus tareas de grupo</p>
      </div>

      <div className="group-controls">
        {groups.length > 0 ? (
          <>
            <Select
              placeholder="Selecciona un grupo"
              style={{ width: '100%', marginBottom: '16px' }}
              onChange={setSelectedGroup}
              value={selectedGroup}
              allowClear
            >
              {groups.map((group) => (
                <Select.Option key={group.id} value={group.id}>
                  {group.name} 
                  {group.ownerId === userId && <Tag color="blue">Dueño</Tag>}
                </Select.Option>
              ))}
            </Select>

            <div className="group-actions">
              {isAdmin && (
                <Button 
                  type="primary" 
                  onClick={() => setIsGroupModalVisible(true)}
                  style={{ marginRight: 8 }}
                >
                  Crear Grupo
                </Button>
              )}
              
              {selectedGroup && canModifyGroup && (
                <Button
                  icon={<UserAddOutlined />}
                  onClick={handleOpenUserModal}
                >
                  Gestionar Miembros
                </Button>
              )}
            </div>
          </>
        ) : (
          <Empty
            description={
              <>
                <Text>No tienes ningún grupo asignado aún</Text>
                {isAdmin && (
                  <Button 
                    type="primary" 
                    onClick={() => setIsGroupModalVisible(true)}
                    style={{ marginTop: 16 }}
                  >
                    Crear tu primer grupo
                  </Button>
                )}
              </>
            }
          />
        )}
      </div>

      {selectedGroup && (
        <>
          <KanbanBoard
            tasksByStatus={tasksByStatus}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isAdmin={isAdmin} // Pasamos esta prop al KanbanBoard
          />

          {canModifyGroup && (
            <FloatButton
              icon={<PlusOutlined />}
              type="primary"
              onClick={handleClick}
              tooltip="Crear tarea"
              style={{ right: 24, bottom: 24 }}
            />
          )}
        </>
      )}

      <Modal
        title={editingTask ? 'Editar Tarea' : 'Agregar Nueva Tarea'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <TaskForm 
          form={form} 
          onFinish={onFinish} 
          editingTask={editingTask} 
          selectedGroup={selectedGroup}
        />
      </Modal>

      <Modal
        title="Crear Grupo"
        visible={isGroupModalVisible}
        onCancel={() => setIsGroupModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <GroupForm form={groupForm} onFinish={handleCreateGroup} />
      </Modal>

      <UserListModal
        visible={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        users={users}
        selectedUsers={selectedUsers}
        handleUserSelect={handleUserSelect}
        handleAddUsers={handleAddUsers}
      />
    </div>
  );
};

export default DashboardPage;