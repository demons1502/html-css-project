import { LeftOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons';
import { List, Pagination } from 'antd';
import React from 'react';
import Edit from '../../assets/images/icons/components/Edit';
import Delete from '../../assets/images/icons/components/Delete';
import LikeIcon from '../../assets/images/icons/likeIcon.svg';
import IconPlus from '../../assets/images/icons/plus.svg';
import Title from '../../components/Title';
import ManageContentInput from './ManageContentInput';
import { Button } from '../../components/styles';

const QuestionAnswerContent = (props) => {
  const { onChange, content, onDelete, onSave, onCancel, isEdit, setEdit } = props;

  const itemRender = (_, type) => {
    if (type === 'prev') {
      return (
        <>
          <span>Trước</span>
          <div className="icon">
            <LeftOutlined />
          </div>
        </>
      );
    }
    if (type === 'next') {
      return (
        <>
          <div className="icon">
            <RightOutlined />
          </div>
          <span>Sau</span>
        </>
      );
    }
  };

  return (
    <div className="questionAnswerContent">
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
                  <DeleteOutlined className="icon" />
                  {/* <Delete color="#999" /> */}
                </span>
              </div>
            )}
          </div>
        }
        footer={
          <div className="manageContent-footer">
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
            name="question"
            onChange={onChange}
            value={content?.title || content?.question}
            title="Câu hỏi"
            placeholder="Nhập nội dung câu hỏi"
            color
            isDisabled={isEdit}
          />
          <ManageContentInput
            name="category"
            title="Công việc"
            placeholder="Nhập nội dung công việc"
            onChange={onChange}
            value={content?.category}
            isDisabled={isEdit}
          />

          <div className="questionAnswerContent-answer">
            <div className="questionAnswerContent-answer_main">
              <div className="questionAnswerContent-answer_auth">
                <p>
                  Tác giả: <span>{content?.author?.fullname}</span>
                </p>
                <p>
                  <img src={LikeIcon} /> 23
                </p>
              </div>
              <div className="questionAnswerContent-answer_content">
                <ManageContentInput
                  name="desc"
                  textarea
                  onChange={onChange}
                  value={content?.subTitle || content?.desc}
                  input={false}
                  isDisabled={isEdit}
                />
              </div>
            </div>
          </div>
          <div className="questionAnswerContent-pagination">
            <Button className="btn-add-new btn-no-border" icon={<img src={IconPlus} alt="" />}>
              Thêm câu trả lời khác
            </Button>
            <Pagination defaultCurrent={1} total={5} title="trang" itemRender={itemRender} defaultPageSize={2} />
          </div>
        </div>
      </List>
    </div>
  );
};

export default QuestionAnswerContent;
