import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../../slices/auth";
import powered from "../../../assets/images/powered.png";
import logo from "../../../assets/images/manulife-logo.png";
import ForgotPassword from "./ForgotPassword";

const FormLogin = () => {
  const dispatch = useDispatch();
  const [messageError, setMessageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (values.username && values.password) {
      dispatch(
        login({
          username: values.username,
          password: values.password,
        })
      );
    } else {
      setMessageError(true);
    }
  };

  return (
    <>
      <div className="login__left__container">
        <div className="login__left__box">
          <img className="login__left__logo" src={logo} />
        </div>
        <Form
          name="login"
          className="login__left__form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            className="login__left__form__username"
            labelCol={{ span: 24 }}
          >
            <Input className="login__input" placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item label="Mật khẩu" labelCol={{ span: 24 }} name="password">
            <Input.Password
              className="login__input"
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="checkbox-item login__checkbox">
                <Typography className="login__label">
                  Ghi nhớ đăng nhập
                </Typography>
              </Checkbox>
            </Form.Item>

            <Button
              className="login__forgotPassword"
              type="text"
              onClick={showModal}
            >
              Quên mật khẩu?
            </Button>
          </Form.Item>
          {messageError && (
            <Typography className="login__textError">
              Vui lòng nhận tên đăng nhập và mật khẩu
            </Typography>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login__button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="login__left__bottom">
        <div className="login__left__bottom__logo">
          <img className="login__left__logo" src={powered} />
        </div>
        <Typography className="login__left__bottom__text">
          Powered by 1Way
        </Typography>
      </div>
      <ForgotPassword open={isModalOpen} handleCancel={handleCancel} />
    </>
  );
};

export default FormLogin;
