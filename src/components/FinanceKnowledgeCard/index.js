import { EyeOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Col, Image, Layout, Row, Typography } from 'antd';
import React from 'react';

const FinanceSupportCard = (props) => {
  return (
    <Col
      className='gutter-row'
      sm={props.sm || 24}
      md={props.md || 24}
      lg={props.lg || 8}
    >
      <Layout.Content className='content'>
        <a href={props.link} target={props.target || '_blank'} rel='noreferrer'>
          <Row gutter={[10, 0]} align='stretch'>
            {props.image && (
              <Col lg={props.wrap ? 24 : 8} md={24} sm={24} xs={24}>
                <Image
                  src={props.img}
                  preview={false}
                  width={'100%'}
                  height={props.wrap ? '143px' : '100%'}
                  className='image'
                />
              </Col>
            )}

            <Col
              lg={props.wrap ? 24 : props.image ? 16 : 24}
              md={24}
              sm={24}
              xs={24}
            >
              <Row
                gutter={[10, 3]}
                align='middle'
                className={`${props.wrap ? 'row_wrap' : ''}`}
              >
                <Col
                  lg={props.wrap ? 12 : 24}
                  sm={props.wrap ? 12 : 24}
                  xs={24}
                >
                  <Typography.Title
                    level={5}
                    ellipsis={{ rows: 1 }}
                    title={props.title}
                  >
                    {props.title}
                  </Typography.Title>
                </Col>
                <Col
                  lg={props.wrap ? 12 : 24}
                  md={props.wrap ? 12 : 24}
                  sm={props.wrap ? 12 : 24}
                  xs={24}
                >
                  {props.wrap && (
                    <Typography.Text className='icon'>
                      <EyeOutlined /> {props.views}
                    </Typography.Text>
                  )}
                  {props.wrap && <span className='line'>|</span>}
                  <Typography.Text className='icon'>
                    <FieldTimeOutlined /> {props.date}
                  </Typography.Text>
                </Col>
              </Row>
              <Typography.Paragraph ellipsis={{ rows: 2 }} className='text'>
                {props.desc}
              </Typography.Paragraph>
            </Col>
          </Row>
        </a>
      </Layout.Content>
    </Col>
  );
};

export default FinanceSupportCard;
