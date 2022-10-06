import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postFinanceDatas } from "../../../slices/financeSolutions";

const ListCalculation = ({ finaceDatas, typeFund, userSelected }) => {
  const [Percent, setPercent] = useState(0);
  const [Amount, setAmount] = useState(0);
  const [isPotential, setIsPotential] = useState(false);
  const [TotalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // dispatch
  const dispatch = useDispatch();

  // setPercent
  useEffect(() => {
    if (finaceDatas !== "" || finaceDatas !== undefined) {
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
    setTotalAmount((Amount * 12) / (Percent / 100));
  }, [Amount, Percent]);

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
    navigate("/advise/financial-solutions/minh-hoa-gia", {state:{values: values,total:TotalAmount, typeFund:typeFund, userSelected:userSelected}});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(()=>{
    setPercent(0)
    form.resetFields()
  },[userSelected?.apptId])
  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <div className="container-right-middle">
        <Form.Item
          name="percantage"
          label="Lãi suất ngân hàng"
          rules={[
            {
              required: true,
            },
          ]}>
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
          ]}>
          <InputNumber style={{ width: '120px' }}
            defaultValue={0}
            min={0}
            placeholder="0"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Form.Item>
      </div>
      <div className="container-right-bottom">
        <p>
          Thông tin quỹ:{" "}
          <span className="total-amount">
            {TotalAmount > 0 &&
              TotalAmount.toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {(TotalAmount < 1 || isNaN(TotalAmount)) && "00.00"}
          </span>
        </p>
      </div>

      <div className="container-right-submit">
        <Form.Item name="remember"
          valuePropName="checked"
        >
          <Checkbox
            // onChange={(e) => setIsPotential(e.target.checked)}
            defaultChecked={false}
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
