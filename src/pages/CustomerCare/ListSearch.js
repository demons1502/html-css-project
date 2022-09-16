import React, {useEffect, useState} from 'react';
import {Col} from 'antd';
import InputSearch from '../../components/InputSearch';
import FilterCommon from '../../components/FilterCommon';
import ListCommon from '../../components/ListCommon';
import {TYPE_LIST_CUSTOMERS} from '../../ultis/constant';
import {useDispatch} from "react-redux";
import {searchData} from "../../slices/customerCare";
import {getCustomer} from '../../services/customers'

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
  const [payload, setPayload] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();

  const getDataCustomer = async () => {
    const {data} = await getCustomer();
    setDataSource(data?.data);
  }

  useEffect(() => {
    // dispatch(searchData())
  }, [payload])

  useEffect(() => {
    // get id

  }, [selectId])

  useEffect(() => {
    getDataCustomer()
  }, [])

  return (
    <Col span={4} className="customer-care__left">
      <InputSearch setPayload={setPayload}></InputSearch>
      <FilterCommon options={options} setPayload={setPayload}></FilterCommon>
      <ListCommon type={TYPE_LIST_CUSTOMERS} dataList={dataSource} selectId={selectId} setSelectId={setSelectId}></ListCommon>
    </Col>
  );
}
