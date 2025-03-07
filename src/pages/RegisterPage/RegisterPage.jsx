import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import AuthService from '../../services/authService'; // Importa el servicio
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Formato de email inválido');
      return;
    }

    try {
      await AuthService.register(email, username, password);
      alert("Usuario registrado con éxito");
      navigate('/login'); // Redirige al login tras registrar
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el servidor');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          style={{ marginBottom: '16px' }}
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
          style={{ marginBottom: '16px' }}
        />
        <Input.Password
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          style={{ marginBottom: '16px' }}
        />
        <Button type="primary" htmlType="submit" className="register-button" block>
          Registrarse
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
