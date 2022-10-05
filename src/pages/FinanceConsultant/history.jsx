import { Col, Empty } from 'antd';
import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/common/TableNormal';
import { formatDataNumber, getTimeByTZ } from '../../helper/';
import { getConsultById } from '../../services/financialConsultant';
import { getConsult } from '../../slices/consult';
import { createData } from '../../slices/customerCare';
import { getConsultants, getConsultantsById } from '../../slices/financialConsultant';

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
  const { setHistory, id } = props;
  const { t } = useTranslation();
  const customerCare = useSelector((state) => state.customerCare);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.financialConsultant);
  const columns = [
    {
      title: 'Ngày tháng',
      key: 'stt',
      render: (record) => {
        return <span>{getTimeByTZ(record.createAt)}</span>;
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
    dispatch(getConsultants(payload));
  }, [id]);

  return (
    <Col span={24} className="financialConsultant-history">
      <Table
        dataSource={data}
        columnTable={columns}
        className="financialConsultant-table"
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => setHistory(record),
          };
        }}
      />
    </Col>
  );
}
