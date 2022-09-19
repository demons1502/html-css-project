import React from 'react';
import {Modal} from "antd";

export default function ModalCommon(props) {
  const {
    isVisible,
    setIsVisible,
    title,
    width = 600,
    content
  } = props;

  return <Modal
    className="modal-custom"
    title={title}
    centered
    open={isVisible}
    width={width}
    footer={null}
    onCancel={() => setIsVisible(false)}
  >
    {content}
  </Modal>;
}
