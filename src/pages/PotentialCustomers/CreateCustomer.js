import { Col, Form, Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../../components/common/ModalSelect';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import DatePicker from '../../components/common/DatePicker';
import InputNumber from '../../components/common/InputNumber';
import { useDispatch, useSelector } from 'react-redux';
import { createPotentialCustomers, getCompanies } from '../../slices/potentialCustomersSlice';
import { acquaintanceLevel, connectFrom, gender, marriageStatus, relationship } from '../../constants/common';
import { REGEX_PHONE } from './constants';
import moment from 'moment';
import * as S from './styles';

export default function CreateCustomer({ isModalOpen, handleCancel }) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [typeId, setTypeId] = useState(1);
  const [maritalStatus, setMaritalStatus] = useState(1);
  const [acquaintanceLevelStatus, setAcquaintanceLevelStatus] = useState();
  const [genderValue, setGenderValue] = useState();
  const [dob, setDob] = useState();
  const [connectFromValue, setConnectFromValue] = useState();
  const [relationshipValue, setRelationshipValue] = useState();
  const [currencyString, setCurrencyString] = useState();

  const companies = useSelector((state) => state.potentialCustomersReducer.companies);

  const marriageOptions = useMemo(
    () =>
      marriageStatus.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      )),
    [marriageStatus]
  );

  const acquaintanceLevelOptions = useMemo(
    () =>
      acquaintanceLevel.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      )),
    [acquaintanceLevel]
  );

  const companyOptions = useMemo(
    () =>
      companies.map(({ name, companyId }) => (
        <Option key={companyId} value={companyId}>
          {name}
        </Option>
      )),
    [companies]
  );

  const relationshipOptions = useMemo(
    () =>
      relationship.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      )),
    [relationship]
  );

  const connectFromOptions = useMemo(
    () =>
      connectFrom.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      )),
    [connectFrom]
  );

  const genderOptions = useMemo(
    () =>
      gender.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      )),
    [gender]
  );

  const onChangeDate = (date) => {
    setDob(moment(date));
  };

  const handleChangeSelectCustomer = (value) => {
    setTypeId(value);
  };

  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };

  const onFinish = (value) => {
    dispatch(
      createPotentialCustomers({
        ...value,
        typeId: typeId,
        dob,
        income: currencyString,
      })
    );
    onCancel();
  };

  const onChangeCurrency = (value) => {
    setCurrencyString(`${value}`);
  };

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <Modal
      title="Tạo mới khách hàng"
      isModalOpen={isModalOpen}
      handleCancel={onCancel}
      handleOk={form.submit}
      cancelText="Huỷ tạo"
      okText="Tạo khách hàng"
      renderSelect={
        <Select
          defaultValue={1}
          onChange={(selected) => handleChangeSelectCustomer(selected)}
          style={{ width: '150px' }}
        >
          <Option value={1}>Cá nhân</Option>
          <Option value={3}>Doanh nghiệp</Option>
          <Option value={2}>NV doanh nghiệp</Option>
        </Select>
      }
    >
      <Form form={form} colon={false} layout="vertical" onFinish={onFinish}>
        {typeId === 3 ? (
          <>
            <Row gutter={12}>
              <Col span={16}>
                <Form.Item
                  label="Tên doanh nghiệp"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên doanh nghiệp!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone1"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại',
                    },
                    {
                      pattern: REGEX_PHONE,
                      message: 'Vui lòng nhập đúng số điện thoại',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập địa chỉ!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập họ và tên!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số điện thoại 1"
                  name="phone1"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại!',
                    },
                    {
                      pattern: REGEX_PHONE,
                      message: 'Vui lòng nhập đúng số điện thoại',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số điện thoại 2"
                  name="phoneNumber2"
                  rules={[
                    {
                      pattern: REGEX_PHONE,
                      message: 'Vui lòng nhập đúng số điện thoại',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số điện thoại 3"
                  name="phoneNumber3"
                  rules={[
                    {
                      pattern: REGEX_PHONE,
                      message: 'Vui lòng nhập đúng số điện thoại',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  label="Hôn nhân"
                  name="maritalStatus"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn tình trạng hôn nhân',
                    },
                  ]}
                >
                  <Select value={maritalStatus} placeholder="Chọn" onChange={(selected) => setMaritalStatus(selected)}>
                    {marriageOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Thu nhập"
                  name="income"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập thu nhập!',
                    },
                    {
                      validator: (_, value) =>
                        value >= 10000000
                          ? Promise.resolve()
                          : Promise.reject(new Error('Thu nhập tối thiểu 10.000.000đ')),
                    },
                  ]}
                >
                  <S.InputNumber
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    controls={false}
                    defaultValue={0}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => `${value.replace(/\$\s?|(,*)/g, '')}`}
                    onChange={onChangeCurrency}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Mức độ thân quen"
                  name="acquaintanceLevel"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn mức độ thân quen!',
                    },
                  ]}
                >
                  <Select
                    value={acquaintanceLevelStatus}
                    placeholder="Chọn"
                    onChange={(selected) => setAcquaintanceLevelStatus(selected)}
                  >
                    {acquaintanceLevelOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Ngày sinh"
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn ngày sinh!',
                    },
                    {
                      validator: (_, value) =>
                        new Date().getFullYear() - new Date(value).getFullYear() > 18
                          ? Promise.resolve()
                          : Promise.reject(new Error('Số tuổi phải lớn hơn 18')),
                    },
                  ]}
                >
                  <DatePicker format="DD/MM/YYYY" value={dob} onChange={onChangeDate} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label="Giới tính" name="gender">
                  <Select value={genderValue} placeholder="Chọn" onChange={(selected) => setGenderValue(selected)}>
                    {genderOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Nghề nghiệp" name="job">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Doanh nghiệp" name="companyId">
                  {typeId === 2 ? <Select placeholder="Chọn">{companyOptions}</Select> : <Input />}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: 'email',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Địa chỉ" name="address">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mã số hợp đồng" name="contractNumber">
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label="Nguồn gốc" name="connectFrom">
                  <Select
                    value={connectFromValue}
                    placeholder="Chọn"
                    onChange={(selected) => setConnectFromValue(selected)}
                  >
                    {connectFromOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Quan hệ" name="relationship">
                  <Select
                    value={relationshipValue}
                    placeholder="Chọn"
                    onChange={(selected) => setRelationshipValue(selected)}
                  >
                    {relationshipOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Khác" name="other">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </Form>
    </Modal>
  );
}
