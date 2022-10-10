import { Button, Col, Layout, List, message, notification, Row, Segmented, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import IconPlus from '../../assets/images/icons/plus.svg';
import Pagination from '../../components/common/Pagination';
import ModalConfirm from '../../components/ModalConfirm';
import * as S from '../../components/styles';
import Title from '../../components/Title';
import { uploadFile } from '../../services/manageContent';
import { createContent, deleteContent, retrieveData, updateContent } from '../../slices/managementContent';
import { DEFAULT_SIZE, LOADING_STATUS, MANAGEMENT_CONTENT } from '../../ultis/constant';
import FinanceKnowledge from './FinanceKnowledge';
import FinanceKnowledgeContent from './FinanceKnowledgeContent';
import QuestionAnswerContent from './QuestionAnswerContent';
import QuestionContent from './QuestionContent';

const ManageFinanceKnowledge = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.managementContentReducer);
  const contents1 = useSelector((state) => state.appointment);
  const loading = useSelector((state) => state.loading.loading);

  const [itemContent, setItemContent] = useState(null);
  const [prevItem, setPrevItem] = useState(null);
  const [option, setOption] = useState('articles');
  const [paginate, setPaginate] = useState({ limit: DEFAULT_SIZE, offset: 0 });
  const [fileList, setFileList] = useState(null);
  const [editDisabled, setEditDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [id, setId] = useState(null);

  const handleChange = (e) => {
    let values;
    const name = e.target.name;
    console.log(e.target.value);
    const id = e.target.id;
    // if (option !== MANAGEMENT_CONTENT[0].value) {
    //   const index = itemContent.answers.findIndex(item=>item.id === id)
    //   values = { ...itemContent, answers:[...itemContent.answers,{itemContent.answers[index]?.answer=e.target.value}] };
    //   setItemContent(values);
    // }
    values = { ...itemContent, [name]: e.target.value };
    setItemContent(values);
  };

  const handleFileList = ({ fileList: newFile }) => {
    if (newFile[0]?.originFileObj.size > 200000) {
      notification.error({
        message: 'Kích thước ảnh quá lớn',
        duration: 2,
        placement: 'topLeft',
        icon: false,
      });
      return;
    }
    setFileList(newFile);
    setItemContent({ ...itemContent, image: newFile[0]?.originFileObj });
  };

  const handleSave = (data) => {
    if (option !== MANAGEMENT_CONTENT[0].value) {
      const information = {
        question: {
          question: data?.question,
          category: data?.category,
        },
        answers: data?.answers ? [...data.answers, { answer: data.answer }] : [{ answer: data.answer }],
      };
      if (!data.id) {
        dispatch(createContent({ type: option, payload: information }));
        setItemContent(null);
        setFileList(null);
        setEditDisabled(true);
      } else {
        dispatch(updateContent({ type: option, id: data.id, payload: information }));
        setItemContent(null);
        setFileList(null);
        setEditDisabled(true);
      }
    } else {
      if (!data.id) {
        dispatch(createContent({ type: option, payload: data }));
        setItemContent(null);
        setFileList(null);
        setEditDisabled(true);
      } else {
        dispatch(updateContent({ type: option, id: data.id, payload: data }));
        setItemContent(null);
        setFileList(null);
        setEditDisabled(true);
      }
    }
  };

  const handleClick = async (item) => {
    if (!item) {
      message.warning({
        content: `Vui lòng nhập nội dung bài viết`,
        duration: 3,
      });
      return;
    }
    try {
      if (item.image) {
        const file = new FormData();
        file.append('image', item.image);
        const res = await uploadFile(file);
        res.data && handleSave({ ...item, image: res.data.publicUrl });
      } else {
        handleSave(item);
      }
    } catch (error) {
      message.error({
        content: error.response.data,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setItemContent(prevItem);
    setEditDisabled(true);
    if (!prevItem) {
      setItemContent(null);
      setFileList(null);
    }
  };

  const handleDelete = (item) => {
    if (item) {
      ModalConfirm({
        content: `Xác nhận xóa nội dung`,
        callApi: () => {
          dispatch(deleteContent({ type: option, id: item.id })), setItemContent(null), setFileList(null);
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

  // const handleAddNew = () => {
  //   setEditDisabled(false);
  //   setItemContent(null);
  //   setFileList(null);
  // };

  const handleAddNew = () => {
    setEditDisabled(false);
    setItemContent(null);
    setAddNew(true);
    setIsEdit(false);
  };

  const handleChangeOption = (e) => {
    // setEditDisabled(true);
    // setItemContent(null);
    setFileList(null);
    setId(null);
    setOption(e);
  };

  useEffect(() => {
    //fetch data
    option && dispatch(retrieveData({ type: option, params: paginate }));
  }, [option, contents.isReload, paginate]);

  return (
    <div className="manageFinanceKnowledge">
      <S.PageHeader
        className="site-page-header-responsive"
        backIcon={false}
        onBack={() => window.history.back()}
        title={t('manage content.title')}
      ></S.PageHeader>
      <Layout className="manageFinanceKnowledge-container">
        <Row gutter={[16, 10]} justify="start" align="stretch">
          <Col lg={7} md={24} sm={24} xs={24}>
            <Layout.Content>
              <div className="list-option">
                <Segmented
                  options={MANAGEMENT_CONTENT}
                  onChange={handleChangeOption}
                  defaultValue={option}
                  value={option}
                />
              </div>
              <Spin spinning={loading === LOADING_STATUS.pending}>
                <List
                  className="manageFinanceKnowledge-container_list"
                  size="small"
                  header={
                    <Title
                      title={
                        option !== MANAGEMENT_CONTENT[1].value
                          ? t('manage content.articles list title')
                          : t('manage content.q&a list title')
                      }
                    />
                  }
                  footer={
                    <Button className="btn-add-new " icon={<img src={IconPlus} alt="" />} onClick={handleAddNew}>
                      Thêm mới
                    </Button>
                  }
                  dataSource={contents.data}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => {
                        setItemContent(item);
                        setPrevItem(item);
                        setFileList([{ url: item.image }]);
                        setEditDisabled(true);
                        setId(item?.id);
                        setIsEdit(true);
                      }}
                      className={`${item.id === id ? 'active' : ''}`}
                    >
                      <Typography.Text ellipsis>{item.title || item.question}</Typography.Text>
                    </List.Item>
                  )}
                ></List>
              </Spin>
              <Pagination total={contents.count} setPaginate={setPaginate} showSizeChanger={false}></Pagination>
            </Layout.Content>
          </Col>

          <Col xs={16} lg={17} flex={1}>
            <Layout.Content /* className="manageContent" */>
              {option !== MANAGEMENT_CONTENT[1].value ? (
                // <FinanceKnowledgeContent
                //   content={itemContent}
                //   onChange={handleChange}
                //   onUpload={handleFileList}
                //   fileList={fileList}
                //   onSave={handleClick}
                //   onDelete={handleDelete}
                //   onCancel={handleCancel}
                //   isEdit={editDisabled}
                //   setEdit={setEditDisabled}
                // />
                <FinanceKnowledge
                  id={id}
                  option={option}
                  setId={setId}
                  addNew={addNew}
                  setAddNew={setAddNew}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />
              ) : (
                <>
                  {/* <QuestionAnswerContent
                    onChange={handleChange}
                    content={itemContent}
                    onDelete={handleDelete}
                    onCancel={handleCancel}
                    onSave={handleSave}
                    isEdit={editDisabled}
                    setEdit={setEditDisabled}
                    option={option}
                  /> */}
                  <QuestionContent
                    id={id}
                    option={option}
                    setId={setId}
                    addNew={addNew}
                    setAddNew={setAddNew}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                  />
                </>
              )}
            </Layout.Content>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default ManageFinanceKnowledge;
