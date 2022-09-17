import { Button, List } from 'antd';
import React from 'react';
import ManageContentInput from './ManageContentInput';
import Title from '../../components/Title';

const FinanceKnowledgeContent = (props) => {
  const { content, onChange, fileList, onClick, onDelete } = props;

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
              name='url'
              title='Link'
              value={content?.url}
              placeholder='Nhập link'
            />
            <div className='manageContent-footer_button'>
              <Button danger className='btn-cancer' onClick={() => onDelete(content?.id)}>
                Hủy
              </Button>
              <Button
                type='primary'
                className='btn-save'
                onClick={() => onClick(content)}
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
            name='title'
            onChange={onChange}
            value={content?.title}
            title='Tiêu đề'
            placeholder='Nhập nội dung tiêu đề'
          />
          <ManageContentInput
            name='image'
            input={false}
            title='Ảnh đại diện: '
            type='file'
            onChange={onChange}
            fileList={fileList}
            imgURL={content?.image}
          />
          <ManageContentInput
            name='subTitle'
            onChange={onChange}
            value={content?.subTitle}
            title='Nội dung vắn tắt'
            textarea
            input={false}
            placeholder='Nội dung'
          />
        </div>
      </List>
    </div>
  );
};

export default FinanceKnowledgeContent;
