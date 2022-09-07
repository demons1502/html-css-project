import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Row, Col} from 'antd';
import {createData, retrieveData} from '../../slices/customerCare';
import InputSearch from "../../components/InputSearch";
import FilterCommon from "../../components/FilterCommon";
import ListCommon from "../../components/ListCommon";
import {TYPE_LIST_CUSTOMERS} from '../../ultis/constant';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
]

export default function CustomerCare() {
  const {t} = useTranslation();
  const customerCare = useSelector((state) => state.customerCare);
  const [customer] = useState({
    id: 1,
    title: 'user'
  });
  const [selectId, setSelectId] = useState(0);
  const dispatch = useDispatch();

  const saveTutorial = (e) => {
    dispatch(createData({
      id: 1,
      title: e.target.value,
    }));
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveData());
  }, [dispatch]);

  useEffect(() => {
    console.log(initFetch);
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    console.log(customerCare);
  }, [customerCare]);

  useEffect(() => {
    // get id
    console.log(selectId)
  }, [selectId])

  return (
    <div className="content-box customer-care">
      <h3>{t('customer care.title')}</h3>
      <Row>
        <Col span={3} className="customer-care__left">
          <InputSearch></InputSearch>
          <FilterCommon></FilterCommon>
          <ListCommon type={TYPE_LIST_CUSTOMERS} dataList={dataSource} selectId={selectId} setSelectId={setSelectId}></ListCommon>
        </Col>
        <Col span={10}>col-4</Col>
        <Col span={11}>col-4</Col>
      </Row>
    </div>
  );
}
