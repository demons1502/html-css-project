import React from "react";
import PropTypes from "prop-types";

import { Button } from "antd";

const FooterPassword = ({
  textCancel,
  textSubmit,
  handleCancel,
  handleSubmit,
}) => {
  return (
    <div className="footer-password">
      <Button
        danger
        key="cancel"
        className="btn-danger footer-password__btn"
        onClick={handleCancel}
      >
        {textCancel}
      </Button>
      <Button
        key="sendEmail"
        className="btn-primary footer-password__btn"
        type="primary"
        onClick={handleSubmit}
      >
        {textSubmit}
      </Button>
    </div>
  );
};

FooterPassword.propTypes = {
  textCancel: PropTypes.string,
  textSubmit: PropTypes.string,
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default FooterPassword;
