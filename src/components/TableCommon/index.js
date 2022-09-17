import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'antd';

export default function TableCommon(props) {
  const {
    dataSource,
    columnTable,
    nameTable,
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
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (dataSource.length > 0) {
      const tempColumns = [];
      columnTable.forEach((item) => {
        const tempItem = {
          ...item,
          title: item.title ? item.title : item.name,
          key: item.key,
          dataIndex: item.dataIndex,
          width: item.width,
        };
        tempColumns.push(tempItem);
      });

      setColumns(tempColumns);
    }
  }, [dataSource]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRows);
    }
  }

  return (
    <Table
      rowSelection={{ ...rowSelection }}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      className='table-common '
      bordered={bordered}
      key={nameTable}
      scroll={scroll}
      rowKey={(record)=>record.id}
    >
      {props.children}
    </Table>
  );
}
