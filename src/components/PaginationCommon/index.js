import React from 'react';
import {Pagination} from 'antd';
import {PAGE_SIZE_OPTIONS, DEFAULT_SIZE} from '../../ultis/constant'

export default function PaginationCommon(props) {
  const {
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    defaultPageSize = DEFAULT_SIZE,
    total,
    showSizeChanger = true
  } = props;

  return (total > DEFAULT_SIZE && <Pagination pageSizeOptions={pageSizeOptions} defaultPageSize={defaultPageSize} total={total} showSizeChanger={showSizeChanger}/>)
}
