import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    key: 'sub1',
    label: '床位管理',
    icon: <MailOutlined />,
    children: [{ key: '/layout/floorPage', label: '楼层管理' }],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
  },
];

export default function MenuPage() {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      style={{ width: 180 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
}
