import React from 'react';
import {Button, Checkbox, Col, Form, Input, Modal, Row} from "antd";

export default function ModalCommon(props) {
  const {
    isVisible,
    setIsVisible,
    title,
    content
  } = props;
  const handleOk = () => {
    // setIsModalOpen(false);
  };

  return <Modal
    className="modal-custom"
    title={title}
    centered
    open={isVisible}
    onOk={handleOk} onCancel={() => setIsVisible(false)}
  >
    {content}
  </Modal>;
}
