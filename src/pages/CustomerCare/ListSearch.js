import React, {useEffect, useState} from 'react';
import {Col} from 'antd';
import InputSearch from '../../components/InputSearch';
import FilterCommon from '../../components/FilterCommon';
import ListCommon from '../../components/ListCommon';
import {TYPE_LIST_CUSTOMERS} from '../../ultis/constant';
import {useDispatch} from "react-redux";
import {searchData} from "../../slices/customerCare";

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

export default function ListSearch() {
  const [selectId, setSelectId] = useState(0);
  const [payload, setPayload] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(payload)
    dispatch(searchData())
  }, [payload])

  useEffect(() => {
    // get id

  }, [selectId])

  return (
    <Col span={3} className="customer-care__left">
      <InputSearch setPayload={setPayload}></InputSearch>
      <FilterCommon></FilterCommon>
      <ListCommon type={TYPE_LIST_CUSTOMERS} dataList={dataSource} selectId={selectId} setSelectId={setSelectId}></ListCommon>
    </Col>
  );
}
