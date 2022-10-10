import { Col, Input, message, Modal, Row, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail, sendSMS } from '../../../../slices/dashboard';
import * as S from '../../styles';

export default function CustomerButtonRemind(props) {
  const { t } = useTranslation();
  const type = 'sms';
  const { customerId } = props?.record?.customer || {};
  const [content, setContent] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sendError = useSelector((state) => state.dashboard.error);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSend = () => {
    const payload = {
      type,
      content,
      customerId,
    };
    dispatch(sendSMS(payload));
    if (sendError?.sms?.message) {
      message.error(`Send sms thất bại: ${sendError.sms.message}`);
      return;
    }
    setContent('');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <S.WrapButtonTable>
      <S.Button $type="ghost" onClick={showModal}>
        Nhắc nộp phí
      </S.Button>
      <S.Modal
        title="Send SMS"
        open={isModalOpen}
        footer={[
          <S.Button $width="102px" $height="32px" $color="#FF5855" $type="ghost" key="1" onClick={handleCancel}>
            Hủy
          </S.Button>,
          <S.Button $width="102px" $height="32px" key="2" onClick={handleSend}>
            Send SMS
          </S.Button>,
        ]}
        onCancel={handleCancel}
      >
        <>
          Nội dung SMS
          <TextArea rows={4} value={content} placeholder="Nhập" onChange={onChangeContent} />
        </>
      </S.Modal>
    </S.WrapButtonTable>
  );
}
