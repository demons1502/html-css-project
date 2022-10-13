import { CameraOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, message, notification } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Edit from '../../assets/images/icons/components/Edit';
import ModalConfirm from '../../components/ModalConfirm';
import { Button, Input, Upload } from '../../components/styles';
import { uploadFile } from '../../services/manageContent';
import { createContent, deleteContent, getDetail, updateContent } from '../../slices/managementContent';
import './financeKnowledge.scss';

const QuestionAnswerContent = (props) => {
  const { id, option, setId, addNew, setAddNew, isEdit, setIsEdit } = props;
  const [data, setData] = useState(null);
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  const { detail, isReload } = useSelector((state) => state.managementContentReducer);

  const [form] = Form.useForm();

  const handleChange = (e) => {
    let values;
    const name = e.target.name;
    values = { ...data, [name]: e.target.value };
    setData(values);
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
    setData({ ...data, image: newFile[0]?.originFileObj });
  };
  const handleData = (values) => {
    if (!data?.id) {
      dispatch(createContent({ type: option, payload: values }));
      setData(null);
      setFileList(null);
      setId(null);
      setAddNew(false);
    } else {
      dispatch(updateContent({ type: option, id: data.id, payload: values }));
      setData(null);
      setFileList(null);
      setId(null);
      setAddNew(false);
    }
  };

  const handleSave = async () => {
    try {
      const file = new FormData();
      file.append('image', data?.image);
      const res = await uploadFile(file);
      res.data && handleData({ ...data, image: res.data.publicUrl });
    } catch (err) {
      message.error({
        content: err.response.data,
        duration: 3,
      });
    }
  };

  const handleDelete = (id) => {
    if (id) {
      ModalConfirm({
        content: `Xác nhận xóa nội dung`,
        callApi: () => {
          dispatch(deleteContent({ type: option, id: id })), setId(null), setFileList(null), setData(null);
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

  const handleCancel = () => {
    setAddNew(false);
    setData(detail?.article);
    setFileList([{ url: detail?.article?.image }]);
    setIsEdit(true);
  };

  useEffect(() => {
    const payload = { type: option, id: id };
    id && dispatch(getDetail(payload));
  }, [id, isReload]);

  useEffect(() => {
    detail && setData(detail?.article);
    detail && setFileList([{ url: detail?.article?.image }]);
  }, [detail]);

  useEffect(() => {
    setData(null);
    setFileList(null);
  }, [option, addNew]);

  useEffect(() => {
    setData(null);
    setFileList(null);
    setId(null);
  }, []);

  return (
    <div className="finance">
      <div className="finance-header">
        <div className="finance-header_title">
          <h3>Nội dung</h3>
        </div>
        <div className="finance-header_button">
          {data && (
            <div className="finance-header_icon">
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
      <div className="finance-container">
        <Form className="form" form={form} autoComplete="off">
          <div className="form-item">
            <Input
              name="title"
              placeholder="Nhập nội dung tiêu đề"
              prefix="Tiêu đề: "
              value={data?.title}
              onChange={handleChange}
              bordered={false}
              disabled={isEdit}
            />
          </div>
          <div className="form-item form-upload">
            <p className="item-title">Ảnh đại diện:</p>
            <div className="finance-upload" style={{ borderRadius: 1 + 'rem' }}>
              <Upload
                name="image"
                listType="picture-card"
                className="image-uploader"
                showUploadList
                onChange={handleFileList}
                beforeUpload={Upload.LIST_IGNORE}
                fileList={fileList}
                accept=".jpeg,.jpg,.png,.webp,.svg"
                disabled={isEdit}
              >
                <div className="upload-content">
                  <CameraOutlined className="icon" />
                  <span>Tải ảnh lên</span>
                </div>
              </Upload>
            </div>
          </div>
          <div className="finance-container_content">
            <p className="item-title">Nội dung vắn tắt: </p>
            <Input.TextArea
              name="subTitle"
              autoSize
              bordered={false}
              value={data?.subTitle}
              onChange={handleChange}
              placeholder="Nội dung"
              disabled={isEdit}
            />
          </div>
          <div className="finance-submit">
            <div className="finance-submit_link">
              <Input
                name="url"
                placeholder="Nhập link"
                prefix="Link: "
                value={data?.url}
                onChange={handleChange}
                bordered={false}
                disabled={isEdit}
              />
            </div>
            <div className="finance-submit_button">
              <Button className="btn-danger" disabled={isEdit} onClick={handleCancel}>
                Hủy
              </Button>
              <Button type="primary" onClick={handleSave} disabled={isEdit}>
                Lưu
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(QuestionAnswerContent);
