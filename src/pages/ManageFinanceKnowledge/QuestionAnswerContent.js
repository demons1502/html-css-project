import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, List, Pagination, Form } from 'antd';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { useEffect } from 'react';
import Edit from '../../assets/images/icons/components/Edit';
import LikeIcon from '../../assets/images/icons/likeIcon.svg';
import IconPlus from '../../assets/images/icons/plus.svg';
import { Button } from '../../components/styles';
import Title from '../../components/Title';
import ManageContentInput from './ManageContentInput';

const QuestionAnswerContent = (props) => {
  const { onChange, content, onDelete, onSave, onCancel, isEdit, setEdit } = props;
  const [answers, setAnswers] = useState(null);
  const [current, setCurrent] = useState(1);

  const carouselRef = useRef();
  const [form] = Form.useForm();

  const itemRender = (_, type) => {
    if (type === 'prev') {
      return (
        <div className="slide-btn" onClick={() => carouselRef.current.prev()}>
          <span>Trước</span>
          <div className="icon">
            <LeftOutlined />
          </div>
        </div>
      );
    }

    return (
      <div className="slide-btn" onClick={() => carouselRef.current.next()}>
        <div className="icon">
          <RightOutlined />
        </div>
        <span>Sau</span>
      </div>
    );
  };

  const setting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const handleChange = (e) => {
  //   let values;
  //   const id = e.target.id ? e.target.id : undefined;
  //   const name = e.target.name;
  //   const index = answers.findIndex((item) => item.id === id);
  //   values = { ...answers[index], [name]: e.target.value };
  //   setAnswers([...answers, values]);
  //   console.log(answers[index]);
  // };

  const handleAddAnswer = () => {
    const newAnswer = {
      answer: '',
    };
    carouselRef.current.goTo(answers.length);
    setAnswers([...answers, newAnswer]);
    setCurrent(answers.length);
    setEdit(false);
  };

  useEffect(() => {
    content && setAnswers(content?.answers);
  }, [content]);

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
              <Button className="btn-danger" onClick={() => onCancel()}>
                Hủy
              </Button>
              <Button type="primary" onClick={() => onSave(content)}>
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
            autoFocus={isEdit}
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
            {answers?.length > 0 ? (
              <>
                <Carousel {...setting} ref={carouselRef} arrows>
                  {answers?.map((answer, index) => (
                    <div className="questionAnswerContent-answer_main" key={index}>
                      <div className="questionAnswerContent-answer_auth">
                        <p>
                          Tác giả: <span>{answer?.author?.fullname}</span>
                        </p>
                        <p>
                          <img src={LikeIcon} /> {answer?.like}
                        </p>
                      </div>
                      <div className="questionAnswerContent-answer_content">
                        <ManageContentInput
                          name="answer"
                          id={answer?.id}
                          textarea
                          onChange={onChange}
                          value={answer?.answer}
                          input={false}
                          isDisabled={isEdit}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </>
            ) : (
              <div className="questionAnswerContent-answer_main">
                <div className="questionAnswerContent-answer_auth">
                  <p>
                    Tác giả: <span>{content?.author?.fullname}</span>
                  </p>
                  <p>
                    <img src={LikeIcon} /> 0
                  </p>
                </div>
                <div className="questionAnswerContent-answer_content">
                  <ManageContentInput
                    name="answer"
                    textarea
                    onChange={onChange}
                    value={content?.answer}
                    input={false}
                    isDisabled={isEdit}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="questionAnswerContent-pagination">
            <Button
              className="btn-add-new btn-no-border"
              icon={<img src={IconPlus} alt="" />}
              onClick={handleAddAnswer}
            >
              Thêm câu trả lời khác
            </Button>
            <Pagination
              total={answers?.length}
              pageSize={1}
              itemRender={itemRender}
              showLessItems
              current={current}
              onChange={(page) => setCurrent(page)}
            />
          </div>
        </div>
      </List>
    </div>
  );
};

export default memo(QuestionAnswerContent);
