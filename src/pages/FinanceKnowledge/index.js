import { Col, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { finances } from '../../assets/fake-data/data';
import commentIcon from '../../assets/images/icons/comment.svg';
import Title from '../../components/Title';
import {
  getArticlesData, mostViewArticles
} from '../../slices/financeKnowledge';
import FinanceKnowledgeCard from './FinanceKnowledgeCard';

const index = () => {
  const { t } = useTranslation();
  const data = useSelector((state) => state.financeKnowledgeReducer.articlesData);

  const [topViews, setTopViews] = useState([]);
  const dispatch = useDispatch();

  const dataSource = [];
  for (let i = 0; i < 50; i++) {
    dataSource.push({ ...finances[0], id: i });
  }

  useEffect(() => {
    const getTop = () => {
      const top = finances.slice(0, 4);
      setTopViews(top);
    };
    getTop();
  }, []);

  //fetch data
  useEffect(() => {
    const params = { limit: 12, offset: 0 };
    dispatch(mostViewArticles());
    dispatch(getArticlesData(params));
  }, []);

  return (
    <div className='financeKnowledge'>
      <div>
        <Title title={t('finance knowledge.most view')} icon={commentIcon} />
        <Row gutter={[10, 10]}>
          <Col lg={8} md={24} sm={24}>
            <Row>
              <FinanceKnowledgeCard content={finances[0]} wrap image lg={24} />
            </Row>
          </Col>
          <Col lg={16} md={24} sm={24}>
            <Row gutter={[10, 10]} align='stretch' style={{ height: '100%' }}>
              {topViews.map((item) => (
                <FinanceKnowledgeCard
                  content={item}
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
        <Title title={t('finance knowledge.old articles')} icon={commentIcon} />
        <List
          className='financeKnowledge-list'
          grid={{
            gutter: 10,
            column: 3,
          }}
          dataSource={data.articles}
          pagination={{ pageSize: 12, className: 'financeKnowledge-pagination', pageSizeOptions: true }}
          renderItem={(item) => (
            <List.Item>
              <FinanceKnowledgeCard content={item} key={item.id} lg={24} />
            </List.Item>
          )}
        />

      </div>
    </div>
  );
};

export default index;
