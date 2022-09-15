import React from 'react';
import { Pagination } from 'antd';

export default function PaginationCommon(props) {
  return (<Pagination pageSizeOptions={['10', '20', '30']} defaultPageSize={10} total={50} showSizeChanger={true} />)
}
