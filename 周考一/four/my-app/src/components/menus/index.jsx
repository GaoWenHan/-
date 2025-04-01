import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Menus() {
  const navigate = useNavigate();
  const items = [
    {
      key: '/addProject',
      label: '创建项目',
      icon: <PlusOutlined />,
    },
    {
      key: '/layouts/workTable',
      label: '工作台',
      icon: <AppstoreOutlined />,
    },
    {
      key: 'sub3',
      label: '项目',
      icon: <SettingOutlined />,
    },
    {
      key: 'sub4',
      label: '统计分析',
      icon: <SettingOutlined />,
    },
    {
      key: 'sub5',
      label: '归档项目',
      icon: <SettingOutlined />,
    },
  ];
  
  const onClick = (e) => {
    navigate(e.key)
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 180,
        backgroundColor: '#2e3036',
        color: 'white',
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
}
