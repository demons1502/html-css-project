import React, {useEffect, useState} from 'react';
import {Col} from 'antd';
import InputSearch from '../../components/common/InputSearch';
import Filter from '../../components/common/Filter';
import List from '../../components/common/List';
import {TYPE_LIST_CUSTOMERS, DEFAULT_SIZE, CUSTOMER_CARE_INFO, CUSTOMER_FILTER_OPTIONS} from '../../ultis/constant';
import {getCustomers} from '../../services/customers';
import Pagination from '../../components/common/Pagination';
import {getData, setCustomerData, resetCustomerData} from '../../slices/customerCare';
import {resetEvents} from '../../slices/events';
import {useDispatch} from "react-redux";

export default function ListSearch() {
  const [selectId, setSelectId] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [optionsFilter, setOptionsFilter] = useState('')
  const [listCustomer, setListCustomer] = useState([])
  const [total, setTotal] = useState([])
  const dispatch = useDispatch()
  const [paginate, setPaginate] = useState({
    limit: DEFAULT_SIZE,
    offset: 0
  });

  const getDataCustomer = async (payload) => {
    const {data} = await getCustomers(payload)
    if (data?.data.length > 0) {
      setListCustomer(data?.data)
      setTotal(data?.count)
      setSelectId(data?.data[0].customerId)
    } else {
      dispatch(resetCustomerData())
      dispatch(resetEvents())
    }
  }

  useEffect(() => {
    if (selectId > 0) {
      const customerData = listCustomer.find((data) => data.customerId === selectId)
      dispatch(setCustomerData(customerData))
      dispatch(getData({customerId: customerData.customerId, info: CUSTOMER_CARE_INFO[0].value}))
    }
  }, [selectId])

  useEffect(() => {
    let offset = (paginate.offset - 1) * paginate.limit;
    getDataCustomer({...{name: keyword}, ...{offset: offset, limit: paginate.limit, status: optionsFilter}})
  }, [keyword, paginate, optionsFilter])

  return (
    <>
      <InputSearch setPayload={setKeyword} />
      <Filter options={CUSTOMER_FILTER_OPTIONS} setPayload={setOptionsFilter} />
      <List type={TYPE_LIST_CUSTOMERS} dataList={listCustomer} selectId={selectId} setSelectId={setSelectId} />
      <Pagination total={total} showSizeChanger={false} setPaginate={setPaginate} />
    </>
  );
}