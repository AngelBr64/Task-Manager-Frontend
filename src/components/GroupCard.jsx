import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
  return (
    <Card
      title={group.name}
      style={{ width: '100%', marginBottom: '16px' }}
      actions={[
        <Link to={`/groups/${group.id}`}>
          <Button type="primary">Ver Detalles</Button>
        </Link>,
      ]}
    >
      <p><strong>Creado por:</strong> {group.createdBy}</p>
      <p><strong>Miembros:</strong> {group.members.length}</p>
      <p><strong>Tareas:</strong> {group.tasks.length}</p>
    </Card>
  );
};

export default GroupCard;