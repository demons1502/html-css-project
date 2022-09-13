import {Col, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {finances} from '../../assets/fake-data/data';
import FinanceKnowledgeCard from '../../components/FinanceKnowledgeCard';
import Title from '../../components/Title'
import commentIcon from '../../assets/images/icons/comment.svg';

const index = () => {
  const [topViews, setTopViews] = useState([]);

  useEffect(() => {
    const getTop = () => {
      /* const dataSort = finances.sort((a, b) => b.views - a.views); */
      const top = finances.slice(0, 4);
      setTopViews(top);
    };
    getTop();
  }, []);

  return (
    <div className='financeSupport'>
      <div>
        <Title title="Bài viết truy cập nhiều nhất trong tuần" icon={commentIcon}></Title>
        <Row gutter={[10, 10]}>
          <Col lg={8} md={24} sm={24}>
            <Row>
              <FinanceKnowledgeCard {...finances[0]} wrap image lg={24}/>
            </Row>
          </Col>
          <Col lg={16} md={24} sm={24}>
            <Row gutter={[10, 10]} align='stretch'>
              {topViews.map((item) => (
                <FinanceKnowledgeCard
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
      </div>
      <div>
        <Title title="Các tin cũ hơn" icon={commentIcon}></Title>
        <Row justify='start' align='middle'>
          <Col span={24}>
            <Row gutter={[17, 13]}>
              {finances.map((item) => (
                <FinanceKnowledgeCard {...item} key={item.id} lg={8} md={12}/>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default index;
