import React, {useEffect, useState} from 'react';
import {Col, Spin} from 'antd';
import InputSearch from '../../components/InputSearch';
import FilterCommon from '../../components/FilterCommon';
import ListCommon from '../../components/ListCommon';
import {TYPE_LIST_CUSTOMERS} from '../../ultis/constant';
import {getCustomers} from '../../services/customers';
import PaginationCommon from '../../components/PaginationCommon';
import {getData} from '../../slices/customerCare';
import {useDispatch, useSelector} from "react-redux";

const options = [
  {label: 'Chưa gọi điện', value: 1},
  {label: 'Đã gọi điện lần 1, cần gọi lần 2', value: 2},
  {label: 'Đã gọi điện từ 2 lần', value: 3},
  {label: 'Đã khảo sát, chờ lịch tư vấn tài chính', value: 4},
  {label: 'Đã tư vấn giải pháp, chờ chốt kết quả', value: 5},
  {label: 'Đã khảo sát, chờ lịch tư vấn tài chính', value: 6},
];

export default function ListSearch() {
  const [selectId, setSelectId] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [optionsFilter, setOptionsFilter] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState([]);
  const dispatch = useDispatch();

  const getDataCustomer = async (payload) => {
    const {data} = await getCustomers(payload);
    setDataSource(data?.data);
    setTotal(data?.count);
  }

  useEffect(() => {
    getDataCustomer({name: keyword})
  }, [keyword])

  useEffect(() => {
    console.log(optionsFilter)
    // getDataCustomer({name: keyword})
  }, [optionsFilter])

  useEffect(() => {
    console.log('aaa')
    getDataCustomer()
  }, [])

  useEffect(() => {
    dispatch(getData({customerId: selectId}))
  }, [selectId])

  return (
    <Col span={4} className="customer-care__left">
      <InputSearch setPayload={setKeyword}></InputSearch>
      <FilterCommon options={options} setPayload={setOptionsFilter}></FilterCommon>
      {/*<Spin spinning={customerCare.isLoading}>*/}
      <ListCommon type={TYPE_LIST_CUSTOMERS} dataList={dataSource} selectId={selectId} setSelectId={setSelectId}></ListCommon>
      {/*</Spin>*/}
      <PaginationCommon total={total} showSizeChanger={false}/>
    </Col>
  );
}
