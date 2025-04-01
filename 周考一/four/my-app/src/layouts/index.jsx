import React from 'react';
import { Flex, Layout } from 'antd';
import Menus from '@/components/menus';
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const headerStyle = {
  color: '#fff',
  backgroundColor: '#4096ff',
};
const contentStyle = {
  backgroundColor: 'white',
};
const siderStyle = {
  color: '#fff',
  backgroundColor: '#2e3036',
};

const layoutStyle = {
  width:'100%',
  height:'100vh',
  display:'flex',
  overflow:'hidden'
};
export default function Layouts() {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="180px" style={siderStyle}>
          <Menus/>
        </Sider>
        <Content style={contentStyle}>
            <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
