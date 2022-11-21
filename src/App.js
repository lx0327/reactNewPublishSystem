import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useRoutes } from 'react-router-dom'
import './App.css'
import routesList from './router'
import { Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
const { Header, Sider, Content } = Layout
function App () {
  function WrapperRoutes () {
    let element = useRoutes(routesList)
    return element
  }
  const [menuList, setMenuList] = useState([])
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    async function getMenuList () {
      await axios.get('http://localhost:9000/rights?_embed=children').then((res) => {
        setMenuList(res.data)
      })
    }
    getMenuList()
  }, [])
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
                label: item.title
              }
            }
          })
        }
      } else {
        return {
          key: item.key,
          label: item.title,
        }
      }
    }


  })

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">全球新闻发布系统</div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={'/home'}
          onClick={(items) => { navigate(items.key) }}

        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <WrapperRoutes />

        </Content>
      </Layout>
    </Layout>
  )

}
export default App

