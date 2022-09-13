import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Col, Checkbox, Button, Empty} from 'antd';
import {createData, retrieveData, searchData} from '../../slices/customerCare';
import TableCommon from '../../components/TableCommon';
import IconPlus from '../../assets/images/icons/plus.svg';
import IconFiles from '../../assets/images/icons/files.svg';
import FilterCommon from "../../components/FilterCommon";
import SendSmsContent from "../../components/ModalCommon/SendSmsContent";
import ModalCommon from "../../components/ModalCommon";

const dataSource = [
  {
    key: 0,
    date: '12/04/2022',
    info: 'Thông tin thu nhập',
    content: '10 Downing Street'
  },
  {
    key: 1,
    date: '12/04/2022',
    info: 'Thông tin thu nhập',
    content: '10 Downing Street'
  },
  {
    key: 2,
    date: '12/04/2022',
    info: 'Thông tin thu nhập',
    content: '10 Downing Street'
  },
  {
    key: 3,
    date: '12/04/2022',
    info: 'Thông tin thu nhập',
    content: '10 Downing Street'
  },
]

const options = [
  { label: 'Chưa gọi điện', value: 1 },
  { label: 'Đã gọi điện lần 1, cần gọi lần 2', value: 2 },
  { label: 'Đã gọi điện từ 2 lần', value: 3 },
  { label: 'Đã khảo sát, chờ lịch tư vấn tài chính', value: 4 },
  { label: 'Đã tư vấn giải pháp, chờ chốt kết quả', value: 5 },
  { label: 'Đã khảo sát, chờ lịch tư vấn tài chính', value: 6 },
];

export default function History() {
  const {t} = useTranslation();
  const customerCare = useSelector((state) => state.customerCare);
  const [dataTable, setDataTable] = useState(dataSource);
  const [payload, setPayload] = useState('');
  const [sendSms, setSendSms] = useState(false);
  const dispatch = useDispatch();

  const columns = [
    {
      title: t('common.date'),
      dataIndex: 'date',
      key: 'stt',
    },
    {
      title: t('common.type info'),
      dataIndex: 'info',
      key: 'date',
    },
    {
      title: t('common.content'),
      dataIndex: 'content',
      key: 'content',
    }
  ];

  const initFetch = useCallback(() => {
    dispatch(retrieveData());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    console.log(payload)
    dispatch(searchData())
  }, [payload])

  useEffect(() => {
    //re render
  }, [customerCare]);

  const addRow = () => {
    setSendSms(true);
  }

  const saveData = (e) => {
    dispatch(createData({
      id: 1,
      title: e.target.value,
    }));
  };

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return <TableCommon dataSource={dataTable} columnTable={columns}></TableCommon>
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [dataTable])

  return (
    <>
      <Col span={11} className="customer-care__right">
        <div className="customer-care__right--top">
          <Checkbox className="checkbox-item">{t('customer care.no more potential')}</Checkbox>
        </div>
        <div className="customer-care__right--event">
          <div className="customer-care__right--event--left">
            <h5>{t('customer care.history title')}</h5>
            <FilterCommon options={options} setPayload={setPayload}></FilterCommon>
          </div>
          <Button type="primary" className="btn-primary" onClick={saveData}>{t('common.save')}</Button>
        </div>
        <div className="customer-care__right--list">
          {table}
          <div className="customer-care__right--list-footer">
            <Button className="btn-add-new" icon={<img src={IconPlus} alt=""/>} onClick={addRow}>{t('customer care.add event')}</Button>
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
      <ModalCommon isVisible={sendSms} setIsVisible={setSendSms} title="Gửi SMS/Email" content={<SendSmsContent />}></ModalCommon>
    </>

  );
}
