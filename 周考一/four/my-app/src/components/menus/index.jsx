import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '@/components/menus/index.module.sass'

export default function Menus() {
  const navigate = useNavigate();
  const [projectList,setProjectList] = useState([]);

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
      children:projectList
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

  const getProjectList = async () => {
    try {
      let response = await axios.get('/api/project/List')
      const { data } = response.data
      const items = data.ProjectData.map(project=>({
        key:project._id,
        label:project.projectName
      }))
      setProjectList(items);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getProjectList()
  },[])
  
  const onClick = (e) => {
    if(e.key === 'sub3'){
      return;
    }
    if(e.item.children){
      return
    }
    let path = e.key;
    if(items[2].children.some(item => item.key === e.key)){
      path = `/layouts/detail/${e.key}`;
    }
    navigate(path)
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 180,
        backgroundColor: '#eee',
      }}
      defaultSelectedKeys={['sub3']}
      defaultOpenKeys={['sub3']}
      mode="inline"
      items={items}
    />
  );
}
