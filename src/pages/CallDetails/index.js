import { Row, Col, Space, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './styles';
import { Link, useParams } from 'react-router-dom';

import CallRecordInfo from './CallRecordInfo';
import CustomerSummaryInfo from './CustomerSummaryInfo';
import CustomerVoiceCall from './CustomerVoiceCall';
import { getCustomerCallsData } from '../../slices/customerCall';


export default function CallDetails() {
  const params = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { callRecord } = useSelector(state => state.customerCall);

  const fetchCustomerCallData = async () => {
    dispatch(getCustomerCallsData(params.customerCallId || 0)).then(({ error }) => {
      if (error) {
        message.error(t('common.call-data-error'))
      }
    });
  }

  useEffect(() => {
    fetchCustomerCallData();
  }, []);


  if (!callRecord)
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 300 }}>
        <S.WrapText $color={S.gray200}>{t('call-schedule.no-call')}</S.WrapText>
      </div>
    )

  return (
    <div>
      <Space align="center" size={14} style={{ padding: '16px 0' }}>
        <Link to="/dashboard">
          <S.BtnIcon>
            <LeftOutlined />
          </S.BtnIcon>
        </Link>
        <S.WrapHeader>
          <h3>{t('call-schedule.call')}</h3>
        </S.WrapHeader>
      </Space>
      <Row gutter={[15, 15]}>
        <Col lg={8} md={24}>
          <Row gutter={[15, 15]} style={{ height: '100%' }}>
            <Col span={24}>
              <S.WrapContainer>
                <CallRecordInfo />
              </S.WrapContainer>
            </Col>
            <Col span={24}>
              <S.WrapContainer>
                <CustomerSummaryInfo />
              </S.WrapContainer>
            </Col>
          </Row>
        </Col>
        <Col lg={16} md={24}>
          <S.WrapContainer>
            <CustomerVoiceCall />
          </S.WrapContainer>
        </Col>
      </Row>
    </div>
  );
}
