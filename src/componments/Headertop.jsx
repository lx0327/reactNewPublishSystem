import React from 'react';
import { Avatar, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import { changeCollapsed } from '../store/module/conterSlice';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
function Headertop() {
  const { user, collapsed } = useSelector((store) => store.counter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => dispatch(changeCollapsed()),
      })}
      <Popover
        placement="bottom"
        content={() => (
          <div>
            <p>{user.role.roleName}</p>
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
          欢迎{user.username}回来
          <Avatar size="large" icon={<UserOutlined />} />
        </div>
      </Popover>
    </div>
  );
}

export default Headertop;
