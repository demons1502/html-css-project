import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Col, Progress, Button, Empty} from 'antd';
import {createData, retrieveData} from '../../slices/customerCare';
import TableCommon from '../../components/TableCommon';
import IconPlus from '../../assets/images/icons/plus.svg';
import _ from 'lodash';

const dataSource = [
  {
    key: 1,
    date: 'Mike',
    content: 32,
  },
  {
    key: 2,
    date: 'Mike',
    content: 32,
  },
]

export default function ListEvent() {
  const {t} = useTranslation();
  const customerCare = useSelector((state) => state.customerCare);
  const [dataTable, setDataTable] = useState(dataSource);
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
      width:'20%',
      render: () => {
        return (
          <>
            <Button className="btn-add-new" icon={<img src={IconPlus} alt=""/>} onClick={sendSms}>{t('customer care.sms')}</Button>
            <Button className="btn-add-new" icon={<img src={IconPlus} alt=""/>} onClick={sendEmail}>{t('customer care.email')}</Button>
          </>
        )
      },
    },
  ];

  const initFetch = useCallback(() => {
    dispatch(retrieveData());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    //re render
  }, [customerCare]);

  const addRow = () => {
    const rowData = {
      key: 0,
      name: '',
      age: 42,
      address: '10 Downing Street',
    }

    let lastValue = _.last(dataTable);
    rowData.key = lastValue.key + 1;
    setDataTable([rowData, ...dataTable]);
  }

  const saveData = (e) => {
    dispatch(createData({
      id: 1,
      title: e.target.value,
    }));
  };

  const sendSms = () => {
    console.log('send sms')
  }

  const sendEmail = () => {
    console.log('send email')
  }

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return <TableCommon dataSource={dataTable} columnTable={columns}></TableCommon>
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [dataTable])

  return (
    <Col span={10} className="customer-care__center">
      <div className="customer-care__center--progress">
        <span>{t('common.progress')}</span>
        <Progress percent={60}/>
      </div>
      <div className="customer-care__center--event">
        <h5>{t('customer care.event title')}</h5>
        <Button type="primary" className="btn-primary" onClick={saveData}>{t('common.save')}</Button>
      </div>
      <div className="customer-care__center--list">
        {table}
        <Button className="btn-add-new" icon={<img src={IconPlus} alt=""/>} onClick={addRow}>{t('customer care.add event')}</Button>
      </div>
    </Col>
  );
}
