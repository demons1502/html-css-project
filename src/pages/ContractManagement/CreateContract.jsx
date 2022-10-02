import { React, useEffect, useState, useRef } from 'react';
import { Form, Row, Col, DatePicker, AutoComplete } from 'antd';
import { Button, Select, Input } from "../../components/styles"
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createContract, updateContract, getByIdApi } from '../../slices/contractManagement';
import { useTranslation } from 'react-i18next';
import { getCustoms } from '../../slices/contractManagement';
import useFormErrors from '../../hooks/useFormErrors'
import { formatDataNumber, getTimeByTZ } from "../../helper"
import { VALIDATE_MESSAGES, FORMAT_DATE } from '../../ultis/constant';

function CreateContract(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const customerId = useRef();
  useFormErrors(form);
  const { setVisibleModal, dataEdit } = props
  const customerName = useSelector((state) => state.contractManagement.custom);
  var customerEdit = useSelector((state) => state.contractManagement.dataEdit);
  const refreshData = useSelector((state) => state.contractManagement.refreshData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustoms({ name: '', limit: 10, offset: 0 }));
  }, []);
  var { Option } = AutoComplete;

  const onFinish = (values) => {
    (values.depositTerm == "Tháng") ? values.depositTerm = 30 : (values.depositTerm == "Nửa năm") ? values.depositTerm = 180 : values.depositTerm = 360
    const data = {
      contractNumber: values.contractNumber,
      customerId: parseInt(customerId.value),
      beneficiary: values.beneficiary,
      value: + values.value,
      startDate: moment(values.startDate).format(),
      duration: + values.duration,
      depositTerm: +values.depositTerm,
    };
    if (Object.keys(dataEdit).length > 0) {
      dispatch(updateContract({ id: dataEdit.id, data: data }));
    } else {
      dispatch(createContract(data));
    }
  };

  //autoComplete
  const onSearch = (searchText) => {
    dispatch(getCustoms({ name: searchText, limit: 10, offset: 0 }));
  };

  const onSelectCustomer = (value, option) => {
    customerId.value = option.key;
  };

  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      dispatch(getByIdApi(dataEdit.id))
    }
  }, [dataEdit])

  useEffect(() => {
    if (Object.keys(customerEdit).length > 0 && Object.keys(dataEdit).length > 0) {
      form.setFieldsValue({ ...customerEdit, ...{ date: moment(customerEdit.startDate) } })
    } else {
      form.resetFields()
    }
  }, [customerEdit, dataEdit])

  useEffect(() => {
    if (refreshData) {
      setVisibleModal(false)
    }
  }, [refreshData])

  return <Form layout="vertical" form={form} onFinish={onFinish} autoComplete='off'>
    <input type='hidden' ref={customerId} name="customerId" value="" />
    <Row gutter={[6, 13]}>
      <Col span={6}>
        <Form.Item
          label='Mã số'
          name='contractNumber'
          rules={[{ required: true }]}
        >
          <Input placeholder='Nhập' type='number' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Tên người mua'
          name='customerName'
          rules={[{ required: true }]}
        >
          <AutoComplete
            onSearch={onSearch}
            onSelect={onSelectCustomer}
            dropdownMatchSelectWidth={400}
            placeholder='Nhập'
            className="select-item-outline"
          >
            {customerName?.map((item) => (
              <Option value={item.fullname} key={item.customerId}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{item.fullname}</span>
                  <span>{item.phone1}</span>
                </div>
              </Option>
            ))}
          </AutoComplete>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Tên người hưởng'
          name='beneficiary'
          rules={[{ required: true }]}
        >
          <Input placeholder='Nhập' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Giá trị'
          name='value'
          rules={[{ required: true }]}
        >
          <Input placeholder='Nhập' type='number' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        {customerEdit.startDate ? (
          <Form.Item
            label='Ngày hiệu lực'
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker className="input-item-outline"
              format={moment.localeData().longDateFormat('L')}
              placeholder={moment.localeData().longDateFormat('L')} />
          </Form.Item>
        ) : (
          <Form.Item
            label='Ngày hiệu lực'
            // name="createAt"
            rules={[{ required: true }]}
          >
            <DatePicker className="input-item-outline"
              placeholder={moment.localeData().longDateFormat('L')}
              format={moment.localeData().longDateFormat('L')} />
          </Form.Item>
        )}
      </Col>
      <Col span={6}>
        <Form.Item
          label='Số năm nộp phí'
          name='duration'
          rules={[{ required: true }]}
        >
          <Input placeholder='Nhập' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Chu kỳ nộp phí'
          name='depositTerm'
          // initialValue={dataEdit.depositTerm}
          rules={[{ required: true }]}
        >
          <Select className='select-item-outline' placeholder='Chọn'>
            <Option value='30'>Tháng</Option>
            <Option value='180'>Nửa năm</Option>
            <Option value='360'>Năm</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item className="footer-modal">
          <Button key="back" className="btn-danger" onClick={() => setVisibleModal(false)}>
            {t('common.cancel')}
          </Button>
          <Button key="submit" htmlType="submit" type="primary">
            {/* {Object.keys(dataEdit).length > 0 ? t('common.save') : t('common.create')} */}
            Lưu
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}

export default CreateContract;
