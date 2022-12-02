import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function MenuList() {
  const { Sider } = Layout;
  const { collapsed } = useSelector((store) => store.counter);
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);
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
  );
}

export default MenuList;
