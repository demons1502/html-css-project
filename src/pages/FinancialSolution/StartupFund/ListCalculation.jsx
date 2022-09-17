import { Button, Checkbox, Form, Select, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ListCalculation = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;
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
          label="Ngành nghề khởi nghiệp"
          className="input-item"
          rules={[
            {
              required: true,
             
            },
          ]}>
          <Select placeholder="Ăn uống" style={{ width: 152 }}>
            <Option value="value1">Tháng</Option>
            <Option value="value2">Nửa năm</Option>
            <Option value="value3">Năm</Option>
          </Select>
        </Form.Item>
        <Form.Item name="name2" label="Số vốn cần thiết">
          <p className="form-input-text">1,000,000,000</p>
        </Form.Item>

        <Form.Item
          name="name3"
          label="Số năm chuẩn bị"
          rules={[
            {
              required: true,
           
            },
          ]}>
          <Input placeholder="0" type="number" min={0} style={{ width: 40 }} />
        </Form.Item>
        <Form.Item
          name="name4"
          label="Tỷ lệ lạm phát"
          rules={[
            {
              required: true,
           
            },
          ]}>
          <Input placeholder="0" type="text" style={{ width: 40 }} />
        </Form.Item>
      </div>
      <div className="container-right-bottom">
        <p>
          Tổng số tiền cần cho khởi nghiệp:{" "}
          <span className="total-amount">40.000.000</span>
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
