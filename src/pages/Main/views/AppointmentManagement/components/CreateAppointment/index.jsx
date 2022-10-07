import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

//COMPONENTS
import { Col, Form, message } from 'antd';
import TimePicker from '../TimePicker';
import { Select, ModalSelect } from '../../../../../../components/common';
import { Calender } from '../../../../../../assets/images/icons/components';
import FormUsers from '../FromUsers';
import SelectTable from '../SelectTable';
import InputSelect from '../InputSelect';

// STYLES
import * as S from './styles';
import { createAppointment } from '../../../../../../slices/appointmentManagement';

export const CreateAppointment = ({ open, handleCancel, customerInfo, outsideLink }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let udpatedSearchParams = new URLSearchParams(searchParams.toString());
  const { Option } = Select;
  const [form] = Form.useForm();
  const [typeId, setTypeId] = useState(1);
  const [customer, setCustomer] = useState({});
  const [title, setTitle] = useState('');

  useEffect(() => {
    customerInfo && setCustomer(customerInfo);
  }, [customerInfo]);

  const handleChangeSelectCustomer = (value) => {
    setTypeId(value);
  };

  const handleChangeCustomer = (value) => {
    setCustomer(value);
  };

  const handleChangeTitle = (value) => {
    setTitle(value);
  };

  const onFinish = (values) => {
    const subCustomerIds = values?.users && values?.users.length !== 0 ? values?.users.map((i) => i.customerId) : [];

    const startTime = moment(values.date).format('YYYY-MM-DD ') + moment(values.startTime).format('HH:mm:ss');

    const endTime =
      moment(values.date).format('YYYY-MM-DD ') + moment(values.endTime).subtract(1, 'seconds').format('HH:mm:ss');

    const data = {
      typeId: typeId,
      customerId: customer.customerId,
      title: title,
      startTime: startTime,
      endTime: endTime,
      location: values.location,
      note: values.note,
      subCustomerIds: subCustomerIds,
    };

    dispatch(createAppointment(data)).then(({ error }) => {
      if (!error) {
        outsideLink && removeParam('CustomerId', 'TypeId');
        form.resetFields();
        handleCancel();
        message.success('Lịch hẹn của bạn vừa được tạo thành công. Chọn lịch hẹn để xem chi tiết.');
      } else {
        message.error('Lịch hẹn của bạn vừa được tạo thất bại. Vui lòng thử lại');
      }
    });
  };

  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };

  const removeParam = (key) => {
    udpatedSearchParams.delete(key);
    setSearchParams(udpatedSearchParams.toString());
  };

  return (
    <ModalSelect
      title="Tạo mới lịch hẹn"
      width="650px"
      isModalOpen={open}
      handleCancel={onCancel}
      handleOk={form.submit}
      cancelText="Huỷ tạo"
      okText="Tạo lịch hẹn"
      renderSelect={
        <Select
          defaultValue={typeId}
          onChange={(selected) => handleChangeSelectCustomer(selected)}
          style={{ width: '150px' }}
        >
          <Option value={1}>Cá nhân</Option>
          <Option value={3}>Doanh nghiệp</Option>
        </Select>
      }
    >
      <Form form={form} colon={false} layout="vertical" onFinish={onFinish}>
        <S.WrapRow gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Tên khách hàng"
              name="customerId"
              rules={[
                {
                  required: Object.keys(customer).length === 0 ? true : false,
                  message: 'Vui lòng nhập tên khách hàng',
                },
              ]}
            >
              <SelectTable
                disabled={outsideLink}
                customer={customer}
                handleChangeValue={handleChangeCustomer}
                typeId={typeId}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nội dung lịch hẹn"
              name="title"
              rules={[
                {
                  required: title === '' ? true : false,
                  message: 'Vui lòng nhập nội dung lịch hẹn',
                },
              ]}
            >
              <InputSelect handleChange={handleChangeTitle} value={title} />
            </Form.Item>
          </Col>
        </S.WrapRow>
        <S.WrapRow>
          <S.WrapTitle>Thời gian</S.WrapTitle>
        </S.WrapRow>
        <S.WrapRow gutter={8}>
          <Col span={8}>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thời gian',
                },
              ]}
            >
              <S.WrapDatePicker
                format={'DD/MM/YYYY'}
                suffixIcon={<Calender color="#999999" />}
                style={{ width: '100%' }}
                placeholder="DD/MM/YYYY"
                disabledDate={(current) => {
                  let customDate = moment().format('YYYY-MM-DD');
                  return current && current < moment(customDate, 'YYYY-MM-DD');
                }}
                onOpenChange={() => form.setFieldsValue({ startTime: undefined, endTime: undefined })}
              />
            </Form.Item>
          </Col>

          <Col span={16}>
            <TimePicker form={form} />
          </Col>
        </S.WrapRow>
        <S.WrapRow gutter={12}>
          <Col span={24}>
            <Form.Item label="Địa điểm" name="location">
              <S.WrapInput placeholder="Địa điểm" />
            </Form.Item>
          </Col>
        </S.WrapRow>
        <S.WrapRow gutter={12}>
          <Col span={24}>
            <Form.Item label="Ghi Chú" name="note">
              <S.WrapInput placeholder="Ghi Chú" />
            </Form.Item>
          </Col>
        </S.WrapRow>
        {typeId === 3 && (
          <>
            <S.WrapRow>
              <S.WrapTitleUser>Thông tin người tham gia</S.WrapTitleUser>
            </S.WrapRow>
            <FormUsers form={form} companyId={customer.companyId} />
          </>
        )}
      </Form>
    </ModalSelect>
  );
};

CreateAppointment.defaultProps = {
  outsideLink: false,
  customerInfo: {},
};

CreateAppointment.prototype = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
  customerInfo: PropTypes.object,
  outsideLink: PropTypes.bool,
};

export default CreateAppointment;
