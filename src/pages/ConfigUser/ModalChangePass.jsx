import { React, useState, useEffect } from 'react'
import { Form,  notification, Space } from 'antd';
import { Button, Input, Upload, Select } from "../../components/styles";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import useFormErrors from "../../hooks/useFormErrors";
import { changePassword} from '../../slices/configUser'
import { useDispatch, useSelector } from 'react-redux';
import Lock from '../../assets/images/icons/lock.svg'


function ModalChangePass(props) {
  const { closeCreateUser } = props
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading)
  const onFinishChangePass =async (values) => {
    if (values.newPassword === values.confirmPassword) {
      dispatch(changePassword({currentPassword: values.password, newPassword: values.newPassword, retypedPassword:values.confirmPassword }))
    }
    else{
      form.setFields([
        {
          name: 'confirmPassword',
          errors: ['Mật khẩu không trùng nhau']
        }, 
        {
          name: 'newPassword',
          errors: ['Mật khẩu không trùng nhau']
        }
      ])
    }
  }
  useEffect(() => {
    if (loading.loading == "failed" && !loading.message) {
      form.setFields([
        {
          name: 'password',
          errors: ['Mật khẩu không đúng']
        }
      ])
    }
  }, [loading.loading])

  const onValuesChange = values => {
    Object.keys(values).forEach(field => {
      const error = form.getFieldError(field);
      if (!error.length) {
        return;
      }
      form.setFields([
        {
          name: field,
          errors: []
        }
      ]);
    });
  };

  const [form] = Form.useForm();
  useFormErrors(form);
  return (
    <div>
      <div className='form_change_password'>
        <div className="header_form">
          <img src={Lock} alt="" />
        </div>
        <div className="linear">
          <p>Đổi mật khẩu</p>
        </div>
        <Form form={form} onValuesChange={onValuesChange}
          initialValues={{
            remember: true
          }}
          onFinish={onFinishChangePass}
          autoComplete="off"
        >
          <div className="body_form">
            <div className="body_form-content">
              <Form.Item
                label="Mật khẩu cũ"
                name="password"
                rules={[{ required: true }]}
              >
                <Space direction="vertical">
                  <Input.Password
                    placeholder="Nhập mật khẩu cũ"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[{ required: true }]}
              >
                <Space direction="vertical">
                  <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu mới"
                rules={[{ required: true }]}
              >
                <Space direction="vertical">
                  <Input.Password
                    placeholder="Nhập lại mật khẩu"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Space>
              </Form.Item>
            </div>
          </div>
          <div className="footer_form">
            <Button className='btn-danger btn-danger-changePass' onClick={() => { closeCreateUser(false); setTimeout(() => form.resetFields(), 200) }}>Huỷ</Button>
            <Form.Item>
              <Button type="primary" htmlType="submit" >Lưu mật khẩu</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ModalChangePass
