import { Button, Col, Layout, List, Row, Segmented, Typography } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { finances, options } from '../../assets/fake-data/data';
import IconPlus from '../../assets/images/icons/plus.svg';
import Title from '../../components/Title';
import FinanceKnowledgeContent from './FinanceKnowledgeContent';
import QuestionAnswerContent from './QuestionAnswerContent';
// import PaymentManagement from '../PaymentManagement';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContent,
  deleteContent,
  retrieveData,
  updateContent,
} from '../../slices/managementContent';

const ManageFinanceKnowledge = () => {
  const [itemContent, setItemContent] = useState({});
  const [option, setOption] = useState('articles');
  const [buttonState, setButtonState] = useState(true);
  const [lists, setLists] = useState(finances);
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const contents = useSelector((state) => state.managementContentReducer);

  const handleChange = (e) => {
    setButtonState(false);
    let values;
    const name = e.target.name;
    values = { ...itemContent, [name]: e.target.value };
    setItemContent(values);
  };

  const handleFileList = ({ fileList: newFile }) => {
    setFileList(newFile);
    setItemContent({ ...itemContent, image: newFile });
  };

  const addList = () => {
    const itemData = {
      id: 0,
      title: '',
      img: '',
      date: '20/09/2012',
      desc: 'asd',
      views: 0,
      link: 'link',
    };
    let lastId = _.last(lists);
    itemData.id = lastId?.id ? lastId.id + 1 : 1;
    setLists([...lists, itemData]);
    setItemContent(itemData);
    dispatch(createContent({ option: option, payload: { ...itemData } }));
  };

  const handleIndex = (index) => {
    const indexS = index >= 10 ? `${index}` : `0${index}`;
    return indexS;
  };
  const handleCreate = () => {
    dispatch(createContent({ type: option, payload: { ...itemContent } }));
  };

  const handleDelete = (id) => {
    dispatch(deleteContent({ type: option, id: id }));
  };

  const handleSave = (item) => {
    dispatch(updateContent({ type: option, id: item.id, payload: item }));
  };

  const dataSource = [];
  for (let i = 0; i <= 20; i++) {
    dataSource.push({ ...finances[0], id: i });
  }
  useEffect(() => {
    setItemContent(dataSource[0]);
  }, [option]);
  useEffect(() => {
    //fetch data
    dispatch(retrieveData({ type: option, params: { limit: 10, offset: 0 } }));
  }, [option]);

  return (
    <div className='manageFinanceKnowledge'>
      <div className='manageFinanceKnowledge-nav'>
        <h3>{t('manage content.title')}</h3>
      </div>
      <Layout className='manageFinanceKnowledge-container'>
        <Row gutter={[16, 10]} justify='start' align='stretch'>
          <Col lg={7} md={24} sm={24} xs={24}>
            <Layout.Content>
              <div className='list-option'>
                <Segmented
                  options={options}
                  onChange={(e) => setOption(e)}
                  defaultValue={option}
                  value={option}
                />
              </div>

              <List
                className='manageFinanceKnowledge-container_list'
                size='small'
                pagination={{
                  className: 'manageFinanceKnowledge-pagination',
                  pageSize: 7,
                  showLessItems: true,
                }}
                header={
                  <Title
                    title={
                      option !== 'q&a'
                        ? t('manage content.articles list title')
                        : t('manage content.q&a list title')
                    }
                  />
                }
                footer={
                  <Button
                    type='primary'
                    shape='circle'
                    icon={<img src={IconPlus} alt='' />}
                    onClick={handleCreate}
                    /*  onClick={addList} */
                  >
                    Thêm mới
                  </Button>
                }
                dataSource={dataSource}
                renderItem={(item, index) => (
                  <List.Item
                    onClick={() => setItemContent(item)}
                    className={`${item.id === itemContent.id ? 'active' : ''}`}
                  >
                    <Typography.Text ellipsis>
                      {option !== 'q&a'
                        ? `Bài viết ${handleIndex(index + 1)}: ${item.title}`
                        : `Câu hỏi ${handleIndex(index + 1)}: ${item.title}`}
                    </Typography.Text>
                  </List.Item>
                )}
              />
            </Layout.Content>
          </Col>

          <Col lg={16} flex={1}>
            <Layout.Content className='manageContent'>
              {option !== 'q&a' ? (
                <FinanceKnowledgeContent
                  content={itemContent}
                  onChange={handleChange}
                  onUpload={handleFileList}
                  fileList={fileList}
                  onClick={handleSave}
                />
              ) : (
                <QuestionAnswerContent
                  onChange={handleChange}
                  content={itemContent}
                  onDelete={handleDelete}
                  onSave={handleSave}
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
