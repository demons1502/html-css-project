import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getTitleAppointment } from '../../../../../../ultis/appointment';

//COMPONENTS
import { Col, Form, message } from 'antd';
import TimePicker from '../TimePicker';
import { ModalSelect } from '../../../../../../components/common';
import { Calender } from '../../../../../../assets/images/icons/components';
import FormUsers from '../FromUsers';
import SelectTable from '../SelectTable';
import InputSelect from '../InputSelect';

// STYLES
import * as S from './styles';
import { editAppointment } from '../../../../../../slices/appointmentManagement';

export const EditAppointment = ({ open, handleCancel, info }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [customer, setCustomer] = useState({});
  const [title, setTitle] = useState(getTitleAppointment(info.title));

  useEffect(() => {
    const fields = form.getFieldsValue();
    const users = info.customerApptRecords.map((i) => {
      return {
        customerId: i.customerId,
        fullName: i.name,
        name: i.name,
        phone: i.phone1,
        birthday: moment(i.dob),
        gender: !i.gender ? 3 : parseInt(i.gender),
      };
    });

    const data = {
      ...fields,
      title: getTitleAppointment(info.title),
      date: moment(info.start),
      startTime: moment(info.start),
      endTime: moment(info.end),
      location: info.location,
      note: info.note,
      users: users
    };
    form.setFieldsValue({ ...data });
  }, [info, open]);

  useEffect(() => {
    setCustomer({
      ...info,
      name: info.host,
      fullname: info.host,
    });
  }, [info]);

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
      typeId: info.typeId,
      customerId: getCustomerId(),
      title: title,
      startTime: startTime,
      endTime: endTime,
      location: values.location,
      note: values.note,
      subCustomerIds: subCustomerIds,
      isCompleted: info.isCompleted,
    };

    dispatch(editAppointment({ id: info.apptId, data })).then(({ error }) => {
      if (!error) {
        handleCancel();
        message.success('Lịch hẹn của bạn vừa được sửa thành công. Chọn lịch hẹn để xem chi tiết.');
      } else {
        message.error('Lịch hẹn của bạn vừa được sửa thất bại. Vui lòng thử lại');
      }
    });
  };

  const getCustomerId = () => {
    if (customer.typeId === 1) {
      return customer.customerId ? customer.customerId : customer.customerApptRecords[0].customerId;
    } else {
      return customer.companyCustomerId;
    }
  };

  const onCancel = () => {
    handleCancel();
    form.resetFields();
  };

  return (
    <ModalSelect
      title="Sửa lịch hẹn"
      width="650px"
      isModalOpen={ open }
      handleCancel={ onCancel }
      handleOk={ form.submit }
      cancelText="Huỷ sửa"
      okText="Sửa lịch hẹn"
    >
      <Form form={ form } colon={ false } layout="vertical" onFinish={ onFinish }>
        <S.WrapRow gutter={ 12 }>
          <Col span={ 12 }>
            <Form.Item
              label="Tên khách hàng"
              name="customerId"
              rules={ [
                {
                  required: Object.keys(customer).length === 0 ? true : false,
                  message: 'Vui lòng nhập tên khách hàng',
                },
              ] }
            >
              <SelectTable customer={ customer } handleChangeValue={ handleChangeCustomer } typeId={ info.typeId } />
            </Form.Item>
          </Col>
          <Col span={ 12 }>
            <Form.Item
              label="Nội dung lịch hẹn"
              name="title"
              rules={ [
                {
                  required: title === '' ? true : false,
                  message: 'Vui lòng nhập nội dung lịch hẹn',
                },
              ] }
            >
              <InputSelect handleChange={ handleChangeTitle } value={ title } />
            </Form.Item>
          </Col>
        </S.WrapRow>
        <S.WrapRow>
          <S.WrapTitle>Thời gian</S.WrapTitle>
        </S.WrapRow>
        <S.WrapRow gutter={ 8 }>
          <Col span={ 8 }>
            <Form.Item
              name="date"
              rules={ [
                {
                  required: true,
                  message: 'Vui lòng nhập thời gian',
                },
              ] }
            >
              <S.WrapDatePicker
                format={ 'DD/MM/YYYY' }
                suffixIcon={ <Calender color="#999999" /> }
                style={ { width: '100%' } }
                placeholder="DD/MM/YYYY"
                disabledDate={ (current) => {
                  let customDate = moment().format('YYYY-MM-DD');
                  return current && current < moment(customDate, 'YYYY-MM-DD');
                } }
                onOpenChange={ () => form.setFieldsValue({ startTime: undefined, endTime: undefined }) }
              />
            </Form.Item>
          </Col>

          <Col span={ 16 }>
            <TimePicker form={ form } />
          </Col>
        </S.WrapRow>
        <S.WrapRow gutter={ 12 }>
          <Col span={ 24 }>
            <Form.Item label="Địa điểm" name="location">
              <S.WrapInput placeholder="Địa điểm" />
            </Form.Item>
          </Col>
        </S.WrapRow>
        <S.WrapRow gutter={ 12 }>
          <Col span={ 24 }>
            <Form.Item label="Ghi Chú" name="note">
              <S.WrapInput placeholder="Ghi Chú" />
            </Form.Item>
          </Col>
        </S.WrapRow>
        { info.typeId === 3 && (
          <>
            <S.WrapRow>
              <S.WrapTitleUser>Thông tin người tham gia</S.WrapTitleUser>
            </S.WrapRow>
            <FormUsers
              form={ form }
              companyId={ customer.companyId }
              customerApptRecords={ info.customerApptRecords }
              open={ open }
            />
          </>
        ) }
      </Form>
    </ModalSelect>
  );
};

EditAppointment.prototype = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
  info: PropTypes.object,
};

export default EditAppointment;
