import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PaginationCommon from '../../components/common/Pagination';
import { getMissedAppointments } from '../../slices/dashboard';
import MissedItemDateTime from './commons/MissedAppointment/missed-item-col-date-time';
import MissedItemName from './commons/MissedAppointment/missed-item-col-name';
import { limitItem } from './constants';
import * as S from './styles';

const handleCSKH = (value) => {
  console.log('Value:', value);
};
const columns = [
  {
    dataIndex: 'host',
    key: 'apptId',
    render: (_, record) => <MissedItemName record={record} />,
  },
  {
    dataIndex: 'time',
    key: 'apptId',
    render: (_, record) => <MissedItemDateTime record={record} />,
  },
  {
    dataIndex: '',
    key: 'apptId',
    render: (record) => (
      <S.WrapButtonTable>
        <S.Button $type="ghost" onClick={() => handleCSKH(record)}>
          CSKH
        </S.Button>
      </S.WrapButtonTable>
    ),
  },
];

export default function MissedAppointment() {
  const { t } = useTranslation();
  const result = useSelector((state) => state.dashboard.missedAppointments);
  const loading = useSelector((state) => state.dashboard.loading);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(limitItem);
  const [dataTable, setDataTable] = useState(result.data || []);
  const [total, setTotal] = useState(result.count || 0);

  useEffect(() => {
    const payload = {
      limit,
      offset,
      endDate: decodeURIComponent(moment()),
    };
    dispatch(getMissedAppointments(payload));
  }, [dispatch, limit, offset]);

  useEffect(() => {
    setDataTable(result.data || []);
    setTotal(result.count || 0);
  }, [result]);

  const setPaginate = (value) => {
    setOffset(value.offset);
    setLimit(value.limit);
  };

  return (
    <S.WrapContainer $toggle={toggle} $maxHeight="442px">
      <S.WrapTitle $toggle={toggle}>
        <S.IconDown onClick={() => setToggle(!toggle)} />
        <S.Title>{t('dashboard-page.missed-appointment')}</S.Title>
      </S.WrapTitle>
      <S.WrapContent $display={!toggle ? 'block' : 'none'}>
        <S.Table
          dataSource={dataTable}
          columns={columns}
          pagination={false}
          bordered={false}
          scroll={{ scrollToFirstRowOnChange: false }}
          showHeader={false}
          loading={loading}
          $height="290px"
          $endLine
          $borderBottom={dataTable.length > 0 ? '' : false}
        />
        <PaginationCommon total={total} showSizeChanger={false} setPaginate={setPaginate} pageSize={limit} />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
