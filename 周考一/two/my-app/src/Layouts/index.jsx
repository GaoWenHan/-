import React from "react";
import { Layout } from "antd";
import Menus from "../menus";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const headerStyle = {
  color: "#fff",
  height: 64,
};
const contentStyle = {
  minHeight: 120,
//   backgroundColor: "#ddd",
  padding:'0px 0px 0px 20px'
};
const siderStyle = {
  color: "#fff",
  backgroundColor: "#ddd",
};

const layoutStyle = {
  width: "100%",
  height:"100vh",
  display:"flex",
  overflow:"hidden",
};

export default function Layouts() {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="140px" style={siderStyle}>
          <Menus/>
        </Sider>
        <Content style={contentStyle}>
            <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
