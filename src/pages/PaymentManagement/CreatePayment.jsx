import { Form, Modal } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../../components/common/DatePicker';
import Input from '../../components/common/Input';
import InputNumber from '../../components/common/InputNumber';
import { Button } from '../../components/styles';
import { createPayment } from '../../slices/paymentManagement';
import { LOADING_STATUS } from '../../ultis/constant';

import styled from 'styled-components';
import { formatDataNumber, formatDate, formatLocalDate } from '../../helper';
import { useState } from 'react';

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
      ...values,
      startDate: formatLocalDate(values.startDate?._d),
      dueDate: formatLocalDate(values.dueDate?._d),
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

  const disabledDateStart = (current) => {
    // Can not select days after today
    return current && current > moment().endOf('day');
  };

  const disabledDateEnd = (current) => {
    // Can not select days before today
    return current && current <= form.getFieldValue('startDate');
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
          <Input placeholder="ID login" size="large" />
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
          <DatePicker size="large" format={formatDate} placeholder="DD/MM/YYYY" disabledDate={disabledDateStart} />
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
          <DatePicker size="large" format={formatDate} placeholder="DD/MM/YYYY" disabledDate={disabledDateEnd} />
        </Form.Item>
        <Form.Item name="amount" label="Số tiền" rules={[{ required: true }]}>
          <InputNumber size="large" controls={false} formatter={formatDataNumber} placeholder="Nhập" />
        </Form.Item>
        <Form.Item name="description" label="Nội dung">
          <Textarea autoSize placeholder="Nội dung" />
        </Form.Item>
        <Form.Item className="createPayment-modal_button">
          <Button className="btn-danger" onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePayment;
