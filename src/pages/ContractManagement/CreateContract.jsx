import { React, useEffect, useState } from 'react'
import { Button, Form, Input, Row, Col, Select, DatePicker, AutoComplete } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createContract, updateContract, setRefresh } from '../../slices/contractManagement';
import { getCustoms } from '../../slices/contractManagement';
import "../../assets/scss/ContractManagement/createContractStyle.scss"

function CreateContract(props) {
  const customerName=useSelector((state) => state.contractManagement.custom)
  const [optionCustomerName, setOptionCustomerName]= useState(customerName)
  const dispatch = useDispatch()
  const autoCompleteChange = (e)=>{
    dispatch(getCustoms({name:e,limit:10,offset:0}))
  }
  const onFinish = (values) => {
    const data = {
      "contractNumber": values.contractNumber,
      "customerId": 1,                       // custom id get in custom api
      "customerName": values.customerName,
      "beneficiary": values.beneficiary,
      "value": Number(values.value),
      "startDate":moment(values.startDate),
      "duration": Number(values.duration),
      "depositTerm": Number(values.depositTerm),
      "makeFirstDeposit": true,
      "depositValue": 123,
      "depositNote": "dasdas",
      "insured": "sadasd"
    }
    if(props.func == 'edit'){
      dispatch(updateContract({id:props.data.id,data:data}))
    }else{
      dispatch(createContract(data))
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>
          {count}
        </span>
      </div>
    ),
  });
  const { Option } = Select;
  var options
  useEffect(()=>{
    options=[
      {
        options: [optionCustomerName.map(item=>{
          return item.fullname, item.customerId})
        ]
      }
    ]
    
    
    console.log(options[0]);
  },[optionCustomerName])

  return (
    <div className='create_contract'>
      <div className="create_contract_header">
        <h3>{props.data?.title ? props.data.title : 'Thêm hợp đồng'}</h3>
      </div>
      <div className="line"></div>
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
          <Row gutter={[16, 0]}>
            <Col span={6}>
              <Form.Item
                label="Mã số"
                name="contractNumber"
                initialValue={props.data?.contractNumber || null}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập' type='number' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Tên người mua"
                name="customerName"
                initialValue={props.data?.customerName || null}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <AutoComplete
                  onChange={autoCompleteChange}
                  popupClassName="certain-category-search-dropdown"
                  dropdownMatchSelectWidth={500}
                  style={{
                    width: 250,
                  }}
                  options= {options}
                >
                </AutoComplete>
              </Form.Item>
            </Col><Col span={6}>
              <Form.Item
                label="Tên người hưởng"
                name="beneficiary"
                initialValue={props.data?.beneficiary || null}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập' />
              </Form.Item>
            </Col><Col span={6}>
              <Form.Item
                label="Giá trị"
                name="value"
                initialValue={props.data?.value || null}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập' type='number' />
              </Form.Item>
            </Col><Col span={6}>
              {
                props.data?.createdAt ?
                  <Form.Item
                    label="Ngày hiệu lực"
                    name="startDate"
                    initialValue={moment(props.data?.createdAt) || 'DD/MM/YYYY'}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập trường này.',
                      },
                    ]}
                  >
                    <DatePicker format={'DD/MM/YYYY'} />
                  </Form.Item>
                  :
                  <Form.Item
                    label="Ngày hiệu lực"
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập trường này.',
                      },
                    ]}
                  >
                    <DatePicker placeholder='DD/MM/YYYY' format={'DD/MM/YYYY'} />
                  </Form.Item>
              }

            </Col><Col span={6}>
              <Form.Item
                label="Số năm nộp phí"
                name="duration"
                initialValue={props.data?.duration || null}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Input placeholder='Nhập' />
              </Form.Item>
            </Col><Col span={6}>
              <Form.Item
                label="Chu kỳ nộp phí"
                name="depositTerm"
                initialValue={props.data?.depositTerm}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Select className="select-before" placeholder='Chọn'>
                  <Option value="30">Tháng</Option>
                  <Option value="180">Nửa năm</Option>
                  <Option value="360">Năm</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="line"></div>
          <div className="btn_group">
            <button className='btn-danger btn' onClick={() => props.handleCloseModalCreate()}>Huỷ</button>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='btn-primary btn'>{props.data?.btn_submit_text || 'Thêm mới'}</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CreateContract
