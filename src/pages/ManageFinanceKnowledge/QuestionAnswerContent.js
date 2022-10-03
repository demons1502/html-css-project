import { LeftOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons';
import { Carousel, List, Pagination } from 'antd';
import React, { useState, useEffect } from 'react';
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

  // const [answers, setAnswers] = useState(null);

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   // let values;
  //   // const name = e.target.name;
  //   // values = [...answers, { [name]: e.target.value }];
  //   // setAnswers(values);
  // };

  // useEffect(() => {
  //   content && setAnswers(content?.answers);
  // }, [content]);
  console.log(content?.answers);

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
                {!content?.answers?.length > 0 ? (
                  <ManageContentInput
                    name="answer"
                    textarea
                    onChange={onChange}
                    value={content?.answer}
                    input={false}
                    isDisabled={isEdit}
                  />
                ) : (
                  <Carousel arrows centerMode touchMove>
                    {content?.answers?.map((item) => (
                      <div className="questionAnswerContent-answer_slide" key={item?.id}>
                        <ManageContentInput
                          name="answer"
                          textarea
                          onChange={onChange}
                          value={item?.answer}
                          input={false}
                          isDisabled={isEdit}
                        />
                      </div>
                    ))}
                  </Carousel>
                )}
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
