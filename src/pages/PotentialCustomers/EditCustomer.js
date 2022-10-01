import React, { useMemo, useState } from "react";
import moment from "moment";
import { Col, Form, Row, Tooltip } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import Modal from "../../components/common/ModalSelect";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";
import DatePicker from "../../components/common/DatePicker";
import { useTranslation } from "react-i18next";
import { acquaintanceLevel, marriageStatus, numerology } from "../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import { updatePotentialCustomer } from "../../slices/potentialCustomersSlice";
import { useEffect } from "react";
import { REGEX_PHONE } from "./constants";
import InputNumber from "../../components/common/InputNumber";

export default function EditCustomer({ isModalOpen, handleCancel, data }) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [maritalStatusF, setMaritalStatusF] = useState();
  const [acquaintanceLevelStatus, setAcquaintanceLevelStatus] = useState();
  const [typeId, setTypeId] = useState(data.typedId);
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

  const handleChangeSelectCustomer = (value) => {
    setTypeId(value);
  };

  const onFinish = (value) => {
    dispatch(
      updatePotentialCustomer({
        ...value,
        customerId: data.customerId,
        typeId,
      }),
    );
    handleCancel();
  };

  const onCancel = () => {
    handleCancel();
  };

  const onChangeCurrency = (value) => {

  }

  useEffect(() => {
    if (data) {
      setTypeId(data.typeId);
    }
  }, [data]);

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
          value={typeId}
          onChange={(selected) => handleChangeSelectCustomer(selected)}
          style={{ width: "150px" }}
        >
          <Option disabled={data.typeId === 3} value={1}>
            Cá nhân
          </Option>
          <Option disabled value={3}>
            Doanh nghiệp
          </Option>
          <Option disabled={data.typeId === 3} value={2}>
            NV doanh nghiệp
          </Option>
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
                  name="fullname"
                  initialValue={data.name}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên doanh nghiệp!",
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
                  initialValue={data.phone1}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                    {
                      pattern: REGEX_PHONE,
                      message: "Vui lòng nhập đúng số điện thoại",
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
                  initialValue={data.address}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ!",
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
                  initialValue={data.fullname}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!",
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
                  initialValue={data.phone1}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                    {
                      pattern: REGEX_PHONE,
                      message: "Vui lòng nhập đúng số điện thoại",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số điện thoại 2"
                  name="phone2"
                  initialValue={data.phone2}
                  rules={[
                    {
                      pattern: REGEX_PHONE,
                      message: "Vui lòng nhập đúng số điện thoại",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số điện thoại 3"
                  name="phone3"
                  initialValue={data.phone3}
                  rules={[
                    {
                      pattern: REGEX_PHONE,
                      message: "Vui lòng nhập đúng số điện thoại",
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
                  initialValue={+data.maritalStatus}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tình trạng hôn nhân!",
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
                  initialValue={data.income}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thu nhập!",
                    },
                    {
                      validator: (_, value) =>
                        value >= 10000000
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error("Thu nhập tối thiểu 10.000.000đ"),
                          ),
                    },
                  ]}
                >
                  <InputNumber
                    controls={false}
                    defaultValue={data.income}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={onChangeCurrency}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Mức độ thân quen"
                  name="acquaintanceLevel"
                  initialValue={+data.acquaintanceLevel}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn mức độ thân quen!",
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
                  initialValue={moment(data.dob)}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày sinh!",
                    },
                    {
                      validator: (_, value) =>
                        new Date().getFullYear() -
                          new Date(value).getFullYear() >
                          18
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error("Số tuổi phải lớn hơn 18"),
                          ),
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    defaultValue={moment(data.dob, "DD/MM/YYYY")}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  label="Nghề nghiệp"
                  name="job"
                  initialValue={data.job}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Doanh nghiệp"
                  initialValue={
                    typeId === 2 ? data.companyId : data.companyText
                  }
                  name={`${typeId === 2 ? "companyId" : "companyText"}`}
                >
                  {typeId === 2 ? (
                    <Select placeholder="Chọn">{companyOptions}</Select>
                  ) : (
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  initialValue={data.email}
                  rules={[{ type: "email" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  initialValue={data.address}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mã số hợp đồng" name="contract_number" initialValue={data.contractNumber}>
                  <Input readOnly/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label="Thần số học">
                  <Input
                    readOnly
                    value={data.numerology} suffix={
                      <Tooltip title={data.numerology === 22 ? numerology[numerology.length - 1] : numerology[data.numerology]}>
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip>
                    } />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Tỉ lệ thành công">
                  <Input
                    readOnly
                    value={`${data.successfulProb}0%`}
                    suffix={
                      <Tooltip title={(() => {
                        switch (true) {
                          case data.successfulProb < 5:
                            return <p style={{ color: '#FF5855' }}>Không tiềm năng</p>
                          case data.successfulProb >= 5:
                            return <p style={{ color: '#F6CF47' }}>Hơi tiềm năng</p>
                          case data.successfulProb >= 7:
                            return <p style={{ color: '#3DBD78' }}>Có tiềm năng</p>
                          case data.successfulProb >= 10:
                            return <p style={{ color: '#3DBD78' }}>Rất tiềm năng</p>
                          default:
                            return null;
                        }
                      })()}>
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip>
                    } />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Khác" name="note" initialValue={data.note}>
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
