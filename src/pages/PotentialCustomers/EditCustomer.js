import React, { useEffect, useMemo, useState } from "react";
import { Col, Form, Row } from "antd";
import Modal from "../../components/common/ModalSelect";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";
import DatePicker from "../../components/common/DatePicker";
import { useTranslation } from "react-i18next";
import { acquaintanceLevel, marriageStatus } from "../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import {
  getPotentialCustomer,
  updatePotentialCustomer,
} from "../../slices/potentialCustomersSlice";

export default function EditCustomer({ isModalOpen, handleCancel, data }) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const potentialCustomer = useSelector(
    (state) => state.potentialCustomersReducer.potentialCustomer,
  );
  const [maritalStatusF, setMaritalStatusF] = useState();
  const [acquaintanceLevelStatus, setAcquaintanceLevelStatus] = useState();
  const [dob, setDob] = useState();

  const { customerId, typeId } = data;

  useEffect(() => {
    dispatch(getPotentialCustomer({ customerId, typeId }));
  }, [dispatch]);

  const {
    fullname,
    name,
    phone1,
    phone2,
    phone3,
    address,
    job,
    dob: birthday,
    email,
    note,
    income,
    maritalStatus,
  } = potentialCustomer;

  const marriageOptions = useMemo(
    () =>
      marriageStatus.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      )),
    [marriageStatus],
  );

  const acquaintanceLevelOptions = useMemo(
    () =>
      acquaintanceLevel.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      )),
    [acquaintanceLevel],
  );

  const handleChangeSelectCustomer = () => {};

  const onChangeDate = () => {};

  const onFinish = (value) => {
    console.log(value);
    dispatch(updatePotentialCustomer({ ...value, customerId }));
  };

  const onCancel = () => {
    handleCancel();
  };

  console.log(birthday?.substring(0, 10));

  return (
    <Modal
      title="Chi tiết khách hàng"
      isModalOpen={isModalOpen}
      handleCancel={onCancel}
      handleOk={form.submit}
      cancelText="Huỷ cập nhật"
      okText="Cập nhật khách hàng"
      renderSelect={
        <Select
          defaultValue={typeId}
          onChange={(selected) => handleChangeSelectCustomer(selected)}
          style={{ width: "150px" }}
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
                  initialValue={name}
                  rules={[
                    {
                      required: true,
                      message: `${t("potential customers.message.name")}`,
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
                  initialValue={phone1}
                  rules={[
                    {
                      required: true,
                      message: `${t("potential customers.message.phone1")}`,
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
                  initialValue={address}
                  rules={[
                    {
                      required: true,
                      message: `${t("potential customers.message.address")}`,
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
                  initialValue={fullname}
                  rules={[
                    {
                      required: true,
                      message: `${t("potential customers.message.name")}`,
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
                  initialValue={phone1}
                  rules={[
                    {
                      required: true,
                      message: `${t("potential customers.message.phone1")}`,
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
                  initialValue={phone2}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số điện thoại 3"
                  name="phoneNumber3"
                  initialValue={phone3}
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
                  initialValue={Number(maritalStatus)}
                  rules={[
                    {
                      required: true,
                      message: `${t(
                        "potential customers.message.maritalStatus",
                      )}`,
                    },
                  ]}
                >
                  <Select
                    value={maritalStatusF}
                    placeholder="Chọn"
                    onChange={(selected) => setMaritalStatusF(selected)}
                  >
                    {marriageOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Thu nhập"
                  name="income"
                  initialValue={income}
                  rules={[
                    {
                      required: true,
                      message: `${t("potential customers.message.income")}`,
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Mức độ thân quen"
                  name="acquaintanceLevel"
                  initialValue={acquaintanceLevel}
                  rules={[
                    {
                      required: true,
                      message: `${t(
                        "potential customers.message.acquaintanceLevel",
                      )}`,
                    },
                  ]}
                >
                  <Select
                    value={acquaintanceLevelStatus}
                    placeholder="Chọn"
                    onChange={(selected) =>
                      setAcquaintanceLevelStatus(selected)
                    }
                  >
                    {acquaintanceLevelOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Ngày sinh"
                  name="dob"
                  initialValue={dob}
                  rules={[
                    {
                      required: true,
                      message: `${t("potential customers.message.birthday")}`,
                    },
                  ]}
                >
                  <DatePicker
                    value={dob}
                    onChange={onChangeDate}
                    style={{ width: "100%" }}
                    defaultValue={dob}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label="Nghề nghiệp" name="job" initialValue={job}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Doanh nghiệp" name="companyId">
                  {typeId === 2 ? (
                    <Select placeholder="Chọn">{companyOptions}</Select>
                  ) : (
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email" initialValue={email}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  initialValue={address}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mã số hợp đồng" name="contract_number">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24}>
                <Form.Item label="Khác" name="note" initialValue={note}>
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
