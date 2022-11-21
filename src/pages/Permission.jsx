import { Space, Switch, Table, Tag, Popover } from 'antd'
import React, { useState, useEffect } from 'react'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import axios from 'axios'
function Permission() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (key) => (
        <>
          <Tag color="orange">{key}</Tag>
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <Space size="middle">
          <Popover
            content={
              <Switch
                disabled={record.pagepermisson === undefined}
                defaultChecked
                checked={record.pagepermisson}
                onChange={() => changePermission(record)}
              />
            }
            title="权限管理"
            trigger="click">
            <EditTwoTone style={{ fontSize: '16px', cursor: 'pointer' }} />
          </Popover>

          <DeleteTwoTone
            twoToneColor="red"
            style={{ fontSize: '16px', cursor: 'pointer' }}
          />
        </Space>
      ),
    },
  ]
  const [data, setData] = useState([])
  useEffect(() => {
    async function getDataList() {
      await axios
        .get('http://localhost:9000/rights?_embed=children')
        .then((res) => {
          res.data[0].children = ''
          setData(res.data)
        })
    }
    getDataList()
  }, [])
  function changePermission(item) {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    if (item.grade === 1) {
      axios.patch(`http://localhost:9000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      })
    } else {
      axios.patch(`http://localhost:9000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      })
    }
    console.log(item)
    setData([...data])
  }
  return (
    <div className="Permission">
      <>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </>
    </div>
  )
}
export default Permission
