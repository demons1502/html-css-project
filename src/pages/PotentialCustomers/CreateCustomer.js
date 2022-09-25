import { Col, Form, Row } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../components/common/ModalSelect";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";
import DatePicker from "../../components/common/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createPotentialCustomers,
  getCompanies,
} from "../../slices/potentialCustomersSlice";
import { useTranslation } from "react-i18next";
import { acquaintanceLevel, gender, marriageStatus } from "../../constants/common";

export default function CreateCustomer({ isModalOpen, handleCancel }) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [typeId, setTypeId] = useState();
  const [maritalStatus, setMaritalStatus] = useState(1);
  const [acquaintanceLevelStatus, setAcquaintanceLevelStatus] = useState();
  const [dob, setDob] = useState();

  const companies = useSelector(
    (state) => state.potentialCustomersReducer.companies,
  );

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

  const companyOptions = useMemo(
    () =>
      companies.map(({ name, companyId }) => (
        <Option key={companyId} value={companyId}>
          {name}
        </Option>
      )),
    [companies],
  );

  const genderOptions = useMemo(
    () =>
      gender.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      )),
    [companies],
  );

  const onChangeDate = (date, dateString) => {
    setDob(dateString);
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
      }),
    );
    onCancel();
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
                <Form.Item label="Số điện thoại 2" name="phoneNumber2">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Số điện thoại 3" name="phoneNumber3">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Giới tính" name="gender">
                  <Select
                    placeholder="Chọn"
                  >
                    {genderOptions}
                  </Select>
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
                      message: `${t(
                        "potential customers.message.maritalStatus",
                      )}`,
                    },
                  ]}
                >
                  <Select
                    value={maritalStatus}
                    placeholder="Chọn"
                    onChange={(selected) => setMaritalStatus(selected)}
                  >
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
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label="Nghề nghiệp" name="job">
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
                <Form.Item label="Email" name="email">
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
                <Form.Item label="Mã số hợp đồng" name="contract_number">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24}>
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
