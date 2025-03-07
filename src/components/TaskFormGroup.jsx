import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import moment from 'moment';

const TaskFormGroup = ({ form, onFinish, editingTask, groups }) => {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Nombre de la Tarea"
        name="nameTask"
        rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
      >
        <Input placeholder="Nombre de la tarea" />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
        rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}
      >
        <Input.TextArea placeholder="Descripción de la tarea" rows={4} />
      </Form.Item>

      <Form.Item
        label="Categoría"
        name="category"
        rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
      >
        <Select placeholder="Selecciona una categoría">
          <Select.Option value="Personal">Personal</Select.Option>
          <Select.Option value="Trabajo">Trabajo</Select.Option>
          <Select.Option value="Escuela">Escuela</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Fecha de Vencimiento"
        name="deadline"
        rules={[{ required: true, message: 'Por favor selecciona una fecha' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Estado"
        name="status"
        rules={[{ required: true, message: 'Por favor selecciona un estado' }]}
      >
        <Select placeholder="Selecciona un estado">
          <Select.Option value="Pendiente">Pendiente</Select.Option>
          <Select.Option value="En progreso">En progreso</Select.Option>
          <Select.Option value="Completada">Completada</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Grupo"
        name="group"
        rules={[{ required: true, message: 'Por favor selecciona un grupo' }]}
      >
        <Select placeholder="Selecciona un grupo" loading={groups.length === 0}>
          {groups.map(group => (
            <Select.Option key={group.id} value={group.id}>
              {group.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingTask ? 'Actualizar' : 'Guardar'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskFormGroup;