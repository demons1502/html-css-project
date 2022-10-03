import { List } from 'antd';
import React from 'react';
import Edit from '../../assets/images/icons/components/Edit';
import Delete from '../../assets/images/icons/components/Delete';
import Title from '../../components/Title';
import ManageContentInput from './ManageContentInput';
import { Button } from '../../components/styles';

const FinanceKnowledgeContent = (props) => {
  const { content, onChange, fileList, onSave, onDelete, onUpload, onCancel, isEdit, setEdit } = props;

  return (
    <div className="financeKnowledgeContent">
      <List
        size="small"
        header={
          <div className="manageContent-header">
            <Title title="Nội dung" />
            {content && (
              <div className="manageContent-header_icon">
                {isEdit && (
                  <span onClick={() => setEdit(false)}>
                    <Edit color="#36b872" />
                  </span>
                )}

                <span onClick={() => onDelete(content)}>
                  <Delete color="#999" />
                </span>
              </div>
            )}
          </div>
        }
        footer={
          <div className="manageContent-footer">
            <ManageContentInput
              onChange={onChange}
              name="url"
              title="Link"
              value={content?.url}
              placeholder="Nhập link"
              isDisabled={isEdit}
            />
            <div className="manageContent-footer_button">
              <Button danger className="btn-cancer" onClick={() => onCancel()}>
                Hủy
              </Button>
              <Button type="primary" className="btn-save" onClick={() => onSave(content)}>
                Lưu
              </Button>
            </div>
          </div>
        }
      >
        <div className="manageContent-container">
          <ManageContentInput
            name="title"
            onChange={onChange}
            value={content?.title}
            title="Tiêu đề"
            placeholder="Nhập nội dung tiêu đề"
            isDisabled={isEdit}
          />
          <ManageContentInput
            name="image"
            input={false}
            title="Ảnh đại diện: "
            type="file"
            onChange={onUpload}
            fileList={fileList}
            isDisabled={isEdit}
          />
          <ManageContentInput
            name="subTitle"
            onChange={onChange}
            value={content?.subTitle}
            title="Nội dung vắn tắt"
            textarea
            input={false}
            placeholder="Nội dung"
            isDisabled={isEdit}
          />
        </div>
      </List>
    </div>
  );
};

export default FinanceKnowledgeContent;
