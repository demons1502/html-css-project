import { Checkbox, Form, Select, Input } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { options } from './options';
import { formatDataNumber } from '../../../helper';
import { Button } from '../../../components/styles';

const ListCalculation = ({typeFund, userSelected}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [Percent, setPercent] = useState(0);
  const [power, setPow] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(0);
  const [investment, setInvestment] = useState(0);
  const onFinish = (values) => {
    console.log(values);
    userSelected ? navigate("/advise/financial-solutions/minh-hoa-gia", {state:{values: values,total:TotalAmount, typeFund:typeFund, userSelected:userSelected}}) : null
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onSelectOption = (value, option) => {
    setInvestment(value);
  };

  useEffect(() => {
    let per = Percent / 100 + 1;
    const total = investment * Math.pow(per, power);
    setTotalAmount(total);
  }, [Percent, power, investment]);

  useEffect(() => {
    form.setFieldValue('jobStartUp', options[0]);
    setInvestment(form.getFieldValue('jobStartUp').value);
  }, []);

  const { Option } = Select;
  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <div className="container-right-middle">
        <Form.Item
          name="jobStartUp"
          label="Ngành nghề khởi nghiệp"
          className="input-item"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Ăn uống" style={{ width: 152 }} onSelect={onSelectOption}>
            {options.map((option, index) => (
              <Option value={option.value} key={index}>
                {option.label}
              </Option>
            ))}
            {/* <Option value="value2">Kinh doanh Online</Option>
            <Option value="value3">Startup</Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="Số vốn cần thiết">
          <p className="form-input-text">{formatDataNumber(investment)}</p>
        </Form.Item>

        <Form.Item
          name="yearPreparation"
          label="Số năm chuẩn bị"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="0"
            type="number"
            min={0}
            style={{ width: 40 }}
            value={power}
            onChange={(e) => setPow(Number(e.target.value))}
          />
        </Form.Item>
        <Form.Item
          name="inflationRate"
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
              onChange={(e) => setPercent(Number(e.target.value))}
              placeholder="0"
              type="text"
              style={{ width: 45, paddingRight: 0 }}
              value={Percent}
            />
            <span className="pIcon">%</span>
          </div>
        </Form.Item>
      </div>
      <div className="container-right-bottom">
        <p>
          Tổng số tiền cần cho khởi nghiệp:{' '}
          <span className="total-amount">
            {formatDataNumber(TotalAmount)}
            {/* {TotalAmount > 0 &&
              TotalAmount.toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
            {/* {(TotalAmount < 1 || isNaN(TotalAmount)) && '00.00'} */}
          </span>
        </p>
      </div>

      <div className="container-right-submit">
        <Form.Item name="isPotential" valuePropName="checked">
          <Checkbox>Không còn tiềm năng</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Bảng minh họa
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ListCalculation;
