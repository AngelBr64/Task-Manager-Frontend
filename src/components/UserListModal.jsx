import React from 'react';
import { Modal, List, Checkbox, Button } from 'antd';

const UserListModal = ({ visible, onCancel, users, selectedUsers, handleUserSelect, handleAddUsers }) => {
  return (
    <Modal
      title="Agregar Miembros al Grupo"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="add" type="primary" onClick={handleAddUsers}>
          Actualizar
        </Button>,
      ]}
    >
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Checkbox
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleUserSelect(user.id)}
            >
              {user.username}
            </Checkbox>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default UserListModal;