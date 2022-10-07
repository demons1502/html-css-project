import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, List, Pagination, Form, message } from 'antd';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Edit from '../../assets/images/icons/components/Edit';
import LikeIcon from '../../assets/images/icons/likeIcon.svg';
import IconPlus from '../../assets/images/icons/plus.svg';
import { Button, Input } from '../../components/styles';
import Title from '../../components/Title';
import { getOne } from '../../services/manageContent';
import { getDetail, likeContent } from '../../slices/managementContent';
import ManageContentInput from './ManageContentInput';
import './questionContent.scss';

const QuestionAnswerContent = (props) => {
  const { id, option } = props;
  const [answers, setAnswers] = useState(null);
  const [current, setCurrent] = useState(1);
  const [question, setQuestion] = useState(null);
  const [data, setData] = useState(null);

  const { detail, isReload } = useSelector((state) => state.managementContentReducer);

  const dispatch = useDispatch();

  const carouselRef = useRef();
  const [form] = Form.useForm();
  const { Item } = Form;

  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOne(option, id);
        setData(res.data);
      } catch (err) {
        message.error({
          content: err.response.data,
          duration: 3,
        });
      }
    };
    id && fetchData();
  }, [id]);

  const handleChange = (e) => {
    let values;
    const id = e.target.id ? e.target.id : undefined;
    const name = e.target.name;
    values = { ...data, [name]: e.target.value };
    setData(values);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleAddAnswer = () => {
    const newAnswer = {
      answer: '',
    };
    carouselRef.current.goTo(answers.length);
    setAnswers([...answers, newAnswer]);
    setCurrent(answers.length - 1);
    setEdit(false);
  };

  // const onLike = (id) => {
  //   const payload = { type: option, id: id };
  //   dispatch(likeContent(payload));
  // };

  // useEffect(() => {
  //   detail && setQuestion(detail);
  //   detail && setAnswers(detail.answers);
  // }, [detail]);

  // useEffect(() => {
  //   const payload = { type: option, id: content?.id };
  //   content && dispatch(getDetail(payload));
  // }, [content, isReload]);

  // const fields = [
  //   {
  //     name: 'question',
  //     value: data?.question,
  //     onChange: handleChange,
  //   },
  //   {
  //     name: 'category',
  //     value: data?.category,
  //     onChange: handleChange,
  //   },
  // ];

  useEffect(() => {
    if (data) {
      if (Object.keys(data).length > 0) {
        form.setFieldsValue({ ...data });
      } else {
        form.resetFields();
      }
    }
  }, [data]);

  return (
    <>
      {/* <div className="questionAnswerContent">
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
                            <img src={LikeIcon} onClick={() => onLike(answer.id)} /> {answer?.like}
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
      </div> */}
      <div className="questionContent">
        <div className="questionContent-header">
          <div className="questionContent-header_title">
            <h3>Nội dung</h3>
          </div>
          <div className="questionContent-header_button">
            <div className="questionContent-header_icon">
              <span>
                <Edit color="#36b872" className="icon" />
              </span>
              <span>
                <DeleteOutlined className="icon" />
              </span>
            </div>
          </div>
        </div>
        <div className="questionContent-container">
          <Form
            className="form"
            form={form}
            onFinish={onFinish}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            {/* <Form.Item name="question">
              <Input placeholder="Nhập nội dung câu hỏi" prefix="Câu hỏi: " bordered={false} />
            </Form.Item>
            <Form.Item name="category">
              <Input placeholder="Nhập nội dung câu hỏi" prefix="Công việc: " bordered={false} />
            </Form.Item> */}
            <div className="form-item">
              <Input
                name="question"
                className="green-color"
                placeholder="Nhập nội dung câu hỏi"
                prefix="Câu hỏi: "
                value={data?.question}
                onChange={handleChange}
                bordered={false}
              />
            </div>
            <div className="form-item">
              <Input
                name="category"
                placeholder="Nhập nội dung câu hỏi"
                prefix="Công việc: "
                value={data?.category}
                onChange={handleChange}
                bordered={false}
              />
            </div>
            <div className="questionContent-container_answer">
              {data?.answers?.length > 0 ? (
                <Carousel {...setting} autoplay>
                  {data?.answers?.map((answer, index) => (
                    <div key={index} className="questionContent-card">
                      <div className="questionContent-card_header">
                        <div className="questionContent-card_auth">
                          Tác giả: <span>{answer?.author?.fullname}</span>{' '}
                        </div>
                        <div className="questionContent-card_like">
                          <img src={LikeIcon} /> <span>{answer?.like}</span>
                        </div>
                      </div>
                      <div className="questionContent-card_text">
                        <Input.TextArea
                          placeholder=""
                          autoSize
                          value={answer.answer}
                          onChange={handleChange}
                          bordered={false}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div className="questionContent-card">
                  <div className="questionContent-card_header">
                    <div className="questionContent-card_auth">Tác giả: </div>
                    <div className="questionContent-card_like">
                      <img src={LikeIcon} /> <span>0</span>
                    </div>
                  </div>
                  <div className="questionContent-card_text">
                    <Input.TextArea placeholder="" autoSize bordered={false} />
                  </div>
                </div>
              )}
            </div>
            <div className="questionContent-paginate">
              <div className="questionContent-paginate_add">
                <Button
                  className="btn-add-new btn-no-border"
                  icon={<img src={IconPlus} alt="" />}
                  onClick={handleAddAnswer}
                >
                  Thêm câu trả lời khác
                </Button>
              </div>
              <div className="questionContent-paginate_change">
                <button className="btn-change">
                  <span>Trước</span>
                  <LeftOutlined className="icon" />
                </button>
                <button className="btn-change">
                  <RightOutlined className="icon" />
                  <span>Sau</span>
                </button>
              </div>
            </div>
            <div className="questionContent-submit">
              <Button className="btn-danger">Hủy</Button>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default memo(QuestionAnswerContent);
