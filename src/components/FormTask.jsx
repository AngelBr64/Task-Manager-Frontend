import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const FormTask = ({ visible, onClose, onFinish, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        deadline: initialValues.deadline ? dayjs(initialValues.deadline) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, visible]);

  return (
    <Modal title={initialValues ? "Editar Tarea" : "Agregar Tarea"} open={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Nombre" name="nameTask" rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Descripción" name="description" rules={[{ required: true, message: "Ingrese una descripción" }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Categoría" name="category" rules={[{ required: true, message: "Seleccione una categoría" }]}>
          <Select>
            <Select.Option value="Escuela">Escuela</Select.Option>
            <Select.Option value="Personal">Personal</Select.Option>
            <Select.Option value="Trabajo">Trabajo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Fecha de vencimiento" name="deadline" rules={[{ required: true, message: "Seleccione una fecha" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Estado" name="status" rules={[{ required: true, message: "Seleccione un estado" }]}>
          <Select>
            <Select.Option value="Pendiente">Pendiente</Select.Option>
            <Select.Option value="En progreso">En progreso</Select.Option>
            <Select.Option value="Completada">Completada</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Actualizar" : "Guardar"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormTask;
