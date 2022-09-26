import { React, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  AutoComplete,
} from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContract,
  updateContract,
} from '../../slices/contractManagement';
import {useTranslation} from 'react-i18next';
import { getCustoms } from '../../slices/contractManagement';
import useFormErrors from '../../hooks/useFormErrors'

function CreateContract(props) {
<<<<<<< HEAD
  console.log(props)
  const [name, setName] = useState('');
  const [id, setId] = useState(null);

  const loading = useSelector((state) => state.loading.loading);
=======
  const {t} = useTranslation();
  const [form] = Form.useForm();
  useFormErrors(form);
  const { setVisibleModal, dataEdit } = props
>>>>>>> 0c4b0b4fd2d037ecba8b70733f062a49e18234a0
  const customerName = useSelector((state) => state.contractManagement.custom);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustoms({ name: '', limit: 10, offset: 0 }));
  }, []);

  var { Option } = AutoComplete;

  const onFinish = (values) => {
    const data = {
      contractNumber: values.contractNumber,
      customerId: +id,
      solutionId: +id,
      beneficiary: values.beneficiary,
      value: +values.value,
      startDate: moment(values.startDate._d).format(),
      duration: +values.duration,
      depositTerm: +values.depositTerm,
    };
<<<<<<< HEAD
    if (props.func == 1) {
      dispatch(updateContract({ id: props.data.id, data: data }));
=======
    if (Object.keys(dataEdit).length > 0) {
      dispatch(updateContract({ id: dataEdit.id, data: data }));
>>>>>>> 0c4b0b4fd2d037ecba8b70733f062a49e18234a0
    } else {
      dispatch(createContract(data));
    }
  };
  console.log(loading);

  //autoComplete
  const onSearch = (searchText) => {
    dispatch(getCustoms({ name: searchText, limit: 10, offset: 0 }));
  };

  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      form.setFieldsValue({...dataEdit, ...{date: moment(dataEdit.date)}})
    } else {
      form.resetFields()
    }
  }, [dataEdit])

<<<<<<< HEAD
  return (
    <div className='create_contract'>
      <div className='create_contract_header'>
        <h3>{props.title ? props.title : 'Thêm hợp đồng'}</h3>
      </div>
      <div className='line'></div>
      <div className='create_contract_content'>
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
          autoComplete='off'
=======
  return <Form
    layout="vertical"
    initialValues={{
      remember: true,
    }}
    form={form}
    onFinish={onFinish}
    autoComplete='off'
  >
    <Row gutter={[6, 13]}>
      <Col span={6}>
        <Form.Item
          label='Mã số'
          name='contractNumber'
          rules={[
            {
              required: true,
            },
          ]}
>>>>>>> 0c4b0b4fd2d037ecba8b70733f062a49e18234a0
        >
          <Input placeholder='Nhập' type='number' className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Tên người mua'
          name='customerName'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AutoComplete
            onSearch={onSearch}
            dropdownMatchSelectWidth={400}
            placeholder='Nhập'
            className="select-item-outline"
          >
            {customerName.map((item) => (
              <Option value={item.fullname} key={item.customerId}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
<<<<<<< HEAD
                  {customerName.map((item) => (
                    <Option value={item.fullname} key={item.customerId}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{item.fullname}</span>
                        <span>Phone: {item.phone1}</span>
                      </div>
                    </Option>
                  ))}
                </AutoComplete>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Tên người hưởng'
                name='beneficiary'
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
            </Col>
            <Col span={6}>
              <Form.Item
                label='Giá trị'
                name='value'
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
            </Col>
            <Col span={6}>
              {props.data?.createdAt ? (
                <Form.Item
                  label='Ngày hiệu lực'
                  name='startDate'
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
              ) : (
                <Form.Item
                  label='Ngày hiệu lực'
                  name='startDate'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này.',
                    },
                  ]}
                >
                  <DatePicker placeholder='DD/MM/YYYY' format={'DD/MM/YYYY'} />
                </Form.Item>
              )}
            </Col>
            <Col span={6}>
              <Form.Item
                label='Số năm nộp phí'
                name='duration'
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
            </Col>
            <Col span={6}>
              <Form.Item
                label='Chu kỳ nộp phí'
                name='depositTerm'
                initialValue={props.data?.depositTerm}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này.',
                  },
                ]}
              >
                <Select className='select-before' placeholder='Chọn'>
                  <Option value='30'>Tháng</Option>
                  <Option value='180'>Nửa năm</Option>
                  <Option value='360'>Năm</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className='line'></div>
          <div className='btn_group'>
            <button
              className='btn-danger btn'
              onClick={() => props.handleCloseModalCreate()}
            >
              Huỷ
            </button>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='btn-primary btn'
              >
                {props.data?.btn_submit_text || 'Thêm mới'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
=======
                  <span>{item.fullname}</span>
                  <span>ID: {item.customerId}</span>
                </div>
              </Option>
            ))}
          </AutoComplete>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Tên người hưởng'
          name='beneficiary'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập trường này.',
            },
          ]}
        >
          <Input placeholder='Nhập' className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Giá trị'
          name='value'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập trường này.',
            },
          ]}
        >
          <Input placeholder='Nhập' type='number' className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={6}>
        {props.data?.createdAt ? (
          <Form.Item
            label='Ngày hiệu lực'
            name='startDate'
            initialValue={moment(props.data?.createdAt) || 'DD/MM/YYYY'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập trường này.',
              },
            ]}
          >
            <DatePicker format={'DD/MM/YYYY'} className="input-item-outline"/>
          </Form.Item>
        ) : (
          <Form.Item
            label='Ngày hiệu lực'
            name='startDate'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập trường này.',
              },
            ]}
          >
            <DatePicker placeholder='DD/MM/YYYY' format={'DD/MM/YYYY'} className="input-item-outline"/>
          </Form.Item>
        )}
      </Col>
      <Col span={6}>
        <Form.Item
          label='Số năm nộp phí'
          name='duration'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập trường này.',
            },
          ]}
        >
          <Input placeholder='Nhập' className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Chu kỳ nộp phí'
          name='depositTerm'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập trường này.',
            },
          ]}
        >
          <Select className='select-item-outline' placeholder='Chọn'>
            <Option value='30'>Tháng</Option>
            <Option value='180'>Nửa năm</Option>
            <Option value='360'>Năm</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item className="footer-modal">
          <Button key="back" className="btn-danger" onClick={() => setVisibleModal(false)}>
            {t('common.cancel')}
          </Button>
          <Button key="submit" className="btn-primary" htmlType="submit" type="primary">
            {Object.keys(dataEdit).length > 0 ? t('common.save') : t('common.create')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
>>>>>>> 0c4b0b4fd2d037ecba8b70733f062a49e18234a0
}

export default CreateContract;
