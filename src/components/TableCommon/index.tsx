import {useEffect, useState} from 'react';
import {Table} from 'antd';

export default function TableCommon(props: any) {
    const {
        dataSource,
        columnTable,
        nameTable,
        widthTable = 1300,
        isSelection = false
    } = props;
    const [columns, setColumns] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        if (dataSource.length > 0) {
            const tempColumns: any = [];
            columnTable.forEach((item: any) => {
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

    const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        setSelectedRowKeys(selectedRows);
    };

    const rowSelection = {
        onChange: onSelectChange,
    };

    return (
        <Table
            rowSelection={isSelection ? rowSelection : undefined}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className='table-common'
            bordered={false}
            key={nameTable}
            scroll={{x: widthTable, scrollToFirstRowOnChange: false}}>
            {props.children}
        </Table>
    );
}
