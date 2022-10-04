import { Form, Checkbox, Popover } from 'antd';
import React, { useState } from 'react';
import InputNumber from '../../../components/common/InputNumber';
import { Button } from '../../../components/styles';
import DotImg from '../../../assets/images/icons/dot.svg';
import { formatDataNumber } from '../../../helper';
import Reminiscent from './Reminiscent';

const spendingForm = () => {
  const [reminiscent, setReminiscent] = useState('');
  const [checked, setChecked] = useState(true);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log({ ...values, reminiscent: reminiscent });
  };

  const onOk = () => {
    form.submit();
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
          <InputNumber placeholder="Nhập" />
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
          <InputNumber placeholder="Nhập" />
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
          <InputNumber placeholder="Nhập" />
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
          <InputNumber placeholder="Nhập" />
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
          <InputNumber placeholder="Nhập" />
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
          <InputNumber placeholder="Nhập" />
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
          <InputNumber placeholder="Nhập" />
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
          <InputNumber placeholder="Nhập" />
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
          <InputNumber placeholder="Nhập" />
        </Form.Item>
        <div className="financialConsultant-form_total">
          <p>Tổng chi tiêu: </p>
          <span>{formatDataNumber(123000000)}</span>
        </div>
        <div className="financialConsultant-form_submit">
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
            Không còn tiềm năng
          </Checkbox>
          <Popover
            placement="topRight"
            content={<Reminiscent form={form} onOk={onOk} setReminiscent={setReminiscent} />}
            trigger="click"
          >
            <Button type="primary">Lưu thông tin</Button>
          </Popover>
        </div>
      </Form>
    </div>
  );
};

export default spendingForm;
