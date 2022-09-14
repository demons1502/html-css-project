import React from 'react';
import {DatePicker, Select, Checkbox, Col, Form, Input, Row} from "antd";

const { Option } = Select;
const { TextArea } = Input;

export default function AddEventContent(props) {
  const {} = props;
  return <Form layout="vertical">
    <Row gutter={[8, 10]}>
      <Col span={8}>
        <Form.Item
          label="Ngày">
          <DatePicker className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item
          label="Sự kiện">
          <Select defaultValue="lucy" className="select-item-outline">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Mẫu tin SMS">
          <TextArea rows={4} placeholder="Nhập" className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Mẫu nội dung Email">
          <TextArea rows={4} placeholder="Nhập" className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label="Loại">
          <Select defaultValue="lucy" className="select-item-outline">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item className="m-t-30">
          <Checkbox className="checkbox-item">Lưu thành mẫu</Checkbox>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}
