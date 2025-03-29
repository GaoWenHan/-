import React, { useState } from "react";
import { TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import styles from "./index.module.css";
import { Outlet,useNavigate } from "react-router-dom";

export default function Layouts() {
  const tabs = [
    {
      key: "/layouts/home",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/layouts/cate",
      title: "待办",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/layouts/cart",
      title: "消息",
      icon: <MessageOutline />,
    },
    {
      key: "/layouts/my",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  const navigate = useNavigate();
  const handleClickPage = (key) => {
    navigate(key);
  }
  return (
    <div className={styles.LayoutsBox}>
      <Outlet />
      <div className={styles.TabBarBox}>
        <TabBar>
          {tabs.map((item) => (
            <TabBar.Item 
                key={item.key} 
                icon={item.icon} 
                title={item.title}
                onClick={()=>handleClickPage(item.key)}
            />
          ))}
        </TabBar>
      </div>
    </div>
  );
}
