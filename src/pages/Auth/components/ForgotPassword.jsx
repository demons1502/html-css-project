import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Modal, Typography } from "antd";

import { resetPasswordApi } from "../../../services/auth";
import FooterPassword from "./FooterPassword";
import HeaderPassword from "./HeaderPassword";

const ForgotPassword = ({ open, handleCancel }) => {
  const [id, setId] = useState("");
  const [messageError, setMessageError] = useState(false);

  const handleSend = async () => {
    try {
      if (id !== "") {
        await resetPasswordApi({ loginId: id });
        setMessageError(false);
      } else {
        setMessageError(true);
      }
    } catch (error) {
      return Promise.reject(error.data);
    }
  };

  return (
    <Modal
      className="forgot-password"
      open={open}
      onCancel={handleCancel}
      centered
      closable={false}
      footer={
        <FooterPassword
          textCancel="Huỷ"
          textSubmit="Gửi email"
          handleCancel={handleCancel}
          handleSubmit={handleSend}
        />
      }
      width={335}
    >
      <HeaderPassword
        title="Quên mật khẩu"
        text="Vui lòng nhập ID của bạn để cập nhật mật khẩu"
      />
      <div className="forgot-password__boxInput">
        <Typography className="forgot-password__boxInput__label">ID</Typography>
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="login__input forgot-password__boxInput__id"
          placeholder="id"
        />
      </div>
      {messageError && (
        <Typography className="forgot-password__textError">
          Vui lòng nhận ID
        </Typography>
      )}
    </Modal>
  );
};

ForgotPassword.propTypes = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
};

export default ForgotPassword;
