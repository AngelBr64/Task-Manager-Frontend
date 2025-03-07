import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
    navigate('/login');
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <h2>Tareas</h2>
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/dashboard">Grupos</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/tasks">Tareas</Link>
          </Menu.Item>
          {rol === 'admin' && (
            <Menu.Item key="3">
              <Link to="/users">Usuarios</Link>
            </Menu.Item>
          )}
          <Menu.Item key="4" onClick={handleLogout} style={{ color: 'red' }}>
            Cerrar Sesión
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
