import React, {useEffect, useState} from 'react';
import {Col} from 'antd';
import InputSearch from '../../components/InputSearch';
import FilterCommon from '../../components/FilterCommon';
import ListCommon from '../../components/ListCommon';
import {TYPE_LIST_CUSTOMERS} from '../../ultis/constant';
import {getCustomers} from '../../services/customers';
import PaginationCommon from '../../components/PaginationCommon';
import {setCustomerId} from '../../slices/customerCare';
import {useDispatch} from "react-redux";

const options = [
  {label: 'Không còn tiềm năng, dừng tư vấn', value: 1},
  {label: 'Chưa gọi điện', value: 2},
  {label: 'Đã gọi điện lần 1, cần gọi lần 2', value: 3},
  {label: 'Đã có lịch hẹn gặp khảo sát', value: 4},
  {label: 'Đã khảo sát, chờ lịch tư vấn tài chính', value: 5},
  {label: 'Đã có lịch tư vấn tài chính', value: 6},
  {label: 'Đã tư vấn tài chính, chờ lịch hẹn tư vấn  giải pháp', value: 7},
  {label: 'Đã tư vấn giải pháp, chờ chốt kết quả', value: 8},
  {label: 'Đã chốt kết quả, chờ thông tin hợp đồng', value: 9},
  {label: 'Đã có hợp đồng', value: 10},
  {label: 'Chăm sóc khách hàng cho hợp đồng tiếp theo', value: 11}
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
    dispatch(setCustomerId(data?.data[0].customerId))
    setSelectId(data?.data[0].customerId)
  }

  useEffect(() => {
    getDataCustomer({name: keyword})
  }, [keyword])

  useEffect(() => {

  }, [optionsFilter])

  useEffect(() => {
    dispatch(setCustomerId(selectId))
  }, [selectId])

  return (
    <Col span={4} className="customer-care__left">
      <InputSearch setPayload={setKeyword}></InputSearch>
      <FilterCommon options={options} setPayload={setOptionsFilter}></FilterCommon>
      <ListCommon type={TYPE_LIST_CUSTOMERS} dataList={dataSource} selectId={selectId} setSelectId={setSelectId}></ListCommon>
      <PaginationCommon total={total} showSizeChanger={false}/>
    </Col>
  );
}