import { Button, Checkbox, Col, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const ListCalculation = () => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Success:', values);

  }
  return (
    <Col span={16} className="quy_calculation">
      <div className="title">
        <p>Thông tin chi phí</p>
      </div>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Lãi suất ngân hàng"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tổng tiền chi tiêu thiết yếu/tháng"
        >
          <Input />
        </Form.Item>
        <div className="total">
          <p>Thông tin quỹ: <span>40.000.000</span></p>
        </div>

        <div className="checkebox__submit">
          <Form.Item name="remember" valuePropName="checked" >
            <Checkbox>Không còn tiềm năng</Checkbox>
          </Form.Item>

          <Form.Item >
            <Link to="/advise/financial-solutions/minh-hoa-gia">
              <Button type="primary" htmlType="submit" className="btn-primary">
                Bảng minh họa
              </Button>
            </Link>
          </Form.Item>
        </div>
      </Form>

    </Col>
  )
}

export default ListCalculation