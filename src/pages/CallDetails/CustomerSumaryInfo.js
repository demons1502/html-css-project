import React, { useEffect, useState } from 'react';
import { Space, } from 'antd';
// import { CopyOutlined } from '@ant-design/icons';
import * as S from './styles';

import IconFiles from '../../assets/images/icons/files.svg';
import { calculateAge } from '../../helper';

// import { getSpeechScript } from '../../services/customerCalls';

const CUSTOMER_INFO_SUMARY = [
  '27 tuổi, 1 vợ, 2 con, chưa có nhà, đang làm nghề môi giới chứng khóang.',
  'Thu nhập 62 triệu.',
];

export default function CustomerSumaryInfo({ customerData }) {
  const makeCustomerSummaryInfo = () => {
    console.log({ customerData })
  }

  if (!customerData) return null;

  makeCustomerSummaryInfo()

  return (
    <div>
      <Space size={12} style={{ padding: '15px 30px' }}>
        <div style={{ color: S.green100, fontSize: 16 }}>
          {/* <CopyOutlined /> */}
          <img src={IconFiles} alt='' />
        </div>
        <S.WrapText $fontSize="16px" $fontWeight="600">
          {`Thông tin tổng hợp Khách hàng`}
        </S.WrapText>
      </Space>
      <Space direction="vertical" size={6} style={{ padding: '15px 30px', borderTop: `1px solid ${S.gray100}` }}>
        {/* {CUSTOMER_INFO_SUMARY?.map((v, i) => (
          <Space key={i} align="start">
            <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginTop: 8 }}></div>
            <S.WrapText>{v}</S.WrapText>
          </Space>
        ))} */}
        <ul>
          <li style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
            <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginRight: 12 }}></div>
            <p>{calculateAge(customerData.dob)} tuổi, {customerData.maritalStatus == 1 ? ' đã có gia đình' : ' độc thân'}</p>
          </li>
          <li style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
            <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginRight: 12 }}></div>
            <p>{customerData.income > 0 && <li>Thu nhập {customerData.income/1000000} triệu đồng/tháng</li>}</p>
          </li>
          {
            !!customerData.job && (
              <li style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginRight: 12 }}></div>
                <p>Nghề nghiệp <span className="capitalize">{customerData.job}</span></p>
              </li>
            ) 
          }
          {
            !!customerData.concerns && (
              <li style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginRight: 12 }}></div>
                <p>Sở thích <span className="capitalize">{customerData.concerns}</span></p>
              </li>
            )
          }
          {/* {!!lastGift && <li>{lastGift}</li>} */}
          {
            !!customerData.note && (
              <li style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginRight: 12 }}></div>
                <p>Khác: <span className="capitalize">{customerData.note}</span></p>
              </li>
            )
          }
        </ul>
      </Space>
    </div>
  );
}
