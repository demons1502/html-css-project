import React, { useState } from 'react';
import moment from 'moment';

// COMPONENTS
import { Col, Form } from 'antd';
import { Add, Delete } from '../../../../../../assets/images/icons/components';
import SelectTable from '../SelectTable';

//STYLES
import * as S from './styles';

const FormUsers = ({ form, companyId }) => {
  const [customer, setCustomer] = useState({});
  const initialValue = [{ fullName: '', phone: '', birthday: '' }];

  const handleChangeCustomer = (data, key) => {
    setCustomer(data);
    const fields = form.getFieldsValue();
    const { users } = fields;
    const findUser = users.find((i) => i?.customerId === data.customerId);
    if (!findUser) {
      users[key] = {
        customerId: data.customerId,
        fullName: data.fullname,
        phone: data.phone1,
        birthday: moment(data.dob),
        gender: parseInt(data.gender),
      };
    } else {
      users[key] = {};
    }
    form.setFieldsValue({ users });
  };

  return (
    <Form.List initialValue={initialValue} name='users'>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <S.WrapRow key={key} gutter={8}>
              <Col span={6}>
                <Form.Item
                  {...restField}
                  name={[name, 'fullName']}
                  rules={[
                    { required: true, message: 'Vui lòng nhập họ và tên' },
                  ]}
                >
                  <SelectTable
                    value={customer}
                    handleChangeValue={handleChangeCustomer}
                    keyForm={key}
                    companyId={companyId}
                    subCustomer={true}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...restField}
                  name={[name, 'phone']}
                  rules={[{ required: true, message: 'Vui lòng nhập số điện' }]}
                >
                  <S.WrapInput placeholder='SĐT' />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...restField}
                  name={[name, 'gender']}
                  rules={[
                    { required: true, message: 'Vui lòng nhập giới tính' },
                  ]}
                >
                  <S.WrapSelect placeholder='Giới tính'>
                    <S.WrapSelect.Option value={1}>Nam</S.WrapSelect.Option>
                    <S.WrapSelect.Option value={2}>Nữ</S.WrapSelect.Option>
                    <S.WrapSelect.Option value={3}>Khác</S.WrapSelect.Option>
                  </S.WrapSelect>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  {...restField}
                  name={[name, 'birthday']}
                  rules={[
                    { required: true, message: 'Vui lòng nhập ngày sinh' },
                  ]}
                >
                  <S.WrapDatePicker
                    suffixIcon={null}
                    style={{ width: '100%', height: '40px' }}
                    placeholder='DD/MM/YYYY'
                    format='DD/MM/YYYY'
                  />
                </Form.Item>
              </Col>
              <Col span={1}>
                <S.ButtonDelete
                  icon={<Delete width={13} height={13} />}
                  onClick={() => remove(name)}
                ></S.ButtonDelete>
              </Col>
            </S.WrapRow>
          ))}
          <Form.Item>
            <S.ButtonAdd icon={<Add />} onClick={() => add()}></S.ButtonAdd>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default FormUsers;
