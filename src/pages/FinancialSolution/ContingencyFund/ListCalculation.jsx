import { Button, Checkbox, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { formatDataNumber } from '../../../helper';
import { postFinanceDatas } from '../../../slices/financeSolutions';
import InputNumber from '../../../components/common/InputNumber';
import Input from '../../../components/common/Input';

const ListCalculation = ({ financeDatas, typeFund, userSelected, setKeywords }) => {
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
    if (financeDatas !== '' || financeDatas !== undefined) {
      setPercent(financeDatas?.illustration?.investmentRate);
    } else {
      setPercent(0);
    }
  }, [financeDatas]);

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
  }, [financeDatas]);
  // setTotalAmount
  useEffect(() => {
    amount && Percent && setTotalAmount((amount * 12) / (Percent / 100));
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
    if (userSelected) {
      dispatch(updateSelectCustomer({total: TotalAmount, typeFund: typeFund, userSelected: userSelected, values:values }))
      dispatch(getCustomerByIdAndType({id:userSelected.customerId, typeId: userSelected.typeId}))
      navigate("/advise/financial-solutions/minh-hoa-gia")
    }
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    setTotalAmount(0);
    setAmount(0);
    // setPercent(0);
  }, []);

  useEffect(() => {
    setPercent(0);
    form.resetFields();
  }, [userSelected?.apptId]);

  useEffect(() => {
    const percent = Percent / 100;
    const expensePerYear = amount * 12;
    const fundValue = expensePerYear && expensePerYear / percent;
    const numOfYear = fundValue && fundValue / expensePerYear;
    const increaseIncomePerYear = expensePerYear && expensePerYear / 0.55;
    setKeywords({
      interestRate: percent,
      expensePerMonth: amount,
      expensePerYear: expensePerYear,
      fundValue: fundValue,
      numOfYear: numOfYear,
      increaseIncomePerYear: increaseIncomePerYear,
    });
  }, [amount, Percent]);

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
              placeholder="Nhap"
              type="text"
              style={{ width: 65}}
              value={Percent}
              size='large'
            />
            <span className="pIcon">%</span>
          </div>
        </Form.Item>
        <Form.Item
          name="total"
          label="Tổng tiền chi tiêu thiết yếu/tháng"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: '120px' }}
            min={0}
            placeholder="0"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onChange}
            controls={false}
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
