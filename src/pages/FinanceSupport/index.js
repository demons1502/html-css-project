import { Col, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { finances } from '../../assets/fake-data/data';
import FinanceSupportCard from '../../components/FinanceSupportCard/';
import Title from '../../components/Title';

import messageIcon from '../../assets/images/icons/message.svg';
import ManageFinanceSupport from '../ManageFinanceSupport';

const index = () => {
  const [topViews, setTopViews] = useState([]);

  useEffect(() => {
    const getTop = () => {
      const dataSort = finances.sort((a, b) => b.views - a.views);
      const top = dataSort.slice(0, 4);
      setTopViews(top);
    };
    getTop();
  }, []);

  return (
    <Layout className='financeSupport'>
      <Title
        title='Bài viết truy cập nhiều nhất trong tuần'
        icon={messageIcon}
      />
      <Layout.Content>
        <Row gutter={[10, 10]} align='middle'>
          <Col lg={8} md={24} sm={24}>
            <Row>
              <FinanceSupportCard {...finances[0]} wrap image lg={24} />
            </Row>
          </Col>
          <Col lg={16} md={24} sm={24}>
            <Row gutter={[10, 10]}>
              {topViews.map((item) => (
                <FinanceSupportCard
                  {...item}
                  image
                  key={item.id}
                  lg={12}
                  md={12}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Layout.Content>

      <Layout.Content>
        <Title title='Các tin cũ hơn' icon={messageIcon} />
        <Row justify='start' align='middle'>
          <Col span={24}>
            <Row gutter={[17, 13]}>
              {finances.map((item) => (
                <FinanceSupportCard {...item} key={item.id} lg={8} md={12} />
              ))}
            </Row>
          </Col>
        </Row>
      </Layout.Content>
      <ManageFinanceSupport />
    </Layout>
  );
};

export default index;
