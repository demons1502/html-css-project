import { Space } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import * as S from './styles';

export default function CallRecordInfo() {
  const [currentCheck, setCurrentCheck] = useState('1');

  return (
    <div>
      <S.WrapContent $padding="30px">
        <Space direction="vertical" size={15} style={{ width: '100%' }}>
          <Space align="center">
            <S.WrapText $color={S.gray200} $fontSize="13px">
              Trang thai:
            </S.WrapText>
            <S.WrapText $color={S.green100} $fontSize="18px">
              Dang goi
            </S.WrapText>
          </Space>
          <S.WrapContent $padding="15px" $borderColor={S.gray100} $borderRadius="15px" $wFull={true}>
            <Space direction="vertical" size={15} style={{ width: '100%' }}>
              <S.FlexContent $justifyContent="space-between">
                <S.WrapText $fontSize="18px" $fontWeight="bold">
                  Jenny Wilson
                </S.WrapText>
                <Space>
                  <S.WrapBtn $variant="filled">Hoan thanh</S.WrapBtn>
                  <S.WrapBtn $variant="filled" $colorScheme="error">
                    Huy goi
                  </S.WrapBtn>
                </Space>
              </S.FlexContent>
              <S.WrapContent $padding="15px" $borderColor={S.green100} $borderRadius="15px">
                <Space direction="vertical">
                  <Space size={50}>
                    <Space direction="vertical" size={4}>
                      <Space align="center">
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: S.green100 }}></div>
                        <S.WrapText>So dien thoai:</S.WrapText>
                      </Space>
                      <S.WrapText $fontWeight="700" style={{ marginLeft: 12 }}>
                        0906 168 949
                      </S.WrapText>
                    </Space>
                    <Space direction="vertical" size={4}>
                      <Space align="center">
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: S.green100 }}></div>
                        <S.WrapText>Loai khach hang:</S.WrapText>
                      </Space>
                      <S.WrapText $fontWeight="700" style={{ marginLeft: 12 }}>
                        Ca nhan
                      </S.WrapText>
                    </Space>
                  </Space>
                  <Space style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 16, color: S.gray200 }}>
                      <FileDoneOutlined />
                    </div>
                    <S.WrapText>Ghi chu: </S.WrapText>
                    <S.WrapText $fontWeight="700">Da goi dien 2 lan</S.WrapText>
                  </Space>
                </Space>
              </S.WrapContent>
              <Space align="center">
                <S.WrapBtn $variant="outlined" $borderRadius="5px">
                  Dat hen
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px">
                  Khao sat
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px">
                  Tu van
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px">
                  Giai phap
                </S.WrapBtn>
              </Space>
            </Space>
          </S.WrapContent>
          <Space size={40} align="center">
            <S.WrapCheckbox checked={currentCheck === '1'} onChange={() => setCurrentCheck('1')} style={{}}>
              Goi them lan sau
            </S.WrapCheckbox>
            <S.WrapCheckbox checked={currentCheck === '2'} onChange={() => setCurrentCheck('2')}>
              Khong con tiem nang
            </S.WrapCheckbox>
          </Space>
        </Space>
      </S.WrapContent>
    </div>
  );
}
