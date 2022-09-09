import { Button, List } from 'antd';
import React from 'react';
import ManageContentInput from '../../components/ManageContentInput';
import Title from '../../components/Title';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const QuestionAnswerContent = (props) => {
  const { onChange, content } = props;

  return (
    <div className='questionAnswerContent'>
      <List
        size='small'
        header={
          <div className='manageContent-header'>
            <Title title='Nội dung' />
            <div className='manageContent-nav'>
              <EditOutlined />
              <DeleteOutlined />
            </div>
          </div>
        }
        footer={
          <div className='manageContent-footer'>
            <div className='manageContent-footer-button'>
              <Button danger className='btn-cancer'>
                Hủy
              </Button>
              <Button
                type='primary'
                className='btn-save'
                onClick={() => console.log(content)}
                /* disabled={buttonState} */
              >
                Lưu
              </Button>
            </div>
          </div>
        }
      >
        <div className='manageContent-container'>
          <ManageContentInput
            name='request'
            onChange={onChange}
            value={content.title}
            title='Câu hỏi'
            placeholder='Nhập nội dung câu hỏi'
            color
          />
          <ManageContentInput
            name='work'
            title='Công việc'
            placeholder='Nhập nội dung công việc'
            onChange={onChange}
          />
        </div>
      </List>
    </div>
  );
};

export default QuestionAnswerContent;
