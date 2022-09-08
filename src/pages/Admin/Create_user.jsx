import React from 'react'
import { Col, Row, Checkbox } from 'antd';
import "../../assets/scss/Admin/create-user.scss"

function Create_user(props) {

  const handleClose = () => {
    props.closeCreateUser()
  }

  const handleCallCreateUser = () => {
    //call api create user
  }

  return (
    <div className='container_create-user'>
      <div className="creater_user-title">
        <h3>Tạo mới nhân sự</h3>
      </div>
      <div className="line"></div>
      <div className="create_user-form">
        <Row gutter={[8, 16]}>
          <Col span={8} >
            <label>ID</label>
            <input type="text" placeholder='Gen tự động' disabled />
          </Col>
          <Col span={8}>
            <div className="label_required">
              <label>Họ và tên </label>
              <label className='label_required_warning'> *</label>
            </div>
            <input type="text" placeholder='Nhập' />
          </Col>
          <Col span={8}>
            <div className="label_required">
              <label>Sô điện thoại</label>
              <label className='label_required_warning'> *</label>
            </div>
            <input type="text" placeholder='Nhập' />
          </Col>

          <Col span={8}>
            <label>ID login</label>
            <input type="text" placeholder='Nhập' />
          </Col>
          <Col span={16}>
            <label>Email</label>
            <input type="text" placeholder='Nhập' />
          </Col>
        </Row>
        <Row justify="start" className='group_checkbox'>
          <Col span={5}>
            <Checkbox>Admin</Checkbox>
          </Col>
          <Col span={5}>
            <Checkbox>Hỏi đáp</Checkbox>
          </Col>
          <Col span={5}>
            <Checkbox>Thanh toán</Checkbox>
          </Col>
        </Row>
        <Row gutter={[8, 16]}>
          <Col span={16}>
            <label>Vùng hoạt động</label>
            <input type="text" placeholder='Nhập' />
          </Col>
          <Col span={8}>
            <label>ID login người quản lý</label>
            <input type="text" placeholder='Nhập' />
          </Col>
        </Row>
      </div>
      <div className="line"></div>
      <div className="group_btn">
        <button className='btn-danger' onClick={handleClose}>Huỷ tạo</button>
        <button className='btn-primary' onClick={handleCallCreateUser}>Tạo mới</button>
      </div>
    </div>
  )
}

export default Create_user