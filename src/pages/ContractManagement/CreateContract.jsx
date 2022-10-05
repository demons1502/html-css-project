import { React, useEffect, useState, useRef } from 'react';
import { Form, Row, Col, DatePicker, AutoComplete } from 'antd';
import { Button, Select, Input } from "../../components/styles"
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createContract, updateContract, getByIdApi } from '../../slices/contractManagement';
import { useTranslation } from 'react-i18next';
import { getCustoms } from '../../slices/contractManagement';
import useFormErrors from '../../hooks/useFormErrors'
// import { formatDataNumber, getTimeByTZ } from "../../helper"
// import { VALIDATE_MESSAGES, FORMAT_DATE } from '../../ultis/constant';
// import InputNumber from '../../components/common/InputNumber';
import { DEPOSIT_TERM as depositTermOptions } from '../../ultis/constant';
import { getDepositTermLabel } from '../../ultis/despositTerm';

function CreateContract(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const customerId = useRef();
  useFormErrors(form);
  const { setVisibleModal, dataEdit } = props
  const customerName = useSelector((state) => state.contractManagement.custom);
  var contractEdit = useSelector((state) => state.contractManagement.dataEdit);
  const refreshData = useSelector((state) => state.contractManagement.refreshData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustoms({ name: '', limit: 10, offset: 0 }));
  }, []);
  var { Option } = AutoComplete;

  // const initForm = contractEdit;

  const onFinish = (values) => {
    // dùng để chuyển đổi dữ liệu khi edit nhưng k sửa chu kì nộp phí
    // (values.depositTerm == "Tháng") ? values.depositTerm = 1 : (values.depositTerm == "Nửa năm") ? values.depositTerm = 6 : (values.depositTerm == "Quý") ? values.depositTerm = 3 : (values.depositTerm == "Năm") ? values.depositTerm = 12 : values.depositTerm;
    const data = {
      contractNumber: values.contractNumber,
      customerId: parseInt(customerId.value),
      beneficiary: values.beneficiary,
      value: + values.value,
      startDate: values.date._d,
      // startDate: values.date,
      duration: + values.duration,
      depositTerm: + values.depositTerm,
    };
    // console.log(values);
    // console.log(data);
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
    console.log(value, option);
    customerId.value = option.key;
  };

  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      dispatch(getByIdApi(dataEdit.id))
    }
  }, [dataEdit])

  // const convertDepositTerm = (value) => {
  //   return (value == 1) ? value = "Tháng" : (value == 3) ? value = "Quý" : (value == 6) ? value = "Nửa năm" : (value == 12) ? value = "Năm" : value
  // }

  // useEffect(() => {
  //   if (Object.keys(contractEdit).length > 0 && Object.keys(dataEdit).length > 0) {
  //     form.setFieldsValue({ ...contractEdit, ...{ date: moment(contractEdit.startDate) } })
  //   } else {
  //     form.resetFields()
  //   }
  // }, [contractEdit, dataEdit])

  useEffect(() => {
    if (refreshData) {
      setVisibleModal(false)
    }
  }, [refreshData])

  const formatNumber = (e) => {
    let value = e.target.value.replace(/,/g, '')

    if (!isNaN(value)) {
      const formatter = new Intl.NumberFormat("en-US");

      let formatValue = !!value ? formatter.format(value) : null;
      form.setFieldValue('value', formatValue)
    } else {
      form.setFieldValue('value', e.target.value.slice(0, -1))
    }
  }

  console.log(contractEdit);

  return <Form layout="vertical" form={form} onFinish={onFinish} autoComplete='off' initialValues={contractEdit}>
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
          rules={[{ required: true },
            ({ getFieldValue }) => ({
              validator(_) {
                if (!!getFieldValue('value') && getFieldValue('value').replace(/,/g, '') < 50000000) {
                  return Promise.reject(new Error('Số tiền tối thiểu là 50.000.000'));
                }
                return Promise.resolve();
              },
            })
          ]}
        >
          <Input onChange={formatNumber} placeholder='Nhập' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        {contractEdit.startDate ? (
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
            name="date"
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
          initialValue={contractEdit.depositTerm}
          rules={[{ required: true }]}
        >
          <Select className='select-item-outline' placeholder='Chọn'>
            {depositTermOptions.map((option, index) => {
              return (<Option key={index} value={option.value}>{option.label}</Option>);
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item className="footer-modal">
          <Button key="back" className="btn-danger" onClick={() => setVisibleModal(false)} style={{ fontSize: '14px' }}>
            {t('common.cancel')}
          </Button>
          <Button key="submit" htmlType="submit" type="primary" style={{ fontSize: '14px' }}>
            {/* {Object.keys(dataEdit).length > 0 ? t('common.save') : t('common.create')} */}
            Lưu
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}

export default CreateContract;
