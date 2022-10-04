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
    placeholder,
    color = false,
    fileList,
    isDisabled,
    id,
  } = props;

  return (
    <>
      {input && !textarea ? (
        <Input
          name={name}
          id={id}
          placeholder={placeholder}
          bordered={false}
          onChange={onChange}
          prefix={`${title}: `}
          value={value}
          type={type}
          className={color && 'color-green'}
          disabled={isDisabled}
        />
      ) : !input && textarea ? (
        <div className="textarea">
          {title && <span className="textarea-title">{`${title}: `}</span>}
          <Input.TextArea
            name={name}
            id={id}
            placeholder={placeholder}
            bordered={false}
            onChange={onChange}
            value={value}
            type={type}
            autoSize={{ minRows: 5 }}
            className="textarea-input"
            disabled={isDisabled}
          />
        </div>
      ) : (
        <div className="manageContentInput-upload">
          <span className=" avatar-title">{title}</span>
          <Upload
            name={name}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList
            onChange={onChange}
            beforeUpload={Upload.LIST_IGNORE}
            fileList={fileList}
            accept=".jpeg,.jpg,.png,.webp,.svg"
            disabled={isDisabled}
          >
            <div className="upload-content">
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
