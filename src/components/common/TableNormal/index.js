import React from 'react';
import { Table } from 'antd';

export default function TableCommon(props) {
  const {
    dataSource,
    columnTable,
    isSelection = false,
    bordered = false,
    heightMargin = 340,
    isScroll = false,
    setSelectedRowKeys,
    scroll = isScroll
      ? {
        y: `calc(100vh - ${heightMargin}px)`,
        scrollToFirstRowOnChange: false,
      }
      : {},
  } = props;

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRows);
  };

  const rowSelection = {
    onChange: onSelectChange,
  };

  return <Table
    rowSelection={isSelection ? rowSelection : undefined}
    dataSource={dataSource}
    columns={columnTable}
    pagination={false}
    className='table-common'
    bordered={bordered}
    rowKey="id"
    scroll={scroll}>
    {props.children}
  </Table>
}
