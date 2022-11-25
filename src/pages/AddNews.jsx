import React, { useState } from 'react'
import { Button, message, Steps, Form, Input } from 'antd'
import Draft from './componments/Draft'
function AddNews() {
  const [form] = Form.useForm()
  const firstContent = () => (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off">
        <Form.Item
          label="新闻标题"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入新闻标题!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="新闻分类"
          name="categoryId"
          rules={[
            {
              required: true,
              message: '请选择新闻分类!',
            },
          ]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </>
  )
  const [editContent, seteditContent] = useState('')
  const getEditContent = (content) => {
    seteditContent(content)
    console.log(editContent)
  }
  const steps = [
    {
      title: '撰写新闻',
      description: '新闻标题,新闻分类',
      content: firstContent(),
    },
    {
      title: '新闻内容',
      description: '新闻主题内容',
      content: <Draft getEditContent={getEditContent} />,
    },
    {
      title: '新闻提交',
      description: '保存草稿或提交审核',
      content: '3',
    },
  ]

  const [current, setCurrent] = useState(0)
  const next = () => {
    if (current === 0) {
      form.validateFields().then((res) => {
        console.log(res)
        setCurrent(current + 1)
      })
    } else if (current === 1) {
      if (editContent === '' || editContent.trim() === '<p></p>') {
        message.error('新闻内容不能为空！')
        return
      }
      setCurrent(current + 1)
    }
  }
  const prev = () => {
    setCurrent(current - 1)
  }
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }))
  return (
    <>
      <Steps current={current} items={items} />
      <div style={{ marginTop: '50px' }} className="steps-content">
        {steps[current].content}
      </div>
      <div className="steps-action">
        {current === steps.length - 1 && (
          <div>
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}>
              保存草稿
            </Button>
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}>
              提交审核
            </Button>
          </div>
        )}
        {current > 0 && <Button onClick={() => prev()}>上一步</Button>}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
      </div>
    </>
  )
}

export default AddNews
