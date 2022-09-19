import React, {useEffect, useState} from 'react';
import {DatePicker, Select, Col, Form, Input, Row, Button} from "antd";
import {VALIDATE_MESSAGES, FORMAT_DATE} from '../../../ultis/constant';
import {useTranslation} from 'react-i18next';
import {getEvents} from '../../../services/events';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

export default function AddEventContent(props) {
  const {t} = useTranslation();
  const {onFinish, detailData , setVisibleModalAddInfo} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(detailData).length > 0) {
      form.setFieldsValue({...detailData, ...{date: moment(detailData.date)}})
    } else {
      form.resetFields()
    }
  }, [detailData])

  return <Form layout="vertical" form={form} validateMessages={VALIDATE_MESSAGES} onFinish={onFinish}>
    <Row gutter={[6, 13]}>
      <Col span={6}>
        <Form.Item
          label={t('common.date')}
          name="date"
          rules={[{required: true}]}>
          <DatePicker className="input-item-outline" format={FORMAT_DATE}/>
        </Form.Item>
      </Col>
      <Col span={18}>
        <Form.Item
          label={t('common.type info')}
          name="info">
          <Select defaultValue={0} className="select-item-outline">
            <Option value={0}>Loại thông tin 1</Option>
            <Option value={1}>Một lần</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24} className="m-b-10">
        <Form.Item
          label={t('common.content')}
          name="content"
          rules={[{required: true}]}>
          <TextArea rows={4} placeholder="Nhập" className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item className="footer-modal">
          <Button key="back" className="btn-danger" onClick={() => setVisibleModalAddInfo(false)}>
            {t('common.cancel create')}
          </Button>
          <Button key="submit" className="btn-primary" htmlType="submit" type="primary">
            {t('common.create new')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}
