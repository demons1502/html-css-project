import { Col, Input, Modal, Row, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { sendEmail, sendSMS } from '../../../../slices/dashboard';
import * as S from '../../styles';

export default function CustomerButtonRemind(props) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [type, setType] = useState();
  const [content, setContent] = useState();
  const [titleEmail, setTitleEmail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { customerId } = props?.record?.customer || {};

  const showModal = (value) => {
    setIsModalOpen(true);
    setTitle(value);
    setType(value === 'Send SMS' ? 'sms' : 'mail');
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeTitleEmail = (e) => {
    setTitleEmail(e.target.value);
  };

  const handleSend = () => {
    let payload = {};
    switch (type) {
      case 'sms':
        payload = {
          type,
          content,
          customerId,
        };
        dispatch(sendSMS(payload));
        setIsModalOpen(false);
        break;
      case 'mail':
        payload = {
          type,
          title,
          content,
          customerId,
        };
        dispatch(sendEmail(payload));
        setIsModalOpen(false);
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <S.WrapButtonTable>
      <Tooltip
        placement="leftTop"
        color="#fff"
        overlayInnerStyle={{ borderRadius: '15px' }}
        title={
          <Row gutter={5}>
            <Col>
              <S.Button onClick={() => showModal('Send SMS')} $type="disable">
                Send SMS
              </S.Button>
            </Col>
            <Col>
              <S.Button onClick={() => showModal('Send Email')} $type="disable">
                Send Email
              </S.Button>
            </Col>
          </Row>
        }
      >
        <S.Button $type="ghost">Nhắc nộp phí</S.Button>
      </Tooltip>
      <S.Modal
        title={title}
        open={isModalOpen}
        footer={[
          <S.Button $width="102px" $height="32px" $color="#FF5855" $type="ghost" key="1" onClick={handleCancel}>
            Hủy
          </S.Button>,
          <S.Button $width="102px" $height="32px" key="2" onClick={handleSend}>
            {title}
          </S.Button>,
        ]}
        onCancel={handleCancel}
      >
        {title === 'Send SMS' ? (
          <>
            Nội dung SMS
            <TextArea rows={4} placeholder="Nhập" onChange={onChangeContent} />
          </>
        ) : (
          <>
            Tiêu đề mail
            <Input placeholder="Nhập" onChange={onChangeTitleEmail} />
            Mẫu nội dung email
            <TextArea rows={4} placeholder="Nhập" onChange={onChangeContent} />
          </>
        )}
      </S.Modal>
    </S.WrapButtonTable>
  );
}
