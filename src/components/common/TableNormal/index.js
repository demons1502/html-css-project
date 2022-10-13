import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { LOADING_STATUS } from '../../../ultis/constant';

export default function TableCommon(props) {
  const loading = useSelector((state) => state.loading);
  const {
    dataSource,
    columnTable,
    pagination = false,
    isSelection = false,
    bordered = false,
    setSelectedRowKeys,
    key= 'id',
  } = props;

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRows);
  };

  const rowSelection = {
    onChange: onSelectChange,
  };

  return (
    <Table
      {...props}
      loading={loading.loading === LOADING_STATUS.pending ? true : false}
      rowSelection={isSelection ? rowSelection : undefined}
      dataSource={dataSource}
      columns={columnTable}
      pagination={pagination}
      bordered={bordered}
      className={`${props.className} table-common`}
      rowKey={key}
      // scroll={isScroll ?
      //   {
      //     y: `calc(100vh - ${heightMargin}px)`,
      //     scrollToFirstRowOnChange: false
      //   }
      //   :
      //   {}}
    >
      {props.children}
    </Table>
  );
}
