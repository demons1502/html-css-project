import { CameraOutlined } from '@ant-design/icons';
import { Input, Upload } from 'antd';
import React from 'react';

const ManageContentInput = (props) => {
  const {
    input = true,
    onChange,
    title,
    name,
    type = 'text',
    textarea = false,
    value,
  } = props;

  return (
    <>
      {input && !textarea ? (
        <Input
          name={name}
          placeholder='Nhập nội dung tiêu đề'
          bordered={false}
          onChange={onChange}
          prefix={`${title}: `}
          value={value}
          type={type}
        />
      ) : !input && textarea ? (
        <Input.TextArea
          name={name}
          placeholder='Nhập nội dung tiêu đề'
          bordered={false}
          onChange={onChange}
          prefix={`${title}: `}
          value={value}
          type={type}
        />
      ) : (
        <div className='manageContentInput-upload'>
          <span className=' avatar-title'>{title}</span>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={true}
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            onChange={onChange}
            onPreview
          >
            <div className='upload-content'>
              <CameraOutlined />
              <span>Tải ảnh lên</span>
            </div>
          </Upload>
        </div>
      )}
    </>
  );
};

export default ManageContentInput;
