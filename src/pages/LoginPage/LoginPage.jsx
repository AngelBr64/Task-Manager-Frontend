import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import AuthService from '../../services/authService';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('rol');
      console.log('Credenciales borradas al navegar al login estando autenticado');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email y contraseña son obligatorios');
      return;
    }

    try {
      const data = await AuthService.login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      localStorage.setItem('rol', data.rol);
      navigate('/dashboard');
    } catch (err) {
      // Manejo de errores específico basado en tu backend
      if (err.response) {
        switch (err.response.data.message) {
          case 'Usuario no encontrado':
            setError('El email no está registrado');
            break;
          case 'Contraseña incorrecta':
            setError('Contraseña incorrecta');
            break;
          case 'Email y contraseña son obligatorios':
            setError('Email y contraseña son obligatorios');
            break;
          default:
            setError('Error en el servidor');
        }
      } else {
        setError('No se pudo conectar con el servidor');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          style={{ marginBottom: '16px' }}
        />
        <br />
        <Input.Password
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          style={{ marginBottom: '16px' }}
        />
        <br />
        <Button type="primary" htmlType="submit" className="login-button" block>
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
