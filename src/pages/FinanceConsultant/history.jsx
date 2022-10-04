import { Col, Empty, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import Table from '../../components/common/TableNormal';
import { formatDataNumber } from '../../helper/';
import { createData } from '../../slices/customerCare';

const dataSource = [
  {
    key: 1,
    date: '12/04/2022',
    info: 'Tên gợi nhớ 1',
    content: '60000000',
  },
  {
    key: 2,
    date: '12/04/2022',
    info: 'Tên gợi nhớ 2',
    content: '84000000',
  },
  {
    key: 3,
    date: '12/04/2022',
    info: 'Tên gợi nhớ 3',
    content: '54000000',
  },
  {
    key: 4,
    date: '12/04/2022',
    info: 'Tên gợi nhớ 4',
    content: '68000000',
  },
];

export default function History(props) {
  const { setHistory } = props;
  const { t } = useTranslation();
  const customerCare = useSelector((state) => state.customerCare);
  const [dataTable, setDataTable] = useState(dataSource);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Ngày tháng',
      dataIndex: 'date',
      key: 'stt',
    },
    {
      title: 'Tên gợi nhớ',
      dataIndex: 'info',
      key: 'date',
    },
    {
      title: 'Tổng chi tiêu',
      dataIndex: 'content',
      key: 'content',
      render: (record) => {
        return <span>{formatDataNumber(record)}</span>;
      },
    },
  ];

  // const initFetch = useCallback(() => {
  //   dispatch(getData());
  // }, [dispatch]);

  // useEffect(() => {
  //   initFetch();
  // }, [initFetch]);

  // useEffect(() => {
  //   //re render
  // }, [customerCare]);

  const saveData = (e) => {
    dispatch(
      createData({
        id: 1,
        title: e.target.value,
      })
    );
  };

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return <Table dataSource={dataTable} columnTable={columns} className="financialConsultant-table" />;
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  }, [dataTable]);

  return (
    <Col span={24} className="financialConsultant-history">
      <Table
        dataSource={dataTable}
        columns={columns}
        className="financialConsultant-table"
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => setHistory(record),
          };
        }}
      />
      {/* {table} */}
    </Col>
  );
}
