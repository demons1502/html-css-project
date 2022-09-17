import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ListCalculation = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/advise/financial-solutions/minh-hoa-gia");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="container-right-middle">
        <Form.Item
          name="name1"
          label="Lãi suất ngân hàng"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="0" type="text" style={{ width: 40 }} />
        </Form.Item>
        <Form.Item
          name="name2"
          label="Tổng tiền chi tiêu thiết yếu/tháng"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="0" type="number" min={0} style={{ width: 120 }} />
        </Form.Item>
      </div>
      <div className="container-right-bottom">
        <p>
          Thông tin quỹ: <span className="total-amount">40.000.000</span>
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
