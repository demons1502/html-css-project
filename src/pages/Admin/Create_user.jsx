import React from 'react'
import { Col, Row, Checkbox, Button, Form, Input } from 'antd';
import "../../assets/scss/Admin/create-user.scss"

function Create_user(props) {

  const handleClose = () => {
    props.closeCreateUser()
  }
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='container_create-user'>
      <div className="creater_user-title">
        <h3>Tạo mới nhân sự</h3>
      </div>
      <div className="line"></div>
      <Form name="create_user-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[8, 16]}>
          <Col span={8} >
            <Form.Item
              label="ID"
            >
              <Input type="text" placeholder='Gen tự động' disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Họ và tên"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Họ và tên.',
                },
              ]}
            >
              <Input type="text" placeholder='Nhập' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Sô điện thoại"
              name="number"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoai.',
                },
              ]}
            >
              <Input type="number" placeholder='Nhập' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="ID login"
              name="idLogin">
              <Input type="text" placeholder='Nhập' />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Email"
              name="email"
            >
              <Input type="text" placeholder='Nhập' />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="start" className='group_checkbox'>
          <Col span={5}>
            <Form.Item
              name="isAdmin"
              valuePropName="checked"
            >
              <Checkbox>Admin</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="isQuestion"
              valuePropName="checked"
            >
              <Checkbox>Hỏi đáp</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="isPayment"
              valuePropName="checked"
            >
              <Checkbox>Thanh toán</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 16]}>
          <Col span={16}>
            <Form.Item
              label="Vùng hoạt động"
              name="area"
            >
              <Input type="text" placeholder='Nhập' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="idLoginUser"
              label="ID login người quản lý"
            >
              <Input type="text" placeholder='Nhập' />
            </Form.Item>
          </Col>
        </Row>
        <div className="line line_bottom"></div>
        <div className="group_btn">
          <button className='btn-danger' onClick={handleClose}>Huỷ tạo</button>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='btn-primary'>Tạo mới</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default Create_user