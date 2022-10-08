import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { formatDataNumber } from '../../../helper';
import { postFinanceDatas } from '../../../slices/financeSolutions';

const ListCalculation = ({ finaceDatas, typeFund, userSelected, setKeywords }) => {
  const [Percent, setPercent] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isPotential, setIsPotential] = useState(false);
  const [TotalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // dispatch
  const dispatch = useDispatch();

  // setPercent
  useEffect(() => {
    if (finaceDatas !== '' || finaceDatas !== undefined) {
      setPercent(finaceDatas?.illustration?.investmentRate);
    } else {
      setPercent(0);
    }
  }, [finaceDatas]);

  // setAmount
  const onChange = (value) => {
    setAmount(value);
  };

  // setAmount
  useEffect(() => {
    if (isPotential === undefined) {
      setIsPotential(false);
    } else {
      setIsPotential(true);
    }
  }, [finaceDatas]);
  // setTotalAmount
  useEffect(() => {
    setTotalAmount((amount * 12) / (Percent / 100));
  }, [amount, Percent]);

  // submit data
  const onFinish = async (values) => {
    console.log(values);
    // try {
    //   if (values?.amount !== undefined && isPotential !== undefined) {
    //     dispatch(
    //       postFinanceDatas({
    //         fundId: finaceDatas?.id,
    //         isPotential: isPotential,
    //         result: {
    //           key: "",
    //           value: String(TotalAmount),
    //         },
    //         sumInsured: 1000000,
    //         baseYears: 5,
    //         basePremium: 20000,
    //         investmentRate: 6,
    //         riderPremium: 20000,
    //         topUpPremium: 20000,
    //         topUpYears: 10,
    //         interestRate: {
    //           key: "",
    //           value: String(Percent),
    //         },
    //         expensePerMonth: {
    //           key: "",
    //           value: String(Amount),
    //         },
    //       })
    //     );
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    userSelected
      ? navigate('/advise/financial-solutions/minh-hoa-gia', {
        state: { values: values, total: TotalAmount, typeFund: typeFund, userSelected: userSelected },
      })
      : null;
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    setTotalAmount(0);
    setAmount(0);
    setPercent(0);
  }, []);

  useEffect(() => {
    setPercent(0);
    form.resetFields();
  }, [userSelected?.apptId]);

  useEffect(() => {
    const expensePerYear = amount * 12;
    const fundValue = expensePerYear / Percent;
  }, [amount, TotalAmount, Percent]);

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <div className="container-right-middle">
        <Form.Item
          name="percantage"
          label="Lãi suất ngân hàng"
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
              style={{ width: 65, paddingRight: 0 }}
              value={Percent}
            />
            <span className="pIcon">%</span>
          </div>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Tổng tiền chi tiêu thiết yếu/tháng"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: '120px' }}
            defaultValue={0}
            min={0}
            placeholder="0"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onChange}
          />
        </Form.Item>
      </div>
      <div className="container-right-bottom">
        <p>
          Thông tin quỹ: <span className="total-amount">{TotalAmount > 0 ? formatDataNumber(TotalAmount) : 0}</span>
        </p>
      </div>

      <div className="container-right-submit">
        <Form.Item name="isPotential" valuePropName="checked">
          <Checkbox
            defaultChecked={false}
            // onChange={(e) => setIsPotential(e.target.checked)}
            // type="checkbox"
          >
            Không còn tiềm năng
          </Checkbox>
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
