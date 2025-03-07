// FormUsers.jsx
import { Form, Input, Select, Button } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

const FormUsers = ({ user, onClose, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Si el usuario cambia, llenamos el formulario con los valores del usuario
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      rol: user.rol,
    });
  }, [user, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values); // Llamamos la función onSave para guardar los cambios
        onClose(); // Cerramos el modal
      })
      .catch((error) => {
        console.log('Error en el formulario:', error);
      });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Por favor ingresa el nombre de usuario' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor ingresa el correo electrónico' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Rol" name="rol" rules={[{ required: true, message: 'Por favor selecciona el rol' }]}>
        <Select>
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormUsers;
