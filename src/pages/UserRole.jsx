import { Table, Modal, Tree } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { getRoleList } from '../server/request'
import axios from 'axios'
function UserRole() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [checkedKeys, setCheckedKeys] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const showModal = (record) => {
    setCurrentId(record.id)
    axios.get('http://localhost:9000/rights?_embed=children').then((res) => {
      setTreeData(res.data)
    })
    getRoleList().then((res) => {
      res.data.map((item) => {
        if (item.id === record.id) {
          setCheckedKeys(item.rights)
        }
        return null
      })
    })
    setIsModalOpen(true)
  }

  const onCheck = (checkedKeysValue) => {
    console.log(checkedKeysValue)
    setCheckedKeys(checkedKeysValue)
  }
  const handleOk = () => {
    axios.patch(`http://localhost:9000/roles/${currentId}`, {
      rights: checkedKeys,
    })
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '操作',
      dataIndex: '',
      key: '1',
      render: (record) => {
        return (
          <>
            <EditTwoTone onClick={() => showModal(record)} />
            <Modal
              okText="确认"
              cancelText="取消"
              title="权限列表"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}>
              <Tree
                checkable
                // onExpand={onExpand}
                // expandedKeys={expandedKeys}
                // autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                // onSelect={onSelect}
                // selectedKeys={selectedKeys}
                treeData={treeData}
              />
            </Modal>
          </>
        )
      },
    },
  ]
  const [data, setData] = useState([])
  function getTableRoleList() {
    getRoleList().then((res) => {
      setData(res.data)
    })
  }
  useEffect(() => {
    getTableRoleList()
  }, [])
  return (
    <div className="UserRole">
      <>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </>
    </div>
  )
}
export default UserRole
