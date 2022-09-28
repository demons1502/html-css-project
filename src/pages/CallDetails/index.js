import { Row, Col, Space } from 'antd';
import React from 'react';
import * as S from './styles';

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
          {/* <Space direction="vertical" size={15}>
            <S.WrapContainer>
              <S.WrapContent $padding="30px">block top</S.WrapContent>
            </S.WrapContainer>
            <S.WrapContainer>
              <S.WrapContent $padding="30px">block bottom</S.WrapContent>
            </S.WrapContainer>
          </Space> */}
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <S.WrapContainer>
                <S.WrapContent $padding="30px">
                  <Space align='center'>
                    <S.WrapText $color={S.gray} $fontSize='13px'>Trang thai:</S.WrapText>
                    <S.WrapText $color={S.green100} $fontSize='18px'>Dang goi</S.WrapText>
                  </Space>
                </S.WrapContent>
              </S.WrapContainer>
            </Col>
            <Col span={24}>
              <S.WrapContainer>
                <S.WrapContent $padding="30px">block bottom</S.WrapContent>
              </S.WrapContainer>
            </Col>
          </Row>
        </Col>
        <Col lg={16} md={24}>
          <S.WrapContainer>
            <S.WrapContent $padding="30px">fthfth</S.WrapContent>
          </S.WrapContainer>
        </Col>
      </Row>
    </div>
  );
}
