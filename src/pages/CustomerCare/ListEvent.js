import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Col, Progress, Button, Empty} from 'antd';
import {createData} from '../../slices/customerCare';
import TableCommon from '../../components/TableCommon';
import IconPlus from '../../assets/images/icons/plus.svg';
import IconSms from '../../assets/images/icons/sms.svg';
import IconMessage from '../../assets/images/icons/message.svg';
import ModalCommon from "../../components/ModalCommon";
import AddEventContent from "../../components/ModalCommon/AddEventContent";

export default function ListEvent() {
  const {t} = useTranslation();
  const listData = useSelector((state) => state.customerCare.data);
  const [addNew, setAddNew] = useState(false);
  const dispatch = useDispatch();

  const columns = [
    {
      title: t('common.stt'),
      dataIndex: 'key',
      key: 'stt',
    },
    {
      title: t('common.date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('common.content'),
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '',
      key: 'action',
      render: () => {
        return (
          <div className="btn-table">
            <Button className="btn-table__btn m-r-10" icon={<img src={IconSms} alt=""/>} onClick={sendSms}>{t('customer care.sms')}</Button>
            <Button className="btn-table__btn" icon={<img src={IconMessage} alt=""/>} onClick={sendEmail}>{t('customer care.email')}</Button>
          </div>
        )
      },
    },
  ];

  const addEvent = (e) => {
    console.log('aaaaa')
    // dispatch(createData({
    //   id: 1,
    //   title: e.target.value,
    // }));
  };

  const sendSms = () => {
    console.log('send sms')
  }

  const sendEmail = () => {
    console.log('send email')
  }

  const footer = [
    <Button key="back" onClick={() => setAddNew(false)}>
      Huỷ
    </Button>,
    <Button key="submit" type="primary" onClick={addEvent}>
      Submit
    </Button>,
  ];

  const table = useMemo(() => {
    if (!!listData && listData.length > 0) {
      return <TableCommon dataSource={listData} columnTable={columns}></TableCommon>
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [listData])

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
          {table}
          <Button className="btn-add-new" icon={<img src={IconPlus} alt=""/>} onClick={() => setAddNew(true)}>{t('customer care.add event')}</Button>
        </div>
      </Col>
      <ModalCommon isVisible={addNew} setIsVisible={setAddNew} title={t(('customer care.add event title'))} content={<AddEventContent />} footer={footer}></ModalCommon>
    </>
  );
}
