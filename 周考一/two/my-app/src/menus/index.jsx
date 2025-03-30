import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "/layouts/warsehouse",
    label: "基础档案",
    icon: <MailOutlined />,
  }
];

const App = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    // navigate(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 140,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
export default App;
