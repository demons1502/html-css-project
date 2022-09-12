import React from 'react'
import { Button, Form, Input, Row, Col, Select } from 'antd';
import "../../assets/scss/ContractManagement/createContractStyle.scss"

function CreateContract(props) {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { Option } = Select;

  const handleClose=()=>{
    props.handleCloseModalCreate()
  }

  return (
    <div className='create_contract'>
      <div className="create_contract_header">
        <h3>Thêm hợp đồng</h3>
      </div>
      <div className="create_contract_content">
        <Form
          name='create_contract_form'
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
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="Mã số"
                name="id-contract"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập' type='number'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Tên người mua"
                name="contract-name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập'/>
              </Form.Item>
            </Col><Col span={6}>
              <Form.Item
                label="Tên người hưởng"
                name="contract-beneficiary"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập'/>
              </Form.Item>
            </Col><Col span={6}>
              <Form.Item
                label="Giá trị"
                name="contract-price"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập' type='number'/>
              </Form.Item>
            </Col><Col span={6}>
              <Form.Item
                label="Ngày hiệu lực"
                name="effective_date"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='DD/MM/YYYY' type='date'/>
              </Form.Item>
            </Col><Col span={6}>
              <Form.Item
                label="Số năm nộp phí"
                name="year_payment"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập'/>
              </Form.Item>
            </Col><Col span={6}>
              <Form.Item
                label="Chu kỳ nộp phí"
                name="submission_cycle"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Select defaultValue="Chọn" className="select-before">
                  <Option value="Month">Tháng</Option>
                  <Option value="halfYear">Nửa năm</Option>
                  <Option value="year">Năm</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="line"></div>
          <div className="btn_group">
            <button className='btn-danger btn' onClick={handleClose}>Huỷ</button>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='btn-primary btn'>Thêm mới</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CreateContract
