import { Table, Switch, Space, Button, Form, Input, Select, Modal } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
function UserList() {
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      render: (record) => {
        return record === '' ? '全球' : record
      },
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      key: 'roleId',
      render: (role) => {
        return role.roleName
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户状态',
      dataIndex: '',
      key: 'roleState',
      render: (record) => {
        return (
          <Switch
            checked={record.roleState}
            onChange={() => changeRoleState(record)}
          />
        )
      },
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: () => {
        return (
          <Space size="middle">
            <EditTwoTone style={{ fontSize: '16px', cursor: 'pointer' }} />
            <DeleteTwoTone
              twoToneColor="red"
              style={{ fontSize: '16px', cursor: 'pointer' }}
            />
          </Space>
        )
      },
    },
  ]
  const [userInfo, setUserInfp] = useState({
    username: '',
    password: '',
    roleState: true,
    default: false,
    region: '',
    roleId: '',
  })
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [regionList, setregionList] = useState([])
  const [rolenList, setroleList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [status, setStatus] = useState(true)
  const changeRoleState = (item) => {
    data.map((status) => {
      if (item.id === status.id) {
        status.roleState = !status.roleState
        axios.patch(`http://localhost:9000/users/${item.id}`, {
          roleState: status.roleState,
        })
      }
    })
    setData([...data])
  }
  const addUser = () => {
    axios.get('http://localhost:9000/regions').then((res) => {
      setregionList(res.data)
    })
    axios.get('http://localhost:9000/roles').then((res) => {
      setroleList(res.data)
    })
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      axios
        .post('http://localhost:9000/users', {
          ...values,
          default: false,
          roleState: true,
        })
        .then((res) => {
          console.log(res)
          setIsModalOpen(false)
        })
      console.log(values)
    })
  }
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }
  useEffect(() => {
    axios.get('http://localhost:9000/users?_expand=role').then((res) => {
      setData(res.data)
      console.log(res)
    })
  }, [])
  return (
    <div className="UserList">
      <Button type="primary" onClick={addUser}>
        添加用户
      </Button>
      <Modal
        title="新增用户"
        okText="确认"
        cancelText="取消"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '用户名不能为空!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '密码不能为空!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="区域"
            name="region"
            rules={[
              {
                required: true,
                message: '区域不能为空!',
              },
            ]}>
            <Select>
              {regionList.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {item.value}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleId"
            rules={[
              {
                required: true,
                message: '角色不能为空!',
              },
            ]}>
            <Select>
              {rolenList.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.roleType}>
                    {item.roleName}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}
export default UserList
