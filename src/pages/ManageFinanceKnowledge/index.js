import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Layout, List, Row, Segmented, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { finances, requests } from '../../assets/fake-data/data';
import ManageContentInput from '../../components/ManageContentInput';
import Title from '../../components/Title';

const ManageFinanceKnowledge = () => {
  const [itemContent, setItemContent] = useState({});
  const [option, setOption] = useState('kiến thức tài chính');

  const lists = finances.slice(0, 5);
  console.log(itemContent);
  const handleChange = (e) => {
    let values;
    if (!e.file) {
      const name = e.target.name;
      values = { ...itemContent, [name]: e.target.value };
    } else {
      values = { ...itemContent, image: e.file.name };
    }
    setItemContent(values);
  };

  useEffect(() => {
    setItemContent({});
  }, [option]);

  return (
    <Layout className='manageFinanceKnowledge'>
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
          <Layout.Content className='manageContent'>
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
                <div className='manageContent-footer'>
                  {option !== 'hỏi đáp' && (
                    <ManageContentInput
                      onChange={handleChange}
                      name='link'
                      title='Link'
                    />
                  )}
                  <div className='manageContent-button'>
                    <Button type='' danger>
                      Hủy
                    </Button>
                    <Button type='primary'>Lưu</Button>
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
                />
                <ManageContentInput
                  input={false}
                  title='Ảnh đại diện: '
                  type='file'
                  onChange={handleChange}
                />
                <ManageContentInput
                  onChange={handleChange}
                  name='content'
                  value={itemContent.desc}
                  title='Nội dung'
                  textarea
                  input={false}
                />
              </div>
            </List>
          </Layout.Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default ManageFinanceKnowledge;
