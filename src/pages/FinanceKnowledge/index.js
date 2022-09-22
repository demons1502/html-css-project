import { Col, List, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import commentIcon from '../../assets/images/icons/comment.svg';
import Pagination from '../../components/common/Pagination';
import Title from '../../components/Title';
import {
  getArticlesData,
  mostViewArticles,
} from '../../slices/financeKnowledge';
import { DEFAULT_SIZE, LOADING_STATUS } from '../../ultis/constant';
import FinanceKnowledgeCard from './FinanceKnowledgeCard';

const index = () => {
  const [paginate, setPaginate] = useState({
    limit: DEFAULT_SIZE,
    offset: 0,
  });

  const { t } = useTranslation();
  const articlesData = useSelector(
    (state) => state.financeKnowledgeReducer.articlesData
  );
  const mostViewData = useSelector(
    (state) => state.financeKnowledgeReducer.mostViewData
  );
  const loading = useSelector((state) => state.loading.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    const params = paginate;
    dispatch(getArticlesData(params));
    dispatch(mostViewArticles());
  }, [paginate]);

  return (
    <div className='financeKnowledge'>
      <div>
        <Title title={t('finance knowledge.most view')} icon={commentIcon} />
        <Spin spinning={loading === LOADING_STATUS.pending}>
          <Row gutter={[10, 10]}>
            <Col lg={8} md={24} sm={24}>
              <Row>
                <FinanceKnowledgeCard
                  content={mostViewData && mostViewData[0]}
                  wrap
                  lg={24}
                />
              </Row>
            </Col>
            <Col lg={16} md={24} sm={24}>
              <Row gutter={[10, 10]} align='stretch' style={{ height: '100%' }}>
                {mostViewData.slice(1)?.map((item) => (
                  <FinanceKnowledgeCard
                    content={item}
                    key={item.id}
                    lg={12}
                    md={12}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Spin>
      </div>
      <div>
        <Title title={t('finance knowledge.old articles')} icon={commentIcon} />
        <Spin spinning={loading === LOADING_STATUS.pending}>
          <List
            className='financeKnowledge-list'
            grid={{
              gutter: 10,
              xxl: 3,
              xl: 3,
              lg: 3,
              md: 2,
            }}
            dataSource={articlesData.articles}
            // pagination={{
            //   pageSize: 12,
            //   className: 'financeKnowledge-pagination',
            //   pageSizeOptions: true,
            // }}
            renderItem={(item) => (
              <List.Item>
                <FinanceKnowledgeCard
                  content={item}
                  key={item.id}
                  lg={24}
                  showImage={false}
                />
              </List.Item>
            )}
          ></List>
          <Pagination
            total={articlesData.articlesCount}
            setPaginate={setPaginate}
            showSizeChanger={false}
          ></Pagination>
        </Spin>
      </div>
    </div>
  );
};

export default index;
