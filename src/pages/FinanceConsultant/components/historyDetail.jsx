import { Form } from 'antd';
import React, { useEffect } from 'react';
import DotImg from '../../../assets/images/icons/dot.svg';
import InputNumber from '../../../components/common/InputNumber';
import { formatDataNumber } from '../../../helper';

const HistoryDetail = (props) => {
  const { history } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    const histories = history?.consultAttrs.reduce((obj, item) => Object.assign(obj, { [item.label]: item.value }), {});
    if (Object.keys(histories).length > 0) {
      form.setFieldsValue({ ...histories });
    } else {
      form.resetFields();
    }
  }, [history]);

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
        form={form}
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
          <InputNumber disabled formatter={formatDataNumber} />
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
          <InputNumber disabled formatter={formatDataNumber} />
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
          <InputNumber disabled formatter={formatDataNumber} />
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
          <InputNumber disabled formatter={formatDataNumber} />
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
          <InputNumber disabled formatter={formatDataNumber} />
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
          <InputNumber disabled formatter={formatDataNumber} />
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
          <InputNumber disabled formatter={formatDataNumber} />
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
          <InputNumber disabled formatter={formatDataNumber} />
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
          <InputNumber disabled formatter={formatDataNumber} />
        </Form.Item>
        <div className="financialConsultant-form_total history">
          <p>Tổng chi tiêu: </p>
          <span>{formatDataNumber(history.total)}</span>
        </div>
      </Form>
    </div>
  );
};

export default HistoryDetail;
