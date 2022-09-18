import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Col, Checkbox, Button, Empty, message} from 'antd';
import {getData , createData, updateData} from '../../slices/customerCare';
import TableCommon from '../../components/TableCommon';
import IconPlus from '../../assets/images/icons/plus.svg';
import IconFiles from '../../assets/images/icons/files.svg';
import FilterCommon from "../../components/FilterCommon";
import AddInfoContent from "../../components/ModalCommon/CustomerCare/AddInfoContent";
import ModalCommon from "../../components/ModalCommon";
import {LOADING_STATUS} from '../../ultis/constant';
import moment from 'moment';

const options = [
  { label: 'Thu nhập', value: 1 },
  { label: 'Lịch hẹn', value: 2 },
  { label: 'Quà', value: 3 },
  { label: 'Ký hợp đồng', value: 4 },
  { label: 'Tư vấn', value: 5 },
  { label: 'Khảo sát', value: 6 },
  { label: 'Sở thích', value: 7 },
  { label: 'Gia đình', value: 8 },
  { label: 'Khác', value: 9 },
];

export default function History() {
  const {t} = useTranslation();
  const customerCare = useSelector((state) => state.customerCare);
  const [visibleModalAddInfo, setVisibleModalAddInfo] = useState(false)
  const [detailData, setDetailData] = useState({})
  const [optionsFilter, setOptionsFilter] = useState('')
  const dispatch = useDispatch();

  const columns = [
    {
      title: t('common.date'),
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: t('common.type info'),
      key: 'info',
      render: (record) => {
        return (
          <span onClick={() => editModal(record)}>{record.info}</span>
        );
      }
    },
    {
      title: t('common.content'),
      dataIndex: 'content',
      key: 'content'
    }
  ];

  const addModal = (detail) => {
    setVisibleModalAddInfo(true)
    setDetailData({})
  }

  const handleSaveInfo = (values) => {
    values.date = moment(values.date)
    values.customerId = customerCare.customerId
    if (Object.keys(detailData).length > 0) {
      values.id = detailData.id
      dispatch(updateData(values))
    } else {
      dispatch(createData(values))
    }
  }

  const table = useMemo(() => {
    if (!!customerCare.data && customerCare.data.length > 0) {
      return <TableCommon dataSource={customerCare.data} columnTable={columns}></TableCommon>
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [customerCare.data])

  useEffect(() => {
    if (customerCare.loading === LOADING_STATUS.failed) {
      message.error(customerCare?.message)
    }

    if (customerCare.loading === LOADING_STATUS.succeeded) {
      setVisibleModalAddInfo(false)
      if (!!customerCare?.message) {
        message.success(customerCare?.message)
      }
    }
  }, [customerCare.loading])

  useEffect(() => {
    if (customerCare.customerId > 0) {
      dispatch(getData({customerId: customerCare.customerId}))
    }
  }, [customerCare.customerId])

  return (
    <>
      <Col span={11} className="customer-care__right">
        <div className="customer-care__right--top">
          <Checkbox className="checkbox-item">{t('customer care.no more potential')}</Checkbox>
        </div>
        <div className="customer-care__right--event">
          <div className="customer-care__right--event--left">
            <h5>{t('customer care.history title')}</h5>
            <FilterCommon options={options} setPayload={setOptionsFilter}></FilterCommon>
          </div>
        </div>
        <div className="customer-care__right--list">
          {table}
          <div className="customer-care__right--list-footer">
            <Button className="btn-add-new" icon={<img src={IconPlus} alt=""/>} onClick={(() => addModal())}>{t('customer care.add info title')}</Button>
          </div>
        </div>
        <div className="customer-care__right--info">
          <h3><img src={IconFiles} alt=""/>{t('customer care.sync info')}</h3>
          <ul>
            <li>27 tuổi, 1 vợ, 2 con, chưa có nhà, đang làm nghề môi giới chứng khóa</li>
            <li>Thu nhập 62 triệu</li>
          </ul>
        </div>
      </Col>
      <ModalCommon isVisible={visibleModalAddInfo} setIsVisible={setVisibleModalAddInfo} title={Object.keys(detailData).length > 0 ? t(('customer care.edit info title')) : t(('customer care.add info title'))} width={770} content={<AddInfoContent onFinish={handleSaveInfo} detailData={detailData} setVisibleModalAddInfo={setVisibleModalAddInfo}/>} />
    </>

  );
}
