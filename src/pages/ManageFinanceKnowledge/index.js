import { Button, Col, Layout, List, Row, Segmented, Typography } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { finances, options } from '../../assets/fake-data/data';
import IconPlus from '../../assets/images/icons/plus.svg';
import Title from '../../components/Title';
import FinanceKnowledgeContent from './FinanceKnowledgeContent';
import QuestionAnswerContent from './QuestionAnswerContent';

const ManageFinanceKnowledge = () => {
  const [itemContent, setItemContent] = useState({});
  const [option, setOption] = useState(options[0].value);
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
    itemData.id = lastId.id + 1;
    setLists([...lists, itemData]);
  };

  const handleIndex = (index) => {
    const indexS = index >= 10 ? `${index}` : `0${index}`;
    return indexS;
  };

  useEffect(() => {
    setItemContent({});
  }, [option]);

  return (
    <Layout className='manageFinanceKnowledge'>
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
              size='small'
              header={
                <Title
                  title={
                    option !== 'q&a'
                      ? 'Danh sách bài viết'
                      : 'Danh sách câu hỏi'
                  }
                />
              }
              footer={
                <Button
                  type='primary'
                  shape='circle'
                  icon={<img src={IconPlus} alt='' />}
                  onClick={addList}
                >
                  Thêm mới
                </Button>
              }
              dataSource={lists}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => setItemContent(item)}
                  className={`${item === itemContent ? 'active' : ''}`}
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

        <Col lg={17} flex={1}>
          <Layout.Content className='manageContent'>
            {option !== 'q&a' ? (
              <FinanceKnowledgeContent
                content={itemContent}
                onChange={handleChange}
                onUpload={handleFileList}
                fileList={fileList}
              />
            ) : (
              <QuestionAnswerContent
                onChange={handleChange}
                content={itemContent}
              />
            )}

            {/* <List
              size='small'
              header={
                <div className='manageContent-header'>
                  <Title title='Nội dung' />
                  {option === 'q&a' ? (
                    
                  ) : null}
                </div>
              }
              footer={
                <div className='manageContent-footer'>
                  {option !== 'q&a' && (
                    <ManageContentInput
                      onChange={handleChange}
                      name='link'
                      title='Link'
                      value={itemContent.link}
                      placeholder='Nhập link'
                    />
                  )}
                  <div className='manageContent-footer-button'>
                    <Button danger className='btn-cancer'>
                      Hủy
                    </Button>
                    <Button
                      type='primary'
                      className='btn-save'
                      onClick={() => console.log(itemContent)}
                      disabled={buttonState}
                    >
                      Lưu
                    </Button>
                  </div>
                </div>
              }
            >
              <div className='manageContent-container'>
                <ManageContentInput
                  onChange={handleChange}
                  name='title'
                  value={itemContent.title}
                  title='Tiêu đề'
                  placeholder='Nhập nội dung tiêu đề'
                />
                <ManageContentInput
                  input={false}
                  title='Ảnh đại diện: '
                  type='file'
                  onChange={handleFileList}
                  fileList={fileList}
                />
                <ManageContentInput
                  onChange={handleChange}
                  name='desc'
                  value={itemContent.desc}
                  title='Nội dung'
                  textarea
                  input={false}
                  placeholder='HTML Editer'
                />
              </div>
            </List> */}
          </Layout.Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default ManageFinanceKnowledge;
