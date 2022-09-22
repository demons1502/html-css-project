import React from 'react';
import {Pagination, PaginationProps } from 'antd';
import {PAGE_SIZE_OPTIONS, DEFAULT_SIZE} from '../../../ultis/constant'

export default function PaginationCommon(props) {
  const {
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    defaultPageSize = DEFAULT_SIZE,
    total,
    showSizeChanger = true,
    setPaginate
  } = props;

  const onChange = (page, pageSize) => {
    setPaginate({limit: pageSize, offset: page - 1})
  }

  const onShowSizeChange = (current, pageSize) => {
    // setPaginate({limit: pageSize, offset: current - 1})
  };

  return (total > DEFAULT_SIZE && <Pagination onChange={onChange} defaultPageSize={defaultPageSize} total={total} pageSizeOptions={pageSizeOptions} showSizeChanger={showSizeChanger} onShowSizeChange={onShowSizeChange}/>)
}
