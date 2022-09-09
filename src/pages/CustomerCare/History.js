import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Col, Checkbox, Button, Empty} from 'antd';
import {createData, retrieveData} from '../../slices/customerCare';
import TableCommon from '../../components/TableCommon';
import IconPlus from '../../assets/images/icons/plus.svg';
import _ from 'lodash';

const dataSource = [
  {
    key: 1,
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: 2,
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '',
    dataIndex: 'address',
    key: 'address',
  },
];

export default function History() {
  const {t} = useTranslation();
  const customerCare = useSelector((state) => state.customerCare);
  const [dataTable, setDataTable] = useState(dataSource);
  const dispatch = useDispatch();

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

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return <TableCommon dataSource={dataTable} columnTable={columns}></TableCommon>
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [dataTable])

  return (
    <Col span={11} className="customer-care__right">
      <div className="customer-care__right--top">
        <Checkbox className="checkbox-item">Không còn tiềm năng</Checkbox>
      </div>
      <div className="customer-care__right--event">
        <h5>{t('customer care.history title')}</h5>
        <Button type="primary" className="btn-primary" onClick={saveData}>{t('common.save')}</Button>
      </div>
      <div className="customer-care__right--list">
        {table}
        <Button className="btn-add-new" icon={<img src={IconPlus} alt=""/>} onClick={addRow}>{t('customer care.add event')}</Button>
      </div>
    </Col>
  );
}
