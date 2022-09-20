import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Col, Checkbox, Button, Empty, Spin} from 'antd';
import {getData} from '../../slices/customerCare';
import TableCommon from '../../components/TableCommon';
import IconPlus from '../../assets/images/icons/plus.svg';
import IconFiles from '../../assets/images/icons/files.svg';
import FilterCommon from "../../components/FilterCommon";
import AddInfoContent from "../../components/ModalCommon/CustomerCare/AddInfoContent";
import ModalCommon from "../../components/ModalCommon";
import {CUSTOMER_CARE_INFO, LOADING_STATUS } from '../../ultis/constant';

export default function History() {
  const {t} = useTranslation();
  const loading = useSelector((state) => state.loading.loading);
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
          <span>{record.info}</span>
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

  const table = useMemo(() => {
    if (!!customerCare.data && customerCare.data.length > 0) {
      return <TableCommon dataSource={customerCare.data} columnTable={columns}></TableCommon>
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [customerCare.data])

  useEffect(() => {
    if (customerCare.customerId > 0) {
      dispatch(getData({customerId: customerCare.customerId, info: CUSTOMER_CARE_INFO[0].value}))
    }
  }, [customerCare.customerId])

  useEffect(() => {
    if (customerCare.customerId > 0) {
      dispatch(getData({customerId: customerCare.customerId, info: optionsFilter[0]}))
    }
  }, [optionsFilter])

  useEffect(() => {
    if (loading === LOADING_STATUS.succeeded) {
      setVisibleModalAddInfo(false)
    }
  }, [loading])

  return (
    <>
      <Col span={11} className="customer-care__right">
        <div className="customer-care__right--top">
          <Checkbox className="checkbox-item">{t('customer care.no more potential')}</Checkbox>
        </div>
        <div className="customer-care__right--event">
          <div className="customer-care__right--event--left">
            <h5>{t('customer care.history title')}</h5>
            <FilterCommon options={CUSTOMER_CARE_INFO} setPayload={setOptionsFilter}></FilterCommon>
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
      <ModalCommon isVisible={visibleModalAddInfo} setIsVisible={setVisibleModalAddInfo} title={Object.keys(detailData).length > 0 ? t(('customer care.edit info title')) : t(('customer care.add info title'))} width={770} content={<AddInfoContent detailData={detailData} setVisibleModalAddInfo={setVisibleModalAddInfo}/>} />
    </>

  );
}
