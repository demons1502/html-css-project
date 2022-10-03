import { Space } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import * as S from './styles';

export default function CallRecordInfo(props) {
  const [currentCheck, setCurrentCheck] = useState('1');
  const { callrecordData, customerData, customerCallData } = props;
  const isCompleted = callrecordData?.completedAt;

  useEffect(() => {
    if (isCompleted) {
      setCurrentCheck(customerData?.isPotential ? '1' : '2');
    }
  }, [isCompleted]);

  const renderNoteStatus = (sttEnum) => {
    switch (sttEnum) {
      case 'NOT_CALL_YET':
        return 'Chưa gọi điện lần nào';
      case 'CALL_1_CALL_2':
        return 'Đã gọi điện 1 lần';
      case 'CALL_N_CALL_N_1':
        return `Đã gọi điện ${customerCallData?.noteCount} lần`;
      default:
        return sttEnum;
    }
  };

  return (
    <div>
      <S.WrapContent $padding="30px">
        <Space direction="vertical" size={15} style={{ width: '100%' }}>
          <Space align="center">
            <S.WrapText $color={S.gray200} $fontSize="13px">
              {`Trạng thái:`}
            </S.WrapText>
            <S.WrapText $color={isCompleted ? S.error : S.green100} $fontSize="18px">
              {isCompleted ? 'Đã kết thúc' : 'Đang gọi'}
            </S.WrapText>
          </Space>
          <S.WrapContent $padding="15px" $borderColor={S.gray100} $borderRadius="15px" $wFull={true}>
            <Space direction="vertical" size={15} style={{ width: '100%' }}>
              <S.FlexContent $justifyContent="space-between">
                <S.WrapText $fontSize="18px" $fontWeight="bold">
                  {customerData?.fullname}
                </S.WrapText>
                <Space>
                  <S.WrapBtn $variant="filled" disabled={isCompleted} onClick={() => console.log('complete')}>
                    {'Hoàn thành'}
                  </S.WrapBtn>
                  <S.WrapBtn $variant="filled" $colorScheme="error" disabled={isCompleted}>
                    {'Hủy gọi'}
                  </S.WrapBtn>
                </Space>
              </S.FlexContent>
              <S.WrapContent $padding="15px" $borderColor={S.green100} $borderRadius="15px">
                <Space direction="vertical">
                  <Space size={44}>
                    <Space direction="vertical" size={4}>
                      <Space align="center">
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: S.green100 }}></div>
                        <S.WrapText>{`Số điện thoại:`}</S.WrapText>
                      </Space>
                      <S.WrapText $fontWeight="700" style={{ marginLeft: 12 }}>
                        {customerData?.phone1}
                      </S.WrapText>
                    </Space>
                    <Space direction="vertical" size={4}>
                      <Space align="center">
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: S.green100 }}></div>
                        <S.WrapText>{`Loại khách hàng:`}</S.WrapText>
                      </Space>
                      <S.WrapText $fontWeight="700" style={{ marginLeft: 12 }}>
                        {[1, 2].includes(customerData?.typeId) ? 'Cá nhân' : 'Doanh nghiệp'}
                      </S.WrapText>
                    </Space>
                  </Space>
                  <Space style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 16, color: S.gray200 }}>
                      <FileDoneOutlined />
                    </div>
                    <S.WrapText>{`Ghi chú:`}</S.WrapText>
                    <S.WrapText $fontWeight="700">{renderNoteStatus(customerData?.status)}</S.WrapText>
                  </Space>
                </Space>
              </S.WrapContent>
              <Space align="center">
                <S.WrapBtn $variant="outlined" $borderRadius="5px" disabled={isCompleted}>
                  {`Đặt hẹn`}
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px" disabled={isCompleted}>
                  {`Khảo sát`}
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px" disabled={isCompleted}>
                  {`Tư vấn`}
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px" disabled={isCompleted}>
                  {`Giải pháp`}
                </S.WrapBtn>
              </Space>
            </Space>
          </S.WrapContent>
          <Space size={40} align="center">
            <S.WrapCheckbox
              checked={currentCheck === '1'}
              disabled={isCompleted}
              onChange={() => setCurrentCheck('1')}
            >
              {`Gọi thêm lần sau`}
            </S.WrapCheckbox>
            <S.WrapCheckbox checked={currentCheck === '2'} disabled={isCompleted} onChange={() => setCurrentCheck('2')}>
              {`Không còn tiềm năng`}
            </S.WrapCheckbox>
          </Space>
        </Space>
      </S.WrapContent>
    </div>
  );
}
