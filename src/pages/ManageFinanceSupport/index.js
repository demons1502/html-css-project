import { Button, Col, Layout, List, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { finances } from '../../assets/fake-data/data';
import { PlusOutlined } from '@ant-design/icons';

const ManageFinanceSupport = () => {
  const [item, setItem] = useState({});
  const lists = finances.slice(0, 5);

  return (
    <Layout className='manageFinanceSupport'>
      <Row gutter={[16, 10]} justify='start' align='stretch'>
        <Col lg={6} md={24}>
          <Layout.Content>
            <List
              size='small'
              header={<div className='list-header'>Header</div>}
              footer={
                <Button type='primary' shape='circle' icon={<PlusOutlined />} />
              }
              dataSource={lists}
              renderItem={(item) => (
                <List.Item onClick={() => setItem(item)}>
                  <Typography.Text ellipsis style={{ fontWeight: '700' }}>
                    {item.title}
                  </Typography.Text>
                </List.Item>
              )}
            />
          </Layout.Content>
        </Col>
        <Col lg={18} flex={1}>
          <Layout.Content>
            <List
              size='small'
              header={<div className='list-header'>Header</div>}
              footer={
                <Button type='primary' shape='circle' icon={<PlusOutlined />} />
              }
            >
              {item?.desc}
            </List>
          </Layout.Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default ManageFinanceSupport;
