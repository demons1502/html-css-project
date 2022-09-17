import React, { useState } from "react";
import { Form, Input } from "antd";
export const MinhHoaGiaTri = () => {
  const [investmentYear, setInvestmentYear] = useState("");
  const [percentage, setPercentage] = useState("");
  const [amountOfMoney, setAmountOfMoney] = useState("");
  const [additionalInvestmentYear, setAdditionalInvestmentYear] = useState("");

  // console.log("investmentYear", investmentYear);
  // console.log("percentage", percentage);
  // console.log("amountOfMoney", amountOfMoney);
  // console.log("additionalInvestmentYear", additionalInvestmentYear);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
        <tr className="table_top">
          <th colSpan={4}>Thời gian ủy thác</th>
          <th>
            <Form.Item name="investment_year">
              <Input
                className="table__input"
                onChange={(e) => setInvestmentYear(e.target.value)}
              />
            </Form.Item>
          </th>
          <th rowSpan={2} colSpan={3}>
            đầu tư thêm
          </th>
          <th>Số tiền</th>
          <th>Số năm đầu tư thêm</th>
        </tr>
        <tr className="table_top">
          <th colSpan={4}>Mức tỷ suất đầu tư minh họa</th>
          <th>
            <Form.Item name="percent">
              <Input
                className="table__input"
                onChange={(e) => setPercentage(e.target.value)}
              />
            </Form.Item>
          </th>
          <th>
            <Form.Item name="amount_of_money">
              <Input
                className="table__input"
                onChange={(e) => setAmountOfMoney(e.target.value)}
              />
            </Form.Item>
          </th>
          <th>
            <Form.Item name="additional_investment_year">
              <Input
                className="table__input"
                onChange={(e) => setAdditionalInvestmentYear(e.target.value)}
              />
            </Form.Item>
          </th>
        </tr>
        <tr>
          <th rowSpan={2}>Tuổi</th>
          <th rowSpan={2}>Năm HĐ</th>
          <th rowSpan={2}>Phí BH cơ bản</th>
          <th rowSpan={2}>Phí BH đóng thêm</th>
          <th rowSpan={2}>Tổng phí BH lũy kế</th>
          <th colSpan={4}>
            Mức tỷ suất đầu tư với lãi suất minh họa - Quỹ Tăng Trưởng
          </th>
          <th colSpan={4}>Các kênh đầu tư khác</th>
        </tr>

        <tr>
          <th>GTTK cơ bản</th>
          <th>GTTK đóng thêm</th>
          <th>GTTK hợp đồng</th>
          <th>Giá trị hoàn lại</th>
          <th>Ngân hàng</th>
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
