import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Col, Progress, Button, Empty, Popconfirm, message, Spin} from 'antd';
import {createData, getData, deleteData, updateData} from '../../slices/events';
import TableCommon from '../../components/TableCommon';
import IconPlus from '../../assets/images/icons/plus.svg';
import IconSms from '../../assets/images/icons/sms.svg';
import IconMessage from '../../assets/images/icons/message.svg';
import IconDelete from '../../assets/images/icons/delete.svg';
import ModalCommon from "../../components/ModalCommon";
import AddEventContent from "../../components/ModalCommon/CustomerCare/AddEventContent";
import SendSmsContent from "../../components/ModalCommon/CustomerCare/SendSmsContent";
import SendEmailContent from "../../components/ModalCommon/CustomerCare/SendEmailContent";
import moment from 'moment';
import {LOADING_STATUS} from '../../ultis/constant';

export default function ListEvent() {
  const {t} = useTranslation()
  const eventState = useSelector((state) => state.events)
  const [visibleModalAddEvent, setVisibleModalAddEvent] = useState(false)
  const [visibleModalEmail, setVisibleModalEmail] = useState(false)
  const [visibleModalSms, setVisibleModalSms] = useState(false)
  const [detailData, setDetailData] = useState({})
  const dispatch = useDispatch()

  const columns = [
    {
      title: t('common.stt'),
      key: 'stt',
      render: (text, record, index) => (index + 1),
    },
    {
      title: t('common.date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('common.content'),
      key: 'smsTemplate',
      render: (record) => {
        return (
          <span className="cursor-pointer" onClick={() => editModal(record)}>{record.smsTemplate}</span>
        );
      }
    },
    {
      title: '',
      key: 'action',
      render: (record) => {
        return (
          <div className="btn-table">
            <Button className="btn-table__btn m-r-10" icon={<img src={IconSms} alt=""/>} onClick={() => setVisibleModalSms(true)}>{t('customer care.sms')}</Button>
            <Button className="btn-table__btn m-r-10" icon={<img src={IconMessage} alt=""/>} onClick={() => setVisibleModalEmail(true)}>{t('customer care.email')}</Button>
            <Popconfirm className="pop-confirm-delete" placement="top" title={t('common.delete title')} onConfirm={() => deleteEvent(record.id)} okText={t('common.delete')}  cancelText={t('common.cancel')} >
              <Button className="btn-table__btn flex-end" icon={<img src={IconDelete} alt=""/>}></Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  const addModal = (detail) => {
    setVisibleModalAddEvent(true)
    setDetailData({})
  }

  const editModal = (detail) => {
    setVisibleModalAddEvent(true)
    setDetailData(detail)
  }

  const handleSaveEvent = (values) => {
    values.date = moment(values.date)
    if (Object.keys(detailData).length > 0) {
      values.id = detailData.id
      dispatch(updateData(values))
    } else {
      dispatch(createData(values))
    }
  }

  const deleteEvent = (id) => {
    dispatch(deleteData(id))
  }
  
  const sendSms = (values) => {
    console.log('aaaaa', values)
  }

  const sendEmail = (values) => {
    console.log('aaaaa', values)
  }

  const table = useMemo(() => {
    if (!!eventState.data && eventState.data.length > 0) {
      return <TableCommon dataSource={eventState.data} columnTable={columns}></TableCommon>
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [eventState.data])

  useEffect(() => {
    dispatch(getData({isTemplate: 0}))
  }, [])

  useEffect(() => {
    if (eventState.loading === LOADING_STATUS.failed) {
      message.error(eventState?.message)
    }

    if (eventState.loading === LOADING_STATUS.succeeded) {
      setVisibleModalAddEvent(false)
      setVisibleModalEmail(false)
      setVisibleModalSms(false)
      if (!!eventState?.message) {
        message.success(eventState?.message)
      }
    }
  }, [eventState.loading])

  return (
    <>
      <Col span={9} className="customer-care__center">
        <div className="customer-care__center--progress">
          <span>{t('common.progress')}</span>
          <Progress percent={60}/>
        </div>
        <div className="customer-care__center--event">
          <h5>{t('customer care.event title')}</h5>
        </div>
        <div className="customer-care__center--list">
          <Spin spinning={eventState.loading === LOADING_STATUS.pending}>
            {table}
          </Spin>
          <Button className="btn-add-new" icon={<img src={IconPlus} alt=""/>} onClick={(() => addModal())}>{t('customer care.add event')}</Button>
        </div>
      </Col>
      <ModalCommon isVisible={visibleModalAddEvent} setIsVisible={setVisibleModalAddEvent} title={Object.keys(detailData).length > 0 ? t(('customer care.edit event title')) : t(('customer care.add event title'))} width={770} content={<AddEventContent onFinish={handleSaveEvent} detailData={detailData} setVisibleModalAddEvent={setVisibleModalAddEvent}/>} />
      <ModalCommon isVisible={visibleModalEmail} setIsVisible={setVisibleModalEmail} title={t(('customer care.email title'))} width={770} content={<SendEmailContent setVisibleModalEmail={setVisibleModalEmail} onFinish={sendEmail}/>} />
      <ModalCommon isVisible={visibleModalSms} setIsVisible={setVisibleModalSms} title={t(('customer care.sms title'))} width={770} content={<SendSmsContent setVisibleModalSms={setVisibleModalSms} onFinish={sendSms}/>} />
    </>
  );
}
