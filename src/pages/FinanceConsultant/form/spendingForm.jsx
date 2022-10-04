import { Form, Checkbox, Popover } from 'antd';
import React, { useState } from 'react';
import Input from '../../../components/common/Input';
import { Button } from '../../../components/styles';
import DotImg from '../../../assets/images/icons/dot.svg';
import { formatDataNumber } from '../../../helper';
import Reminiscent from './Reminiscent';

const spendingForm = () => {
  const [checked, setChecked] = useState(false);
  const { form } = Form.useForm();

  const handleFinish = (values) => {
    console.log({ ...values, tien: checked });
  };

  const handleChecked = (e) => {
    console.log(e.target);
  };

  return (
    <div className="financialConsultant-content">
      <div className="financialConsultant-form_header">
        <h3>Danh mục chi tiêu</h3>
      </div>
      <Form
        form={form}
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
          name="marketMoney"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền học</span>
            </p>
          }
          labelAlign="left"
          name="studyMoney"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền bỉm, sữa, quà vặt cho con</span>
            </p>
          }
          labelAlign="left"
          name="giftMoney"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền ga, điện, nước, mạng</span>
            </p>
          }
          labelAlign="left"
          name="gasMoney"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí giao tế</span>
            </p>
          }
          labelAlign="left"
          name="cost"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí cá nhân</span>
            </p>
          }
          labelAlign="left"
          name="personalCosts"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Thanh toán lãi vay, thẻ tín dụng</span>
            </p>
          }
          labelAlign="left"
          name="credit"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Quỹ nuôi dưỡng cha mẹ già yếu</span>
            </p>
          }
          labelAlign="left"
          name="nurturingFund"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí khác....</span>
            </p>
          }
          labelAlign="left"
          name="otherCosts"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
        <div className="financialConsultant-form_total">
          <p>Tổng chi tiêu: </p>
          <span>{formatDataNumber(123000000)}</span>
        </div>
        <div className="financialConsultant-form_submit">
          <Form.Item name="check">
            <Checkbox>Không còn tiềm năng</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu thông tin
          </Button>
          <Popover placement="topRight" content={<Reminiscent form={form} />} trigger="click">
            <Button type="primary">Lưu thông tin</Button>
          </Popover>
        </div>
      </Form>
    </div>
  );
};

export default spendingForm;
