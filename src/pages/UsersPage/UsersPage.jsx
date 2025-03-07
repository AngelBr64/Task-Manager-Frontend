// UsersPage.jsx
import { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'antd';
import AuthService from '../../services/authService';
import FormUsers from '../../components/FormUsers';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const data = await AuthService.getUsers(userId);
        setUsers(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleSave = async (updatedUser) => {
    try {
      // Lógica para actualizar el usuario en el backend
      await AuthService.updateUser(selectedUser.id, updatedUser);
      setIsEditing(false);
      setSelectedUser(null);
      // Recargamos los usuarios
      const userId = localStorage.getItem('userId');
      const data = await AuthService.getUsers(userId);
      setUsers(data);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      render: (rol) => <span>{rol}</span>, // Renderiza el rol tal como está
    },
    {
      title: 'Acciones',
      render: (_, user) => (
        <Button type="primary" onClick={() => handleEdit(user)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />

      {/* Modal para editar un usuario */}
      <Modal
        title="Editar Usuario"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null} // No utilizamos botones predeterminados del modal
      >
        {selectedUser && (
          <FormUsers user={selectedUser} onClose={() => setIsEditing(false)} onSave={handleSave} />
        )}
      </Modal>
    </div>
  );
};

export default UsersPage;
