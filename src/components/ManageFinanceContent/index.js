import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import ManageContentInput from '../ManageContentInput';
import Title from '../Title';

const ManageContent = (props) => {
  const { option } = props;

  const handleChange = (values) => {
    console.log(values);
    /* let values;
    if (!e.file) {
      const name = e.target.name;
      values = { ...data, [name]: e.target.value };
 
    }else{
      values={...data,}
    }
    setData(values) */
  };

  return (
    <Layout.Content className='manageContent'>
      <div className='manageContent-header'>
        <Title title='Nội dung' />
        {option === 'hỏi đáp' ? (
          <div className='manageContent-nav'>
            <EditOutlined />
            <DeleteOutlined />
          </div>
        ) : null}
      </div>
      <div className='manageContent-container'>
        <ManageContentInput />
        <ManageContentInput
          input={false}
          title='Ảnh đại diện: '
          type='file'
          onChange={handleChange}
        />
        <ManageContentInput />
      </div>
    </Layout.Content>
  );
};

export default ManageContent;
