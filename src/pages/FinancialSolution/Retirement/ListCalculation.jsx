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
          name="name1"
          label="Tuổi hiện tại"
          rules={[
            {
              required: true
            },
          ]}>
          <Input placeholder="0" type="number" style={{ width: 50 }} />
        </Form.Item>
        <Form.Item
          name="name2"
          label="Tuổi nghỉ hưu dự kiến"
          rules={[
            {
              required: true,
              
            },
          ]}>
          <Input placeholder="0" type="number" style={{ width: 50 }} />
        </Form.Item>
        <Form.Item name="name3" label="Thời gian đến tuổi nghỉ hưu còn">
          <p className="form-input-text">28 năm</p>
        </Form.Item>
        <Form.Item
          name="name4"
          label="Số tiền hằng tháng khi nghỉ hưu"
          rules={[
            {
              required: true,
             
            },
          ]}>
          <Input placeholder="0" type="number" style={{ width: 152 }} />
        </Form.Item>

        <Form.Item name="name5" label="Số tiền hằng năm khi nghỉ hưu">
          <p className="form-input-text">96,000,000</p>
        </Form.Item>

        <Form.Item
          name="name6"
          label="Thời gian nghỉ hưu mong muốn"
          rules={[
            {
              required: true,
             
            },
          ]}>
          <Input placeholder="0" type="number" style={{ width: 152 }} />
        </Form.Item>
        <Form.Item
          name="name7"
          label="Số tiền đã có"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input placeholder="0" type="number" style={{ width: 152 }} />
        </Form.Item>
        <Form.Item
          name="name8"
          label="Tỷ lệ lạm phát"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input placeholder="0" type="number" style={{ width: 50 }} />
        </Form.Item>
        <Form.Item
          name="name9"
          label="Tỷ suất sinh lời hằng năm"
          rules={[
            {
              required: true,  
            },
          ]}>
          <Input placeholder="0" type="number" style={{ width: 50 }} />
        </Form.Item>
      </div>
      <div className="container-right-bottom">
        <p className="bottom-para">
          Tổng số tiền cần cho tương lai:
          <span className="total-amount">40.000.000</span>
        </p>

        <p>
          Số tiền còn thiếu khi nghỉ hưu:
          <span className="total-amount">30.000.000</span>
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
