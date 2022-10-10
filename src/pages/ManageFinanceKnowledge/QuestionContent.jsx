import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Edit from '../../assets/images/icons/components/Edit';
import LikeIcon from '../../assets/images/icons/likeIcon.svg';
import IconPlus from '../../assets/images/icons/plus.svg';
import ModalConfirm from '../../components/ModalConfirm';
import { Button, Input } from '../../components/styles';
import { createContent, deleteContent, getDetail, likeContent, updateContent } from '../../slices/managementContent';
import './questionContent.scss';

const QuestionAnswerContent = (props) => {
  const { id, option, setId, addNew, setAddNew, isEdit, setIsEdit } = props;

  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState({});
  const [data, setData] = useState({});
  console.log(data);

  const dispatch = useDispatch();
  const { detail, isReload } = useSelector((state) => state.managementContentReducer);

  const [form] = Form.useForm();

  const handleChange = (e) => {
    let values;
    const name = e.target.name;
    values = { ...answer, [name]: e.target.value };
    setAnswer(values);
  };

  const handleChange1 = (e) => {
    let values;
    const name = e.target.name;
    values = {
      ...data,
      answers: [...answers],
      [name]: e.target.value,
    };
    setData(values);
  };

  const handleSave = () => {
    const info = {
      question: {
        question: data?.question,
        category: data?.category,
      },
      answers: [...answers, { ...answer }],
    };
    if (!data?.id) {
      dispatch(createContent({ type: option, payload: info }));
      setData([]);
      setAnswers([]);
      setAnswer({});
      setAddNew(false);
      setId(null);
    } else {
      dispatch(updateContent({ type: option, id: data.id, payload: info }));
      setData([]);
      setAnswers([]);
      setAnswer({});
      setAddNew(false);
      setId(null);
    }
  };

  const handleAddAnswer = () => {
    setCurrent(answers?.length + 1);
    setIsEdit(false);
  };

  const onLike = (id) => {
    const payload = { type: option, id: id };
    dispatch(likeContent(payload));
  };

  const handleDelete = (id) => {
    if (id) {
      ModalConfirm({
        content: `Xác nhận xóa nội dung`,
        callApi: () => {
          dispatch(deleteContent({ type: option, id: id })), setId(null), setAnswer({}), setData(null), setAnswers([]);
        },
      });
    } else {
      ModalConfirm({
        content: `Chọn nội dung cần xóa`,
        callApi: () => {
          return;
        },
      });
    }
  };

  useEffect(() => {
    answers && setAnswer(answers[current]);
  }, [current, id, answers]);

  useEffect(() => {
    const payload = { type: option, id: id };
    id && dispatch(getDetail(payload));
  }, [id, isReload]);

  useEffect(() => {
    detail && setData(detail);
    detail && setAnswers(detail?.answers);
    detail && setCurrent(0);
  }, [detail]);

  useEffect(() => {
    setData([]);
    setAnswers([]);
    setId(null);
  }, [option, addNew]);

  return (
    <div className="questionContent">
      <div className="questionContent-header">
        <div className="questionContent-header_title">
          <h3>Nội dung</h3>
        </div>
        <div className="questionContent-header_button">
          {data?.length > 0 && (
            <div className="questionContent-header_icon">
              {isEdit && (
                <span onClick={() => setIsEdit(false)}>
                  <Edit color="#36b872" className="icon" />
                </span>
              )}
              <span onClick={() => handleDelete(id)}>
                <DeleteOutlined className="icon" />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="questionContent-container">
        <Form className="form" form={form} autoComplete="off">
          <div className="form-item">
            <Input
              name="question"
              className="green-color"
              placeholder="Nhập nội dung câu hỏi"
              prefix="Câu hỏi: "
              value={data?.question}
              onChange={handleChange1}
              bordered={false}
              disabled={isEdit}
            />
          </div>
          <div className="form-item">
            <Input
              name="category"
              placeholder="Nhập nội dung câu hỏi"
              prefix="Công việc: "
              value={data?.category}
              onChange={handleChange1}
              bordered={false}
              disabled={isEdit}
            />
          </div>
          <div className="questionContent-container_answer">
            <div className="questionContent-card">
              <div className="questionContent-card_header">
                <div className="questionContent-card_auth">
                  Tác giả: <span>{answer?.author?.fullname || ''}</span>
                </div>
                <div className="questionContent-card_like">
                  <img src={LikeIcon} onClick={() => onLike(answer?.id)} className="like-icon" />
                  <span>{answer?.like || 0}</span>
                </div>
              </div>
              <div className="questionContent-card_text">
                <Input.TextArea
                  name="answer"
                  autoSize
                  bordered={false}
                  value={answer?.answer}
                  onChange={handleChange}
                  disabled={isEdit}
                />
              </div>
            </div>
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
              <button
                className="btn-change"
                disabled={current <= 0 ? true : false}
                onClick={() => setCurrent(current - 1)}
              >
                <span>Trước</span>
                <LeftOutlined className="icon" />
              </button>
              <button
                className="btn-change"
                disabled={current >= answers?.length - 1 ? true : false}
                onClick={() => setCurrent(current + 1)}
              >
                <RightOutlined className="icon" />
                <span>Sau</span>
              </button>
            </div>
          </div>
          <div className="questionContent-submit">
            <Button className="btn-danger" disabled={isEdit}>
              Hủy
            </Button>
            <Button type="primary" onClick={handleSave} disabled={isEdit}>
              Lưu
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(QuestionAnswerContent);
