import React from 'react';
import {TYPE_LIST_NORMAL, TYPE_LIST_CUSTOMERS} from '../../ultis/constant'
import ListCustomerItem from '../ListCustomerItem'
import ListNormalItem from "../ListNormalItem";

export default function ListCommon(props) {
  const {
    type = TYPE_LIST_NORMAL,
    dataList,
    selectId,
    setSelectId
  } = props;

  const listItem = dataList.map((val, index) => {
    if (type === TYPE_LIST_CUSTOMERS) {
      return <ListCustomerItem data={val} key={index} selectId={selectId} setSelectId={setSelectId}/>
    } else {
      return <ListNormalItem data={val} key={index} selectId={selectId} setSelectId={setSelectId}/>
    }
  });

  return <div className="list-item">{listItem}</div>;
}
