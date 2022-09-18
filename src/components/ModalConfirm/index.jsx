import React from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd'
const { confirm } = Modal;

export default function ModalConfirm(title='Confirm',content='Bạn có muốn thực hiện thao tác này?',confirmText='Xác nhận',cancelText='Huỷ bỏ') {
  Modal.confirm({
    title: 'Xác nhận',
    icon: <ExclamationCircleOutlined />,
    content: 'Bạn có muốn thực hiện thao tác này?',
    okText: 'Xác nhận',
    cancelText: 'Huỷ bỏ',
    centered:true ,

    onOk() {
      console.log('ok');
    },
  })}