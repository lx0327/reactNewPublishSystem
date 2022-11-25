import {
  Table,
  Switch,
  Space,
  Button,
  Form,
  Input,
  Select,
  Modal,
  message,
} from 'antd'
import axios from 'axios'
import { getUserList } from '../server/request'
import { useEffect, useState } from 'react'
import {
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
function UserList() {
  const [messageApi, contextHolder] = message.useMessage()
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
      dataIndex: 'roleState',
      key: 'roleState',
      render: (record, item) => {
        return (
          <Switch checked={record} onChange={() => changeRoleState(item)} />
        )
      },
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) => {
        return (
          <Space size="middle">
            <EditTwoTone
              style={{ fontSize: '16px', cursor: 'pointer' }}
              onClick={() => updateUser(item)}
            />
            <DeleteTwoTone
              onClick={() => deleteRole(item)}
              twoToneColor="red"
              style={{ fontSize: '16px', cursor: 'pointer' }}
            />
          </Space>
        )
      },
    },
  ]
  const [isAddUser, setisAddUser] = useState('')
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [regionList, setregionList] = useState([])
  const [rolenList, setroleList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentId, setcurrentId] = useState('')
  const [isdisabled, setisdisabled] = useState(false)
  const changeRoleState = (item) => {
    item.roleState = !item.roleState
    axios.patch(`http://localhost:9000/users/${item.id}`, {
      roleState: item.roleState,
    })

    setData([...data])
  }
  useEffect(() => {
    axios.get('http://localhost:9000/regions').then((res) => {
      setregionList(res.data)
    })
    axios.get('http://localhost:9000/roles').then((res) => {
      setroleList(res.data)
    })
  }, [])
  const addUser = () => {
    setisAddUser(true)
    setIsModalOpen(true)
  }
  const updateUser = (item) => {
    if (item.region === '') {
      setisdisabled(true)
    }
    setisAddUser(false)
    setIsModalOpen(true)
    form.setFieldsValue(item)
    setcurrentId(item.id)
  }
  const deleteRole = (item) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '确认要删除吗',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        axios.delete(`http://localhost:9000/users/${item.id}`).then((res) => {
          getTableUserList()
          messageApi.open({
            type: 'success',
            content: '删除成功',
          })
          console.log(res)
        })
      },
    })
  }
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (isAddUser) {
        axios
          .post('http://localhost:9000/users', {
            ...values,
            default: false,
            roleState: true,
          })
          .then((res) => {
            getTableUserList()
            setIsModalOpen(false)
            form.resetFields()
            setisdisabled(false)
          })
      } else {
        axios
          .patch(`http://localhost:9000/users/${currentId}`, {
            ...values,
          })
          .then((res) => {
            getTableUserList()
            setIsModalOpen(false)
            form.resetFields()
            setisdisabled(false)
          })
      }
    })
  }
  const handleCancel = () => {
    setisdisabled(false)
    form.resetFields()
    setIsModalOpen(false)
  }
  function getTableUserList() {
    getUserList().then((res) => {
      setData(res.data)
    })
  }
  useEffect(() => {
    getTableUserList()
  }, [])
  return (
    <div className="UserList">
      {contextHolder}
      <Button type="primary" onClick={addUser}>
        添加用户
      </Button>
      <Modal
        title={isAddUser ? '新增用户' : '编辑用户'}
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
                required: !isdisabled ? true : false,
                message: '区域不能为空!',
              },
            ]}>
            <Select disabled={isdisabled}>
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
            <Select
              onChange={(value) => {
                if (value === 1) {
                  setisdisabled(true)
                  form.setFieldsValue({
                    region: '',
                  })
                } else {
                  setisdisabled(false)
                }
              }}>
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
