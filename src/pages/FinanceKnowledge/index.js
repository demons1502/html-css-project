import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finances } from '../../assets/fake-data/data';
import commentIcon from '../../assets/images/icons/comment.svg';
import FinanceKnowledgeCard from './FinanceKnowledgeCard';
import Title from '../../components/Title';
import {
  mostViewArticles,
  getArticlesData,
} from '../../slices/financeKnowledge';
import { useTranslation } from 'react-i18next';

const index = () => {
  const { t } = useTranslation();
  const [financeData] = useSelector(
    (state) => state.financeKnowledgeReducer.mostView
  );

  const [topViews, setTopViews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTop = () => {
      /* const dataSort = finances.sort((a, b) => b.views - a.views); */
      const top = finances.slice(0, 4);
      setTopViews(top);
    };
    getTop();
  }, []);
  useEffect(() => {
    //fetch
    const params = { limit: 10, offset: 1 };
    dispatch(mostViewArticles());
    dispatch(getArticlesData(params));
  }, []);

  return (
    <div className='financeSupport'>
      <div>
        <Title
          title={t('finance knowledge.most view')}
          icon={commentIcon}
        ></Title>
        <Row gutter={[10, 10]}>
          <Col lg={8} md={24} sm={24}>
            <Row>
              <FinanceKnowledgeCard {...finances[0]} wrap image lg={24} />
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
        <Title
          title={t('finance knowledge.old articles')}
          icon={commentIcon}
        ></Title>
        <Row justify='start' align='middle'>
          <Col span={24}>
            <Row gutter={[17, 13]}>
              {finances.map((item) => (
                <FinanceKnowledgeCard {...item} key={item.id} lg={8} md={12} />
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default index;
