import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Form, Input, Row, Button} from "antd";
import {VALIDATE_MESSAGES} from '../../../ultis/constant'

const { TextArea } = Input;

export default function SendSmsContent(props) {
  const {t} = useTranslation();
  const {sendSms, setVisibleModalSms} = props;
  const [form] = Form.useForm();

  return <Form layout="vertical" form={form} validateMessages={VALIDATE_MESSAGES} onFinish={sendSms}>
    <Row gutter={[8, 10]}>
      <Col span={24}>
        <Form.Item
          label="Nội dung SMS"
          name="sms_content"
          rules={[{required: true}]}>
          <TextArea rows={4} placeholder="Nhập" className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item className="footer-modal">
          <Button key="back" className="btn-danger" onClick={() => setVisibleModalSms(false)}>
            {t('common.cancel')}
          </Button>
          <Button key="submit" className="btn-primary" htmlType="submit" type="primary">
            {t('common.create')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}
