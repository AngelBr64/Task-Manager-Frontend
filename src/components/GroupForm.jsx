import React from 'react';
import { Form, Input, Button } from 'antd';

const GroupForm = ({ form, onFinish }) => {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Nombre del Grupo"
        name="name"
        rules={[{ required: true, message: 'Por favor ingresa un nombre para el grupo' }]}
      >
        <Input placeholder="Nombre del grupo" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Crear</Button>
      </Form.Item>
    </Form>
  );
};

export default GroupForm;