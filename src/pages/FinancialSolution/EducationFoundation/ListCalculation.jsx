import { Button, Select, Checkbox, Form, Input, InputNumber } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ListCalculation = () => {
  const [form] = Form.useForm();
  const [annualTuitionFee, setAnnualTuitionFee] = useState(80000000);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [collegeAge, setCollegeAge] = useState(0);
  const [firstChildAge, setFirstChildAge] = useState(0);
  const [firstChildAmount, setFirstChildAmount] = useState(0);
  const [secondChildAge, setSecondChildAge] = useState(0);
  const [secondChildAmount, setSecondChildAmount] = useState(0);
  const [thirdChildAge, setThirdChildAge] = useState(0);
  const [thirdChildAmount, setThirdChildAmount] = useState(0);
  const [fourthChildAge, setFourthChildAge] = useState(0);
  const [fourthChildAmount, setFourthChildAmount] = useState(0);
  const [minusAmount, setMinusAmount] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [grandTotalAmount, setGrandTotalAmount] = useState(0);
  const [payPerMonth, setPayPerMonth] = useState(0)


  // annualTuitionFee
  useEffect(() => { }, []);

  // firstChildAmount
  useEffect(() => {
    let per = inflationRate / 100 + 1;
    let childAge1 = collegeAge - firstChildAge;
    setFirstChildAmount(annualTuitionFee * Math.pow(per, childAge1));
  }, [annualTuitionFee, inflationRate, collegeAge, firstChildAge]);

  // secondChildAmount
  useEffect(() => {
    let per = inflationRate / 100 + 1;
    let childAge2 = collegeAge - secondChildAge;
    setSecondChildAmount(annualTuitionFee * Math.pow(per, childAge2));
  }, [annualTuitionFee, inflationRate, collegeAge, secondChildAge]);

  // setThirdChildAmount
  useEffect(() => {
    let per = inflationRate / 100 + 1;
    let childAge3 = collegeAge - thirdChildAge;
    setThirdChildAmount(annualTuitionFee * Math.pow(per, childAge3));
  }, [annualTuitionFee, inflationRate, collegeAge, thirdChildAge]);

  // setFourthChildAmount
  useEffect(() => {
    let per = inflationRate / 100 + 1;
    let childAge4 = collegeAge - fourthChildAge;
    setFourthChildAmount(annualTuitionFee * Math.pow(per, childAge4));
  }, [annualTuitionFee, inflationRate, collegeAge, fourthChildAge]);

  //setTotalAmount
  useEffect(() => {
    setTotalAmount(
      firstChildAmount +
      secondChildAmount +
      thirdChildAmount +
      fourthChildAmount
    );
  }, [
    firstChildAmount,
    secondChildAmount,
    thirdChildAmount,
    fourthChildAmount,
  ]);

  // setGrandTotalAmount
  useEffect(() => {
    setGrandTotalAmount(totalAmount - minusAmount);
  }, [
    totalAmount,
    minusAmount,
    annualTuitionFee,
    numberOfChildren,
    firstChildAge,
    secondChildAmount,
    thirdChildAmount,
    fourthChildAmount,
    totalAmount,
  ]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // onchange founctions
  const onChange1 = (value) => {
    setMinusAmount(value);
  };
  const onChange = (value) => {
    setAnnualTuitionFee(value);
  };
  const onChange3 = (value) => {
    setPayPerMonth(value)
  }

  const selectChange = (e) => {
    switch (e) {
      case "1":
        form.setFieldValue('tuitionPerYear', 80000000)
        break
      case "2":
        form.setFieldValue('tuitionPerYear', 600000000)
        break;
      case "3":
        break
      default:
        form.setFieldValue('tuitionPerYear', 1000000000)
    }
  }
  const { Option } = Select;
  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      initialValues={{education:1, tuitionPerYear: 80000000, moneyAvailable: 0 }}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <div className="container-right-middle">
        <Form.Item name="education" label="Nền giáo dục" className="input-item" hidden={true}
        >
          <Select placeholder="Công lập"
            style={{ width: 152 }}
            onChange={selectChange}
          >
            <Option value="1">Công lập</Option>
            <Option value="2">Dân lập</Option>
            <Option value="3">Du học</Option>
          </Select>
        </Form.Item>
        <Form.Item name="educationLabel" label="Nền giáo dục" className="input-item"
        >
          <Select placeholder="Công lập"
            style={{ width: 152 }}
            onChange={selectChange}
          >
            <Option value="1">Công lập</Option>
            <Option value="2">Dân lập</Option>
            <Option value="3">Du học</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="tuitionPerYear"
          label="Học phí hằng năm"
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber
            controls={false}
            style={{ width: 152 }}
            placeholder="0"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          name="children"
          label="Số con"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input
            onChange={(e) => setNumberOfChildren(Number(e.target.value))}
            placeholder="0"
            type="number"
            min={0}
            max={4}
            style={{ width: 40 }}
          />
        </Form.Item>
        <Form.Item
          name="collegeAge"
          label="Số tuổi vào đại học"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input
            placeholder="0"
            type="number"
            min={0}
            style={{ width: 40 }}
            onChange={(e) => setCollegeAge(Number(e.target.value))}
          />
        </Form.Item>
        {numberOfChildren > 0 && numberOfChildren < 5 && (
          <Form.Item
            name="ageOfFirstChill"
            label="Tuổi con thứ nhất"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input
              placeholder="0"
              type="number"
              min={0}
              style={{ width: 40 }}
              onChange={(e) => setFirstChildAge(Number(e.target.value))}
            />
          </Form.Item>
        )}
        {numberOfChildren > 1 && numberOfChildren < 5 && (
          <Form.Item
            name="ageOfSecondChill"
            label="Tuổi con thứ 2"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input
              placeholder="0"
              type="number"
              min={0}
              style={{ width: 40 }}
              onChange={(e) => setSecondChildAge(Number(e.target.value))}
            />
          </Form.Item>
        )}
        {numberOfChildren > 2 && numberOfChildren < 5 && (
          <Form.Item
            name="ageOfThirdChill"
            label="Tuổi con thứ 3"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input
              placeholder="0"
              type="number"
              min={0}
              style={{ width: 40 }}
              onChange={(e) => setThirdChildAge(Number(e.target.value))}
            />
          </Form.Item>
        )}
        {numberOfChildren > 3 && numberOfChildren < 5 && (
          <Form.Item
            name="ageOfFourthChill"
            label="Tuổi con thứ 4"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input
              placeholder="0"
              type="number"
              min={0}
              style={{ width: 40 }}
              onChange={(e) => setFourthChildAge(Number(e.target.value))}
            />
          </Form.Item>
        )}
        <Form.Item
          name="yearsInCollege"
          label="Số năm đại học"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input placeholder="0" type="number" min={0} style={{ width: 40 }} />
        </Form.Item>
        <Form.Item
          name="moneyAvailable"
          label="Tổng tiền đã có"
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber
            style={{ width: 152 }}
            initialvalues={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange1}
          />
        </Form.Item>
        <Form.Item
          name="inflationaryRate"
          label="Tỷ lệ lạm phát"
          rules={[
            {
              required: true,
            },
          ]}>
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
          name="profitableRate"
          label="Tỷ suất sinh lời hằng năm"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input placeholder="0" type="text" style={{ width: 40 }} />
        </Form.Item>

        <Form.Item
          name="payPerMonth"
          label="Chi tiêu hàng tháng"
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber controls={false}
            placeholder="0"
            min={0}
            style={{ width: 152 }}
            formatter={(e) =>
              `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(e) => e.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </div>
      <div className="container-right-bottom">
        <p className="bottom-para">
          Tổng số tiền cần cho tương lai:{" "}
          <span className="total-amount">
            {totalAmount > 0 &&
              totalAmount
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {(totalAmount < 1 || isNaN(totalAmount)) && "00.00"}
          </span>
        </p>
        <p>
          Số tiền còn thiếu :{" "}
          <span className="total-amount">
            {grandTotalAmount > 0 &&
              grandTotalAmount
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {(grandTotalAmount < 1 || isNaN(grandTotalAmount)) && "00.00"}
          </span>
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
