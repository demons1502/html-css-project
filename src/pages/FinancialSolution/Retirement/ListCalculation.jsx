import { Button, Card, Checkbox, Col, Form, Input } from "antd";
import React from "react";

const ListCalculation = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
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
      autoComplete="off">
      <div className="container-right-middle">
        <Form.Item
          name="name"
          label="Lãi suất ngân hàng"
          className="input-item"
          rules={[
            {
              required: true,
              message: "Lãi suất ngân.",
            },
          ]}>
          <Input
            placeholder="0"
            type="number"
            className="input-item-search-gary"
          />
        </Form.Item>
        <Form.Item
          name="total"
          label="Tổng tiền chi tiêu thiết yếu/tháng"
          rules={[
            {
              required: true,
              message: "Tổng tiền chi tiêu",
            },
          ]}>
          <Input
            placeholder="0"
            type="number"
            className="input-item-search-gary"
          />
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
