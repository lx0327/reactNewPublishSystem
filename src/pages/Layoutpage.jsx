import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Headertop from '../componments/Headertop';
import MenuList from '../componments/MenuList';
const { Header, Content } = Layout;
function Layoutpage() {
  return (
    <Layout>
      <MenuList />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Headertop />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
export default Layoutpage;
