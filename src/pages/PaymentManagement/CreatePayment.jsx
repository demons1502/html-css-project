import { Form, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { createPayment } from '../../slices/paymentManagement';
import { LOADING_STATUS } from '../../ultis/constant';
import Input from '../../components/common/Input';
import DatePicker from '../../components/common/DatePicker';
import * as S from '../../components/styles';

import styled from 'styled-components';

const Textarea = styled(Input.TextArea)`
  background: #f8f8f8;
  min-height: 120px !important;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #999999;
  &:focus {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }
  &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
  &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover {
    background: #f8f8f8;
  }
`;

const CreatePayment = (props) => {
  const { isModalOpen, setIsModalOpen } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const loading = useSelector((state) => state.loading.loading);

  const handleAddNew = (values) => {
    const newPayment = {
      loginId: values.loginId,
      startDate: moment(values.time[0]?._d).format(),
      dueDate: moment(values.time[1]?._d).format(),
      amount: +values.amount,
      description: values.description,
    };
    dispatch(createPayment(newPayment));
    if (loading === LOADING_STATUS.succeeded) {
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal
      className="createPayment-modal"
      title={<h3>Thanh toán mới</h3>}
      open={isModalOpen}
      footer={false}
      keyboard={false}
      centered
      onCancel={() => {
        setIsModalOpen(false), form.resetFields();
      }}
    >
      <Form name="nest-messages" onFinish={handleAddNew} form={form}>
        <Form.Item
          name="loginId"
          label="ID Login"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="ID login" />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Ngày thanh toán"
          rules={[
            {
              required: true,
              type: 'date',
            },
          ]}
        >
          <DatePicker placeholder="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Ngày kết thúc"
          rules={[
            {
              type: 'date',
              required: true,
            },
          ]}
        >
          <DatePicker placeholder="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item name="amount" label="Số tiền" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Nội dung">
          <Textarea autoSize placeholder="Content" />
        </Form.Item>
        <Form.Item>
          <div className="createPayment-modal_button">
            <S.Button type="primary" htmlType="submit" key={'1'}>
              Thêm mới
            </S.Button>
            <S.Button className="btn-danger" key={'2'} onClick={handleCancel}>
              Hủy
            </S.Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePayment;
