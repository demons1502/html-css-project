import { Button, Checkbox, Form, Input, InputNumber, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDataNumber } from '../../../helper';

const ListCalculation = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalAmountAfterMinus, setTotalAmountAfterMinus] = useState(0);
  const [monthlyRetirementAmount, setMonthlyRetirementAmount] = useState(0);
  const [annualRetirementAmount, setAnnualRetirementAmount] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [minusAmount, setMinusAmount] = useState(0);
  const [currentAge, setCurrentAge] = useState(0);
  const [expectedAge, setExpectedAge] = useState(0);
  const [retiredAge, setRetiredAge] = useState(0);

  const onChange = (value) => {
    setMonthlyRetirementAmount(value);
  };
  const onChange1 = (value) => {
    setMinusAmount(value);
  };

  const onFinish = (values) => {
    const data = {
      ...values,
      retirementTime: retiredAge,
      annualMoney: annualRetirementAmount,
    };
    navigate('/advise/financial-solutions/minh-hoa-gia', { state: { values: data } });
    console.log('Success:', data);
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo, 3);
    // console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    setAnnualRetirementAmount(monthlyRetirementAmount * 12);
  }, [monthlyRetirementAmount]);
  useEffect(() => {
    let per = inflationRate / 100 + 1;
    let per2 = 3 / 100;
    setTotalAmount((annualRetirementAmount * Math.pow(per, 28)) / per2);
  }, [monthlyRetirementAmount, inflationRate]);

  useEffect(() => {
    setTotalAmountAfterMinus(TotalAmount - minusAmount);
  }, [TotalAmount, minusAmount]);

  useEffect(() => {
    let age;
    if (currentAge > 0 && expectedAge >= currentAge) {
      age = expectedAge - currentAge;
    }
    setRetiredAge(age);
  }, [currentAge, expectedAge]);

  useEffect(() => {
    setCurrentAge(0);
    setExpectedAge(0);
  }, []);

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <div className="container-right-middle">
        <Form.Item
          name="currentAge"
          label="Tuổi hiện tại"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="0"
            type="number"
            style={{ width: 50 }}
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
          />
        </Form.Item>
        <Form.Item
          name="expectedAge"
          label="Tuổi nghỉ hưu dự kiến"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="0"
            type="number"
            style={{ width: 50 }}
            value={expectedAge}
            onChange={(e) => setExpectedAge(Number(e.target.value))}
          />
        </Form.Item>
        <Form.Item name="retirementTime" label="Thời gian đến tuổi nghỉ hưu còn">
          <p className="form-input-text">{retiredAge > 0 && `${retiredAge} năm`}</p>
        </Form.Item>
        <Form.Item
          name="monthlyMoney"
          label="Số tiền hằng tháng khi nghỉ hưu"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: 152 }}
            initialvalues={0}
            formatter={formatDataNumber}
            onChange={onChange}
            controls={false}
          />
        </Form.Item>

        <Form.Item name="annualMoney" label="Số tiền hằng năm khi nghỉ hưu">
          <p className="form-input-text">{annualRetirementAmount > 0 ? formatDataNumber(annualRetirementAmount) : 0}</p>
        </Form.Item>

        <Form.Item
          name="desiredTime"
          label="Thời gian nghỉ hưu mong muốn"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="0" style={{ width: 152 }} controls={false} />
        </Form.Item>
        <Form.Item
          name="available"
          label="Số tiền đã có"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: 152 }}
            initialvalues={0}
            formatter={formatDataNumber}
            onChange={onChange1}
            controls={false}
          />
        </Form.Item>
        <Form.Item
          name="inflationary"
          label="Tỷ lệ lạm phát"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div className="percentage-field">
            <Input
              className="percentage-input"
              onChange={(e) => setInflationRate(Number(e.target.value))}
              placeholder="0"
              type="text"
              style={{ width: 45, paddingRight: 0 }}
              value={inflationRate}
            />
            <span className="pIcon">%</span>
          </div>
        </Form.Item>
        <Form.Item
          name="profitYear"
          label="Tỷ suất sinh lời hằng năm"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div className="percentage-field">
            <Input
              className="percentage-input"
              // onChange={(e) => setPercent(Number(e.target.value))}
              placeholder="0"
              type="text"
              style={{ width: 45, paddingRight: 0 }}
              // value={Percent}
            />
            <span className="pIcon">%</span>
          </div>
        </Form.Item>
      </div>
      <div className="container-right-bottom">
        <p className="bottom-para">
          Tổng số tiền cần cho tương lai:
          <span className="total-amount">{TotalAmount > 0 ? formatDataNumber(TotalAmount) : 0}</span>
        </p>

        <p>
          Số tiền còn thiếu khi nghỉ hưu:
          <span className="total-amount">{TotalAmountAfterMinus > 0 ? formatDataNumber(TotalAmount) : 0}</span>
        </p>
      </div>

      <div className="container-right-submit">
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Không còn tiềm năng</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-primary">
            Bảng minh họa
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ListCalculation;
