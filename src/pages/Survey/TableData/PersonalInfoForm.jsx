import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, FieldLabel, CheckboxGroup, InputNumber, RadioGroup } from '../../../components/controls';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { editCustomer } from '../../../slices/customers';
import { FORMAT_DATE } from '../../../ultis/constant';
import { Col, Row } from 'antd';
import{DatePicker} from 'antd'
import { formatDate } from '../../../helper/index';

export const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state);
  const selectedCustomer = customers?.selectedCustomer || {};

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      fullName: selectedCustomer.fullname,
      dob: '',
      sex: selectedCustomer?.gender,
      dob: selectedCustomer.dob? formatDate(selectedCustomer.dob) : '',
      familyStatus: [1],
    },
    resolver: yupResolver(PersonalInfoSchema),
  });

  const onSubmit = (data) => {
    const formData = {
      typeId: 1,
      maritalStatus: 1,
      acquaintanceLevel: 1,
      gender: 1,
      name: data?.fullName,
      phone1: data?.phone,
      phone2: '',
      phone3: '',
      income: '123456',
      dob: data?._d,
      job: data?.job,
      companyText: '',
      companyId: 0,
      email: 'demo@gmail.com',
      address: data?.address,
      contractNumber: '',
      note: '',
      isPotential: true,
      concerns: '',
      size: 0,
      hobby: data?.interests,
      childrenNum: +data?.numOfChildren,
      dependentsNum: +data?.numOfDependents,
    };

    dispatch(editCustomer({ id: selectedCustomer?.customerId, data: formData }));
  };

  console.log('seeex', watch('sex'));

  return (
    <div className="personal-info-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="personal-info-content">
          <Row gutter={[8, 16]}>
            <Col span={7}>
              <div className="form-group">
                <FieldLabel name="fullName" label="Họ và tên" required />
                <Input control={control} name="fullName" errors={errors} />
              </div>
            </Col>
            <Col span={7}>
              <div className="form-group">
                <FieldLabel for="dob" label="Ngày sinh" />
                <DatePicker control={control} errors={errors} className="input-item-outline dob" format={FORMAT_DATE} placeholder={FORMAT_DATE} name="dob"/>
              </div>
            </Col>
            <Col span={10}>
              <FieldLabel name="sex" label="Giới tính" />
              <div style={{ marginTop: '10px' }}>
                <RadioGroup name="sex" control={control} options={sex} errors={errors} />
              </div>
            </Col>
            <Col span={7}>
              <div>
                <FieldLabel name="job" label="Nghề nghiệp" />
                <Input control={control} name="job" placeholder="Chọn" errors={errors} />
              </div>
            </Col>
            <Col span={17}>
              <div>
                <FieldLabel name="interests" label="Sở thích" />
                <Input control={control} name="interests" placeholder="Nhập" errors={errors} />
              </div>
            </Col>
            <Col span={7}>
              <div>
                <FieldLabel name="phone" label="Số điện thoại" />
                <Input control={control} name="phone" placeholder="Nhập" errors={errors} />
              </div>
            </Col>
            <Col span={17}>
              <FieldLabel name="address" label="Địa chỉ" />
              <Input control={control} name="address" placeholder="Nhập" errors={errors} />
            </Col>
            <Col span={24}>
              <FieldLabel name="familyStatus" label="Tình trạng gia đình" />
              <div style={{ marginTop: '10px' }}>
                <RadioGroup name="familyStatus" control={control} options={familyStatus} errors={errors} />
              </div>
            </Col>
            <Col span={7}>
              <FieldLabel name="numOfChildren" label="Số con" />
              <div>
                <InputNumber control={control} name="numOfChildren" placeholder="Nhập" errors={errors} />
              </div>
            </Col>
            <Col span={7}>
              <FieldLabel name="numOfDependents" label="Số người phụ thuộc" />
              <div>
                <InputNumber control={control} name="numOfDependents" placeholder="Nhập" errors={errors} />
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
    label: 'Nam',
    value: 1,
  },
  {
    id: 2,
    label: 'Nữ',
    value: 2,
  },
];

const familyStatus = [
  {
    id: 1,
    label: 'Độc thân',
    value: 1,
  },
  {
    id: 2,
    label: 'Có gia đình',
    value: 2,
  },
  {
    id: 3,
    label: 'Góa',
    value: 3,
  },
];

const PersonalInfoSchema = yup
  .object({
    fullName: yup.string().required('Name is required').trim(),
    dob: yup.string().required('Date of is required').typeError('Date of is required'),
    sex: yup.string().required('Gender is required'),
    job: yup.string().required('Job is required').trim(),
    interests: yup.string().required('Hobby is required').trim(),
    phone: yup.string().required('Phone number is required').trim(),
    address: yup.string().required('Address is required').trim(),
    familyStatus: yup.string().required('Marital status is required').trim(),
    numOfChildren: yup.number().required('Number of children is required').typeError('Number of children is required'),
    numOfDependents: yup
      .string()
      .required('Number of dependents is required')
      .typeError('Number of dependents is required'),
  })
  .required();
