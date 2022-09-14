import React from 'react';
import {Col, Form, Input, Row} from "antd";

const { TextArea } = Input;

export default function SendSmsContent(props) {
  const {} = props;
  return <Form layout="vertical">
    <Row gutter={[8, 10]}>
      <Col span={24}>
        <Form.Item
          label="Nội dung SMS">
          <TextArea rows={4} placeholder="Nhập" className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Nội dung email">
          <TextArea rows={4} placeholder="Nhập" className="input-item-outline"/>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}
