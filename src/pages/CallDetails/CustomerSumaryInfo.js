import React, { useEffect, useState } from 'react';
import { Space, } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import * as S from './styles';

const CUSTOMER_INFO_SUMARY = [
  '27 tuổi, 1 vợ, 2 con, chưa có nhà, đang làm nghề môi giới chứng khóang.',
  'Thu nhập 62 triệu.',
];

export default function CustomerSumaryInfo() {
  return (
    <div>
      <Space size={12} style={{ padding: '15px 30px' }}>
        <div style={{ color: S.green100, fontSize: 16 }}>
          <CopyOutlined />
        </div>
        <S.WrapText $fontSize="16px" $fontWeight="600">
          Thong tin tong hop Khach hang
        </S.WrapText>
      </Space>
      <Space direction="vertical" size={6} style={{ padding: '15px 30px', borderTop: `1px solid ${S.gray100}` }}>
        {CUSTOMER_INFO_SUMARY?.map((v, i) => (
          <Space key={i} align="start">
            <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginTop: 8 }}></div>
            <S.WrapText>{v}</S.WrapText>
          </Space>
        ))}
      </Space>
    </div>
  );
}
