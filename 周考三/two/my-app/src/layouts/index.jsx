import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MenuPage from '../components/Menu/index.jsx'

const { Sider, Content } = Layout;

const contentStyle = {};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
const layoutStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  overflow: 'hidden',
};

export default function Layouts() {
  return (
    <Layout style={layoutStyle}>
      <Layout>
        <Sider width="180px" style={siderStyle}>
          <MenuPage/>
        </Sider>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
