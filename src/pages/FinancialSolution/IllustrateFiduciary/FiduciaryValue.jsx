import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber } from "antd";

export const FiduciaryValue = ({ nameCustomer, data,setDataToSave }) => {
  const [investmentYear, setInvestmentYear] = useState(20);
  const [percentage, setPercentage] = useState(data?.values?.percantage || 6);
  const [totalOfMoney, setTotalOfMoney] = useState(Math. round(data?.total) || 0);
  const [additionalInvestmentYear, setAdditionalInvestmentYear] = useState(10);

  // console.log("investmentYear", investmentYear);
  // console.log("percentage", percentage);
  // console.log("totalOfMoney", totalOfMoney);
  // console.log("additionalInvestmentYear", additionalInvestmentYear);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(()=>{
    setDataToSave((prev)=>{
      prev.additionalInvestmentYear=additionalInvestmentYear;
      prev.investmentYear=investmentYear;
      prev.percantage=percentage;
      prev.total=totalOfMoney;
      return({
        ...prev
      })
    })
  },[investmentYear,percentage,totalOfMoney,additionalInvestmentYear])
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <table className="minh_table">
        <thead>
          <tr className="table_top">
            <th colSpan={4}>THỜI GIAN ỦY THÁC</th>
            <th>
              <Form.Item name="investment_year">
                <Input
                  style={{ textAlign: 'center', width: 152 }}
                  className="form-input-text"
                  type="number"
                  addonAfter="năm"
                  defaultValue={investmentYear}
                  placeholder="0"
                  onChange={(e) => setInvestmentYear(e.target.value)}
                />
              </Form.Item>
            </th>
            <th rowSpan={2} colSpan={3}>
              <span className="invest_more">đầu tư thêm</span>
            </th>
            <th>Số tiền</th>
            <th>Số năm đầu tư thêm</th>
          </tr>
          <tr className="table_top">
            <th colSpan={4}>Mức tỷ suất đầu tư minh họa</th>
            <th>
              <Form.Item name="percent">
                <Input
                  style={{ textAlign: 'center', width: 152 }}
                  className="form-input-text"
                  type="number"
                  addonAfter="%"
                  defaultValue={percentage}
                  placeholder="0"
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </Form.Item>
            </th>
            <th>
              <Form.Item name="amount_of_money">
                <InputNumber
                  style={{width: 152, height: 37 }}
                  className="form-input-text"
                  defaultValue={totalOfMoney}
                  placeholder="0"
                  step={5000000}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value)=>setTotalOfMoney(value)}
                />
              </Form.Item>
            </th>
            <th>
              <Form.Item name="additional_investment_year">
                <Input
                  style={{ textAlign: 'center', width: 152 }}
                  className="form-input-text"
                  placeholder="0"
                  addonAfter="năm"
                  defaultValue={additionalInvestmentYear}
                  type="number"
                  onChange={(e) => setAdditionalInvestmentYear(e.target.value)}
                />
              </Form.Item>
            </th>
          </tr>
          <tr>
            <th rowSpan={3}>
              <span className="merge-heading"> Tuổi</span>
            </th>
            <th rowSpan={3}>
              <span className="merge-heading"> Năm HĐ</span>
            </th>
            <th rowSpan={3}>
              <span className="merge-heading"> Phí BH cơ bản</span>
            </th>
            <th rowSpan={3}>
              <span className="merge-heading"> Phí BH đóng thêm</span>
            </th>
            <th rowSpan={3}>
              <span className="merge-heading"> Tổng phí BH lũy kế</span>
            </th>
            <th colSpan={4}>
              Mức tỷ suất đầu tư với lãi suất minh họa - Quỹ Tăng Trưởng
            </th>
            <th colSpan={4}>Các kênh đầu tư khác</th>
          </tr>

          <tr>
            <th rowSpan={2}>
              <span className="merge-heading"> GTTK cơ bản</span>
            </th>
            <th rowSpan={2}>
              <span className="merge-heading"> GTTK đóng thêm</span>
            </th>
            <th rowSpan={2}>
              <span className="merge-heading"> GTTK hợp đồng</span>
            </th>
            <th rowSpan={2}>
              <span className="merge-heading"> Giá trị hoàn lại</span>
            </th>
            <th>Ngân hàng</th>
          </tr>
          <tr>
            <th>6.0%</th>
          </tr>
        </thead>

        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
        <tr>
          <td>31</td>
          <td>1</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
          <td>22.711.000</td>
        </tr>
      </table>
    </Form>
  );
};
