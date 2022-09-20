import {React, useEffect, useState} from 'react';
import {Pagination} from 'antd';
import {PAGE_SIZE_OPTIONS, DEFAULT_SIZE} from '../../ultis/constant'

export default function PaginationCommon(props) {
  const [page, setPage]= useState(null)
  const {
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    defaultPageSize = DEFAULT_SIZE,
    total,
    showSizeChanger = true,
  } = props;
  const onShowSizeChange= (current, pageSize) => {
    props.onShowSizeChange(current, pageSize)
  };
  return (total > DEFAULT_SIZE && <Pagination pageSizeOptions={pageSizeOptions} defaultPageSize={defaultPageSize} onChange={onShowSizeChange} total={total} showSizeChanger={showSizeChanger}/>)
}
