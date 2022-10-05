import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/common/TableNormal';
import { formatDataNumber, getTimeByTZ } from '../../helper/';
import { getConsultants } from '../../slices/financialConsultant';

export default function History(props) {
  const { setHistory, id } = props;
  const [activeRow, setActiveRow] = useState(null);

  const dispatch = useDispatch();
  const { data, isReload } = useSelector((state) => state.financialConsultant);

  const columns = [
    {
      title: 'Ngày tháng',
      key: 'stt',
      render: (record) => {
        return <span>{getTimeByTZ(record.createdAt)}</span>;
      },
    },
    {
      title: 'Tên gợi nhớ',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Tổng chi tiêu',
      dataIndex: '',
      key: 'content',
      render: (record) => {
        const total = record?.consultAttrs.reduce((curr, acc) => curr + acc.value, 0);
        return <span>{formatDataNumber(total)}</span>;
      },
    },
  ];

  useEffect(() => {
    const payload = { limit: 10, offset: 0, customerId: id };
    id && dispatch(getConsultants(payload));
  }, [id, isReload]);

  return (
    <Col span={24} className="financialConsultant-history">
      <Table
        dataSource={data}
        columnTable={columns}
        className="financialConsultant-table table-common"
        rowClassName={(record) => (activeRow === record.id ? 'active' : '')}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              setHistory(record);
              setActiveRow(record.id);
            },
          };
        }}
      />
    </Col>
  );
}
