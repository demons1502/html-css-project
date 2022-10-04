import React from "react";
import { useForm } from "react-hook-form";
import { Input, FieldLabel, CheckboxGroup } from "../../../components/controls";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editCustomer } from "../../../slices/customers";
import { DatePicker } from 'antd';
import { FORMAT_DATE } from '../../../ultis/constant';
import { Col, Row } from 'antd';
import { getTimeByTZ } from '../../../helper/index';

export const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state);
  console.log(customers);
  const selectedCustomer = customers?.selectedCustomer || {};
  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      fullName: selectedCustomer.fullname,
      sex: selectedCustomer?.gender,
      dob: selectedCustomer.dob? getTimeByTZ(selectedCustomer.dob) : '',
      familyStatus: [1],
    },
  });

  const onSubmit = (data) => {

    const formData = {
      typeId: 1,
      maritalStatus: 1,
      acquaintanceLevel: 1,
      gender: 1,
      name: data?.fullName,
      phone1: data?.phone,
      phone2: "",
      phone3: "",
      income: "123456",
      dob: data?.dob?._d,
      job: data?.job,
      companyText: "",
      companyId: 0,
      email: "demo@gmail.com",
      address: data?.address,
      contractNumber: "",
      note: "",
      isPotential: true,
      concerns: "",
      size: 0,
      hobby: data?.interests,
      childrenNum: +data?.numOfChildren,
      dependentsNum: +data?.numOfDependents,
    };


    dispatch(editCustomer({ id: selectedCustomer?.customerId, data: formData }));
  };

  return (
    <div className="personal-info-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="personal-info-content">
          <Row gutter={[8, 16]}>
            <Col span={7}>
              <div className="form-group">
                <FieldLabel name="fullName" label="Họ và tên" required />
                <Input control={control} name="fullName" />
              </div>
            </Col>
            <Col span={7}>
              <div className="form-group">
                <FieldLabel for="dob" label="Ngày sinh" />
                <DatePicker className="input-item-outline dob" format={FORMAT_DATE} placeholder={FORMAT_DATE} name="dob"/>
              </div>
            </Col>
            <Col span={10}>
              <FieldLabel name="sex" label="Giới tính" />
              <div style={{ marginTop: "10px" }}>
                <CheckboxGroup name="sex" control={control} options={sex} />
              </div>
            </Col>
            <Col span={7}>
              <div>
                <FieldLabel name="job" label="Nghề nghiệp" />
                <Input control={control} name="job" placeholder="Chọn" />
              </div>
            </Col>
            <Col span={17}>
              <div>
                <FieldLabel name="interests" label="Sở thích" />
                <Input control={control} name="interests" placeholder="Nhập" />
              </div>
            </Col>
            <Col span={7}>
              <div>
                <FieldLabel name="phone" label="Số điện thoại" />
                <Input control={control} name="phone" placeholder="Nhập" />
              </div>
            </Col>
            <Col span={17}>
            
              <FieldLabel name="address" label="Địa chỉ" />
              <Input control={control} name="address" placeholder="Nhập" />
               
            </Col>
            <Col span={24}>
              <FieldLabel name="familyStatus" label="Tình trạng gia đình" />
              <div style={{ marginTop: "10px" }}>
                <CheckboxGroup name="familyStatus" control={control} options={familyStatus} />
              </div>
            </Col>
            <Col span={7}>
              <FieldLabel name="numOfChildren" label="Số con" />
              <div>
                <Input control={control} name="numOfChildren" placeholder="Nhập" />
              </div>
            </Col>
            <Col span={7}>
              <FieldLabel name="numOfDependents" label="Số người phụ thuộc" />
              <div>
                <Input control={control} name="numOfDependents" placeholder="Nhập" />
              </div>
            </Col>
          </Row>
        </div>
        <div className="info-footer">
          <div className="info-btn">
            <Button type="primary" htmlType="submit" className="btn-primary" block>
              Lưu thông tin
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const sex = [
  {
    id: 1,
    label: "Nam",
    value: 1,
  },
  {
    id: 2,
    label: "Nữ",
    value: 2,
  },
];

const familyStatus = [
  {
    id: 1,
    label: "Độc thân",
    value: 1,
  },
  {
    id: 2,
    label: "Có gia đình",
    value: 2,
  },
  {
    id: 3,
    label: "Góa",
    value: 3,
  },
];

// const jobs = [
//   {
//     id: 1,
//     label: "Engineer",
//     value: "engineer",
//   },
//   {
//     id: 2,
//     label: "Service Holder",
//     value: "service_holder",
//   },
//   {
//     id: 3,
//     label: "Business man",
//     value: "business_man",
//   },
//   {
//     id: 4,
//     label: "Doctor",
//     value: "doctor",
//   },
