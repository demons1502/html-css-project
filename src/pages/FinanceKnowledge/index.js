import { Col, List, message, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import commentIcon from '../../assets/images/icons/comment.svg';
import Title from '../../components/Title';
import {
  getArticlesData,
  mostViewArticles,
} from '../../slices/financeKnowledge';
import { LOADING_STATUS } from '../../ultis/constant';
import FinanceKnowledgeCard from './FinanceKnowledgeCard';

const index = () => {
  const { t } = useTranslation();
  const articlesData = useSelector(
    (state) => state.financeKnowledgeReducer.articlesData
  );
  const mostViewData = useSelector(
    (state) => state.financeKnowledgeReducer.mostViewData
  );
  console.log(articlesData);
  const dispatch = useDispatch();

  //fetch data
  useEffect(() => {
    const params = { limit: 12, offset: 0 };
    dispatch(getArticlesData(params));
    dispatch(mostViewArticles());
  }, []);

  useEffect(() => {
    if (mostViewArticles.loading === LOADING_STATUS.failed) {
      message.error(mostViewArticles?.message);
    }
  }, [mostViewArticles.loading]);

  return (
    <div className='financeKnowledge'>
      <div>
        <Title title={t('finance knowledge.most view')} icon={commentIcon} />
        {mostViewData.loading === LOADING_STATUS.pending ? (
          <Spin size='large' />
        ) : (
          <Row gutter={[10, 10]}>
            <Col lg={8} md={24} sm={24}>
              <Row>
                <FinanceKnowledgeCard
                  content={mostViewData.data[0]}
                  wrap
                  image
                  lg={24}
                />
              </Row>
            </Col>
            <Col lg={16} md={24} sm={24}>
              <Row gutter={[10, 10]} align='stretch' style={{ height: '100%' }}>
                {mostViewData.data?.slice(1)?.map((item) => (
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
        )}
      </div>
      <div>
        <Title title={t('finance knowledge.old articles')} icon={commentIcon} />
        <List
          className='financeKnowledge-list'
          grid={{
            gutter: 10,
            column: 3,
          }}
          dataSource={articlesData.data}
          pagination={{
            pageSize: 12,
            className: 'financeKnowledge-pagination',
            pageSizeOptions: true,
          }}
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
