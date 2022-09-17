import React from 'react';
import {Button, Checkbox, Col, Form, Input, Modal, Row} from "antd";

export default function ModalCommon(props) {
  const {
    isVisible,
    setIsVisible,
    title,
    content,
    footer
  } = props;

  return <Modal
    className="modal-custom"
    title={title}
    centered
    open={isVisible}
    onCancel={() => setIsVisible(false)}
    footer={footer}
  >
    {content}
  </Modal>;
}
