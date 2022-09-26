import React from 'react'
import {Form, Upload, Row, Col, Input, Checkbox} from 'antd'
import { CameraOutlined } from '@ant-design/icons';

function ConfigUser() {
  return (
    <div>
      <div className="config_header">
        <h3>Cấu hình</h3>
        <button className='btn-primary'>
          <img src='../images/lock_icon.svg' />
          Đổi mật khẩu
        </button>
      </div>
      <Form>
        <div className="config_content">
          <div className="config_content_title">
            <h2>Thông tin cá nhân</h2>
          </div>
          <div className="config_content_body">
            <div className="config_content_body-avatar">
              <p className='avatar-title'>Ảnh đại diện:</p>
              <Upload
                // name={name}
                listType='picture-card'
                className='avatar-uploader'
                // showUploadList
                // onChange={onChange}
                /* beforeUpload={() => { return false }} */
                // beforeUpload={Upload.LIST_IGNORE}
                // fileList={fileList}
                /* disabled={fileList.length > 0 ? true : false} */
              >
                <div className='upload-content'>
                  <CameraOutlined />
                  <span>Tải ảnh lên</span>
                </div>
              </Upload>
            </div>
            <div className="config_content_body-infoUser">
              <Row gutter={[10, 13]}>
                <Col span={5}>
                  <Form.Item
                    label="Họ và tên"
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    label="Số điện thoại"
                    rules={[{
                      required: true,
                      message: 'Please input your password!',
                    }]}   
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    label="ID login"
                    rules={[{
                      required: true,
                      message: 'Please input your password!',
                    }]} 
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item
                    label="Địa chỉ email"
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    label="ID của người quản lý"
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    label="Vùng hoạt động"
                  >
                    <Input/>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="config_content_body_checkbox-group">
              <Row>
                <Col span={11} className="border_right">
                  <Checkbox className='checkbox-primary'>Chế độ trợ giúp mặc định (hiện lời thoại trên các giao diện)</Checkbox>
                </Col>
                <Col span={5} className="border_right">
                  <Checkbox className='checkbox-primary'>Chế độ đào tạo</Checkbox>
                </Col>
                <Col span={8} className="border_right">
                  <Checkbox className='checkbox-primary'>Chế độ ngôn ngữ theo vùng</Checkbox>
                </Col>
              </Row>
            </div>
            <div className="config_content_body_button-group">
              <button className='btn-primary'>Về trang chủ</button>
              <div className="config_content_body_button-group_right">
                <button className='btn-danger'>Huỷ</button>
                <button className='btn-primary'>Lưu thay đổi</button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default ConfigUser