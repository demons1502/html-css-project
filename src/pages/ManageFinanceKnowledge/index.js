import { Button, Col, Layout, List, message, notification, Row, Segmented, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import IconPlus from '../../assets/images/icons/plus.svg';
import Pagination from '../../components/common/Pagination';
import ModalConfirm from '../../components/ModalConfirm';
import * as S from '../../components/styles';
import Title from '../../components/Title';
import { uploadFile } from '../../services/manageContent';
import { createContent, deleteContent, retrieveData, updateContent } from '../../slices/managementContent';
import { DEFAULT_SIZE, LOADING_STATUS, MANAGEMENT_CONTENT } from '../../ultis/constant';
import FinanceKnowledge from './FinanceKnowledge';
import FinanceKnowledgeContent from './FinanceKnowledgeContent';
import QuestionAnswerContent from './QuestionAnswerContent';
import QuestionContent from './QuestionContent';

const ManageFinanceKnowledge = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.managementContentReducer);
  const loading = useSelector((state) => state.loading.loading);

  const [option, setOption] = useState('articles');
  const [paginate, setPaginate] = useState({ limit: DEFAULT_SIZE, offset: 0 });
  const [isEdit, setIsEdit] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [id, setId] = useState(null);

  const handleAddNew = () => {
    setAddNew(true);
    setIsEdit(false);
    setId(null);
  };

  const handleChangeOption = (e) => {
    setId(null);
    setOption(e);
  };

  useEffect(() => {}, [id]);

  useEffect(() => {
    //fetch data
    option && dispatch(retrieveData({ type: option, params: paginate }));
  }, [option, contents.isReload, paginate]);

  return (
    <div className="manageFinanceKnowledge">
      <S.PageHeader
        className="site-page-header-responsive"
        backIcon={false}
        onBack={() => window.history.back()}
        title={t('manage content.title')}
      ></S.PageHeader>
      <Layout className="manageFinanceKnowledge-container">
        <Row gutter={[16, 10]} justify="start" align="stretch">
          <Col lg={7} md={24} sm={24} xs={24}>
            <Layout.Content>
              <div className="list-option">
                <Segmented
                  options={MANAGEMENT_CONTENT}
                  onChange={handleChangeOption}
                  defaultValue={option}
                  value={option}
                />
              </div>
              <Spin spinning={loading === LOADING_STATUS.pending}>
                <List
                  className="manageFinanceKnowledge-container_list"
                  size="small"
                  header={
                    <Title
                      title={
                        option !== MANAGEMENT_CONTENT[1].value
                          ? t('manage content.articles list title')
                          : t('manage content.q&a list title')
                      }
                    />
                  }
                  footer={
                    <Button className="btn-add-new " icon={<img src={IconPlus} alt="" />} onClick={handleAddNew}>
                      Thêm mới
                    </Button>
                  }
                  dataSource={contents.data}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => {
                        setId(item?.id);
                        setIsEdit(true);
                        setAddNew(false);
                      }}
                      className={`${item.id === id ? 'active' : ''}`}
                    >
                      <Typography.Text ellipsis>{item.title || item.question}</Typography.Text>
                    </List.Item>
                  )}
                ></List>
              </Spin>
              <Pagination total={contents.count} setPaginate={setPaginate} showSizeChanger={false}></Pagination>
            </Layout.Content>
          </Col>

          <Col xs={16} lg={17} flex={1}>
            <Layout.Content /* className="manageContent" */>
              {option !== MANAGEMENT_CONTENT[1].value ? (
                <FinanceKnowledge
                  id={id}
                  option={option}
                  setId={setId}
                  addNew={addNew}
                  setAddNew={setAddNew}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />
              ) : (
                <QuestionContent
                  id={id}
                  option={option}
                  setId={setId}
                  addNew={addNew}
                  setAddNew={setAddNew}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />
              )}
            </Layout.Content>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default ManageFinanceKnowledge;
