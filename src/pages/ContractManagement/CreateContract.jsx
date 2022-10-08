import { React, useEffect } from 'react';
import { Form, Row, Col, DatePicker, AutoComplete } from 'antd';
import { Button, Select, Input } from "../../components/styles"
import { useDispatch, useSelector } from 'react-redux';
import { createContract, updateContract, getByIdApi } from '../../slices/contractManagement';
import { useTranslation } from 'react-i18next';
import { getCustoms } from '../../slices/contractManagement';
import useFormErrors from '../../hooks/useFormErrors'
import { DEPOSIT_TERM as depositTermOptions, FORMAT_DATE } from '../../ultis/constant';
import {  formatToUtcDate } from '../../helper/index'
import moment from 'moment';
import "../../assets/scss/ContractManagement/createContractStyle.scss"

function CreateContract(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useFormErrors(form);
  const { setVisibleModal, dataEdit } = props
  const customerName = useSelector((state) => state.contractManagement.custom);
  var contractEdit = useSelector((state) => state.contractManagement.dataEdit);
  const refreshData = useSelector((state) => state.contractManagement.refreshData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustoms({ name: '', limit: 10, offset: 0 }));
  }, []);
  var { Option } = AutoComplete;

  const onFinish = (values) => {
    const data = {
      contractNumber: values.contractNumber,
      customerId: +values.customerId,
      beneficiary: values.beneficiary,
      value: Number(values.value.replaceAll(',','')),
      startDate: formatToUtcDate(values.date._d),
      duration: +values.duration,
      depositTerm: +values.depositTerm,
    };

    if (Object.keys(dataEdit).length > 0) {
      dispatch(updateContract({ id: dataEdit.id, data: data }));
    } else {
      dispatch(createContract(data));
    }
  };

  //autoComplete
  const onSearch = (searchText) => {
    dispatch(getCustoms({ name: searchText, limit: 10, offset: 0 }));
  };

  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      dispatch(getByIdApi(dataEdit.id))
    }
  }, [dataEdit])

  useEffect(() => {
    if (Object.keys(contractEdit).length > 0 && Object.keys(dataEdit).length > 0) {
      form.setFieldsValue({ ...contractEdit, ...{
        date: moment.utc(contractEdit.startDate).local()
      } })
    } else {
      form.resetFields();
    }
  }, [contractEdit, dataEdit])

  useEffect(() => {
    if (refreshData) {
      setVisibleModal(false)
    }
  }, [refreshData])

  const formatNumber = (e) => {
    let value = e.target.value.replace(/,/g, '')

    if (!isNaN(value)) {
      const formatter = new Intl.NumberFormat("en-US");

      let formatValue = !!value ? formatter.format(value) : null;
      form.setFieldValue('value', formatValue)
    } else {
      form.setFieldValue('value', e.target.value.slice(0, -1))
    }
  }

  return <Form layout="vertical" form={form} onFinish={onFinish} autoComplete='off' initialValues={dataEdit}>
    <Form.Item
      label='Mã khách hàng'
      name='customerId'
      hidden={true}
    >
      <Input type='number' name="depositTerm"/>
    </Form.Item>
    <Form.Item
      label='Chu kỳ trả phí'
      name='depositTerm'
      rules={[{ required: true }]}
      hidden={true}
    >
      <Input type='number' name="depositTerm"/>
    </Form.Item>
    <Row gutter={[6, 13]}>
      <Col span={6}>
        <Form.Item
          label='Mã số'
          name='contractNumber'
          rules={[{ required: true }]}
        >
          <Input placeholder='Nhập' type='number' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Tên người mua'
          name='customerName'
          rules={[{ required: true }]}
        >
          <AutoComplete
            onSearch={onSearch}
            onSelect={(value, option) => form.setFieldValue('customerId', option.key)}
            dropdownMatchSelectWidth={400}
            placeholder='Nhập'
            className="select-item-outline"
          >
            {customerName?.map((item) => (
              <Option value={item.fullname} key={item.customerId}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{item.fullname}</span>
                  <span>{item.phone1}</span>
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
          rules={[{ required: true }]}
        >
          <Input placeholder='Nhập' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Giá trị'
          name='value'
          rules={[{ required: true },
            ({ getFieldValue }) => ({
              validator(_) {
                if (!!getFieldValue('value') && getFieldValue('value').replace(/,/g, '') < 10000000) {
                  return Promise.reject(new Error('Số tiền tối thiểu là 50.000.000'));
                }
                return Promise.resolve();
              },
            })
          ]}
        >
          <Input onChange={formatNumber} placeholder='Nhập' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Ngày hiệu lực'
          name="date"
          disabledDate={(currentDate) => contractEdit.lastDepositDate && currentDate > moment.utc(contractEdit.lastDepositDate).local()}
          rules={[{ required: true }]}
        >
          <DatePicker className="input-item-outline"
            format={FORMAT_DATE}
            placeholder={FORMAT_DATE} />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Số năm nộp phí'
          name='duration'
          rules={[{ required: true }]}
        >
          <Input placeholder='Nhập' className="input-item-outline" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label='Chu kỳ nộp phí'
          name='depositTermLabel'
          rules={[{ required: true }]}
        >
          <Select className='select-item-outline' placeholder='Chọn' 
            options={depositTermOptions} 
            onChange={(e) => form.setFieldValue('depositTerm', e)}>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item className="footer-modal">
          <Button key="back" className="btn-danger" onClick={() => setVisibleModal(false)} style={{ fontSize: '14px' }}>
            {t('common.cancel')}
          </Button>
          <Button key="submit" htmlType="submit" type="primary" style={{ fontSize: '14px' }}>
            {/* {Object.keys(dataEdit).length > 0 ? t('common.save') : t('common.create')} */}
            Lưu
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}

export default CreateContract;
