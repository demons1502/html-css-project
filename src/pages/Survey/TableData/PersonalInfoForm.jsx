import React from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { FieldLabel, CheckboxGroup, InputNumber, RadioGroup } from '../../../components/controls';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { editCustomer } from '../../../slices/customers';
import { FORMAT_DATE } from '../../../ultis/constant';
import { Col, Row, Radio } from 'antd';
import{DatePicker} from 'antd'
import { formatDate, formatToUtcDate } from '../../../helper/index';
import useFormErrors from "../../../hooks/useFormErrors";
import { Button, Input } from '../../../components/styles';
import { marriageStatus, gender } from '../../../constants/common';
import { useEffect } from 'react';
import moment from 'moment';

export const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useFormErrors(form);
  const { customers } = useSelector((state) => state);
  const selectedCustomer = customers?.selectedCustomer || {};

  // const {
  //   control,
  //   watch,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   mode: 'all',
  //   defaultValues: {
  //     fullName: selectedCustomer.fullname,
  //     dob: '',
  //     sex: selectedCustomer?.gender,
  //     dob: selectedCustomer.dob? formatDate(selectedCustomer.dob) : '',
  //     familyStatus: [1],
  //   },
  //   resolver: yupResolver(PersonalInfoSchema),
  // });

  // const onSubmit = (data) => {
  //   const formData = {
  //     typeId: 1,
  //     maritalStatus: 1,
  //     acquaintanceLevel: 1,
  //     gender: 1,
  //     name: data?.fullName,
  //     phone1: data?.phone,
  //     phone2: '',
  //     phone3: '',
  //     income: '123456',
  //     dob: data?._d,
  //     job: data?.job,
  //     companyText: '',
  //     companyId: 0,
  //     email: 'demo@gmail.com',
  //     address: data?.address,
  //     contractNumber: '',
  //     note: '',
  //     isPotential: true,
  //     concerns: '',
  //     size: 0,
  //     hobby: data?.interests,
  //     childrenNum: +data?.numOfChildren,
  //     dependentsNum: +data?.numOfDependents,
  //   };

  //   dispatch(editCustomer({ id: selectedCustomer?.customerId, data: formData }));
  // };

  useEffect(() => {
    if (Object.keys(selectedCustomer).length > 0) {
      form.setFieldsValue({ ...selectedCustomer, ...{
        dob: moment.utc(selectedCustomer.dob).local()
      } })
    } else {
      form.resetFields();
    }
  }, [selectedCustomer])

  const onFinish = (values) => {
    console.log(values)
    const data = {
      ...values,
      dob: formatToUtcDate(values.dob._d)
    }

    dispatch(editCustomer({ id: selectedCustomer?.customerId, data: data }));
  }

  // console.log('seeex', watch('sex'));

  return (
    <div className="personal-info-container">
      <Form name="create_user-form" form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <div className="personal-info-content">
          <Row gutter={[8, 16]}>
            <Col span={7}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" className="input-item-outline" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label="Ngày sinh"
                name="dob"
              >
                <DatePicker className="input-item-outline" format={FORMAT_DATE} placeholder={FORMAT_DATE}/>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Giới tính"
                name="gender"
              >
                <Radio.Group options={gender}/>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label="Nghề nghiệp"
                name="job"
              >
                <Input type="text" placeholder="Chọn" className="input-item-outline"/>
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item
                label="Sở thích"
                name="hobby"
              >
                <Input type="text" placeholder="Nhập" className="input-item-outline"/>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label="Số điện thoại"
                name="phone1"
              >
                <Input type="text" placeholder="Nhập" className="input-item-outline"/>
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item
                label="Địa chỉ"
                name="address"
              >
                <Input type="text" placeholder="Nhập" className="input-item-outline"/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tình trạng gia đình"
                name="maritalStatus"
              >
                <Radio.Group options={marriageStatus}/>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label="Số con"
                name="numOfChildren"
              >
                <Input type="number" placeholder="Nhập" className="input-item-outline"/>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label="Số người phụ thuộc"
                name="dependentsNum"
              >
                <Input type="number" placeholder="Nhập" className="input-item-outline"/>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="info-footer">
          <div className="info-btn">
            <Button type="primary" htmlType="submit" key="submit" className="btn-primary" block disabled={!selectedCustomer?.customerId}>
              Lưu thông tin
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

// const PersonalInfoSchema = yup
//   .object({
//     fullName: yup.string().required('Name is required').trim(),
//     dob: yup.string().required('Date of is required').typeError('Date of is required'),
//     sex: yup.string().required('Gender is required'),
//     job: yup.string().required('Job is required').trim(),
//     interests: yup.string().required('Hobby is required').trim(),
//     phone: yup.string().required('Phone number is required').trim(),
//     address: yup.string().required('Address is required').trim(),
//     familyStatus: yup.string().required('Marital status is required').trim(),
//     numOfChildren: yup.number().required('Number of children is required').typeError('Number of children is required'),
//     numOfDependents: yup
//       .string()
//       .required('Number of dependents is required')
//       .typeError('Number of dependents is required'),
//   })
//   .required();
