import { Form } from 'antd';
import React from 'react';
import DotImg from '../../../assets/images/icons/dot.svg';
import { formatDataNumber } from '../../../helper';

const HistoryDetail = (props) => {
  const { setHistory } = props;
  return (
    <div className="financialConsultant-content history">
      <div className="financialConsultant-form_header">
        <h3>Danh mục chi tiêu</h3>
      </div>
      <Form
        labelCol={{
          span: 16,
        }}
        wrapperCol={{
          span: 8,
        }}
        layout="horizontal"
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
          <span>12000000</span>
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
          <span>12000000</span>
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
          <span>12000000</span>
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
          <span>12000000</span>
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
          <span>12000000</span>
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
          <span>12000000</span>
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
          <span>12000000</span>
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
          <span>12000000</span>
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
          <span>12000000</span>
        </Form.Item>
        <div className="financialConsultant-form_total history">
          <p>Tổng chi tiêu: </p>
          <span>{formatDataNumber(123000000)}</span>
        </div>
      </Form>
    </div>
  );
};

export default HistoryDetail;
