import { Form } from 'antd';
import React from 'react';
import Input from '../../../components/common/Input';
import { Button } from '../../../components/styles';
import DotImg from '../../../assets/images/icons/dot.svg';
import {formatDataNumber} from '../../../helper'

const spendingForm = () => {

  const handleFinish=(values)=>{
    console.log(values)
  }

  return (
    <div className="financialConsultant-content">
      <div className="financialConsultant-form_header">
        <h3>Danh mục chi tiêu</h3>
      </div>
      <Form
        labelCol={{
          span: 19,
        }}
        wrapperCol={{
          span: 5,
        }}
        layout="horizontal"
        onFinish={handleFinish}
        className="financialConsultant-form"
      >
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền chợ</span>
            </p>
          }
          labelAlign="left"
          name='marketMoney'
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền học</span>
            </p>
          }
          labelAlign="left"
          name='studyMoney'
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền bỉm, sữa, quà vặt cho con</span>
            </p>
          }
          labelAlign="left"
          name='giftMoney'
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền ga, điện, nước, mạng</span>
            </p>
          }
          labelAlign="left"
          name='gasMoney'
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí giao tế</span>
            </p>
          }
          labelAlign="left"
          name=''
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí cá nhân</span>
            </p>
          }
          labelAlign="left"
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Thanh toán lãi vay, thẻ tín dụng</span>
            </p>
          }
          labelAlign="left"
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Quỹ nuôi dưỡng cha mẹ già yếu</span>
            </p>
          }
          labelAlign="left"
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí khác....</span>
            </p>
          }
          labelAlign="left"
        >
          <Input placeholder='Nhập'/>
        </Form.Item>
        <div className="financialConsultant-total">
          <p>Tổng chi tiêu: </p>
          <span>{formatDataNumber(123000000)}</span>
        </div>
        <Form.Item>
          <Button type="primary" htmlType='submit'>Lưu thông tin</Button>
        </Form.Item>
      </Form>
    </div>
    // <div className='financialConsultant-form'>spendingForm</div>
  );
};

export default spendingForm;
