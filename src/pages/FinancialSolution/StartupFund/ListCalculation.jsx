import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from 'react-router-dom'

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
          label="Tuổi hiện tại"
          className="input-item"
          rules={[
            {
              required: true,
              message: "Tuổi hiện tại.",
            },
          ]}>
          <Input
            placeholder="0"
            type="number"
            className="input-item-search-gary "
          />
        </Form.Item>
        <Form.Item
          name="total"
          label="Tuổi nghỉ hưu dự kiến"
          rules={[
            {
              required: true,
              message: "Tuổi nghỉ hưu dự kiến",
            },
          ]}>
          <Input
            placeholder="0"
            type="number"
            className="input-item-search-gary"
          />
        </Form.Item>
        <Form.Item name="total" label="Thời gian đến tuổi nghỉ hưu còn">
          <span className="input-right">28 năm</span>
        </Form.Item>
        <Form.Item
          name="total"
          label="Số tiền hằng tháng khi nghỉ hưu"
          rules={[
            {
              required: true,
              message: "Số tiền hằng tháng",
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
          label="Số tiền hằng tháng khi nghỉ hưu"
          rules={[
            {
              required: true,
              message: "Số tiền hằng tháng",
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
          Số tiền còn thiếu khi nghỉ hưu:{" "}
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

        {/* <Form.Item >
            <Link to="/advise/financial-solutions/minh-hoa-gia">
              <Button type="primary" htmlType="submit" className="btn-primary">
                Bảng minh họa
              </Button>
            </Link>
          </Form.Item> */}
      </div>
    </Form>
  );
};

export default ListCalculation;
