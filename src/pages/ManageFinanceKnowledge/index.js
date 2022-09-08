import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Layout, List, Row, Segmented, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { finances, requests } from '../../assets/fake-data/data';
import ManageContentInput from '../../components/ManageContentInput';
import Title from '../../components/Title';

const ManageFinanceKnowledge = () => {
  const [itemContent, setItemContent] = useState({});
  const [data, setData] = useState({});
  const [option, setOption] = useState('kiến thức tài chính');

  const lists = finances.slice(0, 5);

  const handleChange = (e) => {
    let values;
    if (!e.file) {
      const name = e.target.name;
      values = { ...data, [name]: e.target.value };
    } else {
      values = { ...data };
    }
    setData(values);
  };

  useEffect(() => {
    setItemContent(lists[0]);
  }, [option]);

  return (
    <Layout className='manageFinanceSupport'>
      <Row gutter={[16, 10]} justify='start' align='stretch'>
        <Col lg={6} md={24} sm={24} xs={24}>
          <Layout.Content>
            <div className='list-option'>
              <Segmented
                options={['kiến thức tài chính', 'hỏi đáp']}
                onChange={(e) => setOption(e)}
                defaultValue='kiến thức tài chính'
                value={option}
              />
            </div>
            {option !== 'hỏi đáp' ? (
              <List
                size='small'
                header={<Title title='Danh sách bài viết' />}
                footer={
                  <Button
                    type='primary'
                    shape='circle'
                    icon={<PlusOutlined />}
                  />
                }
                dataSource={lists}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => setItemContent(item)}
                    className={`${item === itemContent ? 'active' : ''}`}
                  >
                    <Typography.Text ellipsis>{item.title}</Typography.Text>
                  </List.Item>
                )}
              />
            ) : (
              <List
                size='small'
                header={<Title title='Danh sách câu hỏi' />}
                footer={
                  <Button
                    type='primary'
                    shape='circle'
                    icon={<PlusOutlined />}
                  />
                }
                dataSource={requests}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => setItemContent(item)}
                    className={`${item === itemContent ? 'active' : ''}`}
                  >
                    <Typography.Text ellipsis>{item.title}</Typography.Text>
                  </List.Item>
                )}
              />
            )}
          </Layout.Content>
        </Col>

        <Col lg={18} flex={1}>
          <Layout.Content>
            <List
              size='small'
              header={
                <div className='manageContent-header'>
                  <Title title='Nội dung' />
                  {option === 'hỏi đáp' ? (
                    <div className='manageContent-nav'>
                      <EditOutlined />
                      <DeleteOutlined />
                    </div>
                  ) : null}
                </div>
              }
              footer={
                <div className='manageContentFooter'>
                  <Button
                    type='primary'
                    shape='circle'
                    icon={<PlusOutlined />}
                  />
                </div>
              }
            >
              <div className='manageContent-container'>
                <ManageContentInput onChange={handleChange} name='title' />
                <ManageContentInput
                  input={false}
                  title='Ảnh đại diện: '
                  type='file'
                />
                <ManageContentInput onChange={handleChange} name='content' />
              </div>
            </List>
          </Layout.Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default ManageFinanceKnowledge;
