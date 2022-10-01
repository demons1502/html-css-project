import { Row, Col, Space, Checkbox } from 'antd';
import { LeftOutlined, RightOutlined, CopyOutlined, FileDoneOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { Link, useParams } from 'react-router-dom';

import { getCustomerCallById } from '../../services/customerCalls';
import CallRecordInfo from './CallRecordInfo';
import CustomerSumaryInfo from './CustomerSumaryInfo';
import CustomerVoiceCall from './CustomerVoiceCall';


export default function CallDetails() {
  const [currentCheck, setCurrentCheck] = useState('');
  const { ...params } = useParams();
  console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerCall = await getCustomerCallById(1);
        console.log('customerCall api', customerCall);
      } catch (error) {
        console.log('customerCall api err', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Space align="center" size={14} style={{ padding: '16px 0' }}>
        <Link to="/dashboard">
          <S.BtnIcon>
            <LeftOutlined />
          </S.BtnIcon>
        </Link>
        <S.WrapHeader>
          <h3>{`Goi dien`}</h3>
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
                <CustomerSumaryInfo />
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
