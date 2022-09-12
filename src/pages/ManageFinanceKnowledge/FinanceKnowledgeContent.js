import { Button, List } from 'antd';
import React from 'react';
import ManageContentInput from '../../components/ManageContentInput';
import Title from '../../components/Title';

const FinanceKnowledgeContent = (props) => {
  const { content, onChange, onUpload, fileList, onClick } = props;

  return (
    <div className='financeKnowledgeContent'>
      <List
        size='small'
        header={
          <div className='manageContent-header'>
            <Title title='Nội dung' />
          </div>
        }
        footer={
          <div className='manageContent-footer'>
            <ManageContentInput
              onChange={onChange}
              name='link'
              title='Link'
              value={content?.link}
              placeholder='Nhập link'
            />
            <div className='manageContent-footer-button'>
              <Button danger className='btn-cancer'>
                Hủy
              </Button>
              <Button
                type='primary'
                className='btn-save'
                onClick={() => onClick(content.id)}
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
            onChange={onChange}
            name='title'
            value={content?.title}
            title='Tiêu đề'
            placeholder='Nhập nội dung tiêu đề'
          />
          <ManageContentInput
            input={false}
            title='Ảnh đại diện: '
            type='file'
            onChange={onUpload}
            fileList={fileList}
          />
          <ManageContentInput
            onChange={onChange}
            name='desc'
            value={content?.desc}
            title='Nội dung'
            textarea
            input={false}
            placeholder='HTML Editer'
          />
        </div>
      </List>
    </div>
  );
};

export default FinanceKnowledgeContent;
