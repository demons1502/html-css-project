import { Row, Col, Space } from 'antd';
import React from 'react';
import * as S from './styles';

const TEXT_VOICES = [
  'Thưa chị xxxx, Manulife hiện đang có công cụ tài chính đặc biệt giúp khách hàng quản trị tốt vận may và chuyển giao sự thịnh vượng cho thế hệ thứ 2 một cách trọn vẹn.',
  'Thưa chị xxxx, Manulife hiện đang có công cụ tài chính đặc biệt giúp khách hàng quản trị tốt vận may và chuyển giao sự thịnh vượng cho thế hệ thứ 2 một cách trọn vẹn.',
  'Thưa chị xxxx, Manulife hiện đang có công cụ tài chính đặc biệt giúp khách hàng quản trị tốt vận may và chuyển giao sự thịnh vượng cho thế hệ thứ 2 một cách trọn vẹn.',
  'Chính vì thế em muốn chia sẻ những lợi ích này cùng chị và gia đình. Việc khảo sát này chỉ mất khoảng 10 phút mà thôi trừ khi chị muốn tim hieu them thong tin.',
  'Chính vì thế em muốn chia sẻ những lợi ích này cùng chị và gia đình. Việc khảo sát này chỉ mất khoảng 10 phút mà thôi trừ khi chị muốn tim hieu them thong tin.',
];
const CUSTOMER_INFO_SUMARY = [
  '27 tuổi, 1 vợ, 2 con, chưa có nhà, đang làm nghề môi giới chứng khóang.',
  'Thu nhập 62 triệu.',
]

export default function CallDetails() {
  return (
    <div>
      <Space>
        <div>btn</div>
        <S.WrapHeader>
          <h3>{`Goi dien`}</h3>
        </S.WrapHeader>
      </Space>
      <Row gutter={[15, 15]}>
        <Col lg={8} md={24}>
          <Row gutter={[15, 15]} style={{ height: '100%' }}>
            <Col span={24}>
              <S.WrapContainer>
                <S.WrapContent $padding="30px">
                  <Space direction='vertical' size={15} style={{ width: '100%' }}>
                    <Space align='center'>
                      <S.WrapText $color={S.gray200} $fontSize='13px'>Trang thai:</S.WrapText>
                      <S.WrapText $color={S.green100} $fontSize='18px'>Dang goi</S.WrapText>
                    </Space>
                    <S.WrapContent $padding='15px' $borderColor={S.gray100} $borderRadius='15px' $wFull={true}>
                      <Space direction='vertical' size={15} style={{ width: '100%' }}>
                        <S.FlexContent $justifyContent='space-between'>
                          <S.WrapText $fontSize='18px' $fontWeight='bold'>Jenny Wilson</S.WrapText>
                          <Space>
                            <S.WrapBtn $variant='filled'>Hoan thanh</S.WrapBtn>
                            <S.WrapBtn $variant='filled' $colorScheme='error'>Huy goi</S.WrapBtn>
                          </Space>
                        </S.FlexContent>
                        <S.WrapContent $padding='15px' $borderColor={S.green100} $borderRadius='15px'>

                        </S.WrapContent>
                        <Space>
                          <S.WrapBtn $variant='outlined' $borderRadius='5px'>Dat hen</S.WrapBtn>
                          <S.WrapBtn $variant='outlined' $borderRadius='5px'>Khao sat</S.WrapBtn>
                          <S.WrapBtn $variant='outlined' $borderRadius='5px'>Tu van</S.WrapBtn>
                          <S.WrapBtn $variant='outlined' $borderRadius='5px'>Giai phap</S.WrapBtn>
                        </Space>
                      </Space>
                    </S.WrapContent>
                  </Space>
                </S.WrapContent>
              </S.WrapContainer>
            </Col>
            <Col span={24}>
              <S.WrapContainer>
                <S.WrapText $fontSize='16px' $fontWeight='600' $padding='15px 30px'>Thong tin tong hop Khach hang</S.WrapText>
                <Space direction='vertical' size={6} style={{ padding: '15px 30px', borderTop: `1px solid ${S.gray100}` }}>
                  {CUSTOMER_INFO_SUMARY?.map((v, i) => (
                    <Space key={i} align='start'>
                      <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginTop: 8 }}></div>
                      <S.WrapText>{v}</S.WrapText>
                    </Space>
                  ))}
                </Space>
              </S.WrapContainer>
            </Col>
          </Row>
        </Col>
        <Col lg={16} md={24}>
          <S.WrapContainer>
            <S.WrapText $fontSize='18px' $fontWeight='700' $padding='15px 30px'>Loi thoai khi goi dien</S.WrapText>
            <div style={{ padding: '15px 30px', borderTop: `1px solid ${S.gray100}`, borderBottom: `1px solid ${S.gray100}` }}>
              <S.WrapBtn $variant='filled' $width='max-content' $padding='14px 16px' style={{ marginBottom: 12 }}>Loi thoai 1</S.WrapBtn>
              <Space direction='vertical' size={18}>
                {TEXT_VOICES?.map((v, i) => (
                  <Space key={i} align='start'>
                    <div style={{ height: 6, width: 6, background: S.green100, borderRadius: '50%', marginTop: 8 }}></div>
                    <S.WrapText>{v}</S.WrapText>
                  </Space>
                ))}
              </Space>
            </div>
            <div style={{ padding: 30 }}>
              pagelist
            </div>
          </S.WrapContainer>
        </Col>
      </Row>
    </div>
  );
}
