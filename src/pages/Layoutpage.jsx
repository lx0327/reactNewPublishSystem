import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, Popover } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
function Layoutpage() {
  const [menuList, setMenuList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getMenuList() {
      await axios
        .get('http://localhost:9000/rights?_embed=children')
        .then((res) => {
          setMenuList(res.data);
        });
    }
    getMenuList();
  }, []);
  const items = menuList.map((item) => {
    if (item.pagepermisson === 1) {
      if (item.children?.length > 0) {
        return {
          key: item.key,
          label: item.title,
          children: item.children.map((item) => {
            if (item.pagepermisson) {
              return {
                key: item.key,
                label: item.title,
              };
            } else {
              return 0;
            }
          }),
        };
      } else {
        return {
          key: item.key,
          label: item.title,
        };
      }
    }
    return 0;
  });

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">全球新闻发布系统</div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={'/'}
          onClick={(items) => {
            navigate(items.key);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Popover
            placement="bottom"
            content={() => (
              <div>
                <p>超级管理员</p>
                <p
                  onClick={() => {
                    navigate('/login');
                    localStorage.removeItem('token');
                  }}
                  style={{ color: 'red' }}>
                  退出
                </p>
              </div>
            )}
            trigger="click">
            <div style={{ float: 'right', marginRight: '20px' }}>
              欢迎admin回来
              <Avatar size="large" icon={<UserOutlined />} />
            </div>
          </Popover>
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
