import { Button, Select, Checkbox, Form, Input } from "antd";
import React from "react";

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
        <Form.Item name="name" label="Nền giáo dục" className="input-item">
          <Select className="input-item-search-gary " placeholder="Công lập">
            <Option value="">Tháng</Option>
            <Option value="">Nửa năm</Option>
            <Option value="">Năm</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="total"
          label="Học phí hằng năm"
          rules={[
            {
              required: true,
              message: "Học phí hằng năm",
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
          label="Số con"
          rules={[
            {
              required: true,
              message: "Số con",
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
          label="Số tuổi vào đại học"
          rules={[
            {
              required: true,
              message: "Số tuổi vào đại học",
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
          label="Thời gian nghỉ hưu mong muốn"
          rules={[
            {
              required: true,
              message: "Thời gian nghỉ hưu",
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
          label="Số tiền đã có"
          rules={[
            {
              required: true,
              message: "Số tiền đã có",
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
          Tổng số tiền cần cho tương lai:{" "}
          <span className="total-amount">40.000.000</span>
        </p>
        <p>
          Số tiền còn thiếu : <span className="total-amount">40.000.000</span>
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
