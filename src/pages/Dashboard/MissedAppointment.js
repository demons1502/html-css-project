import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaginationCommon from '../../components/common/Pagination';
import { getMissedAppointments } from '../../slices/dashboard';
import MissedItemDateTime from './commons/MissedAppointment/missed-item-col-date-time';
import MissedItemName from './commons/MissedAppointment/missed-item-col-name';
import { limitItem, offsetItem } from './constants';
import * as S from './styles';
const navigate = useNavigate();

const handleCSKH = () => {
  navigate('/customer-care');
};
const columns = [
  {
    dataIndex: 'host',
    key: 'host',
    render: (_, record) => <MissedItemName record={record} />,
  },
  {
    dataIndex: 'time',
    key: 'time',
    render: (_, record) => <MissedItemDateTime record={record} />,
  },
  {
    key: 'action',
    render: () => (
      <S.WrapButtonTable>
        <S.Button $type="ghost" onClick={handleCSKH}>
          CSKH
        </S.Button>
      </S.WrapButtonTable>
    ),
  },
];

export default function MissedAppointment() {
  const { t } = useTranslation();
  const result = useSelector((state) => state.dashboard.missedAppointments);
  const loading = useSelector((state) => state.dashboard.loadingMissedAppointment);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [offset, setOffset] = useState(offsetItem);
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
    <S.WrapContainer $toggle={toggle}>
      <S.WrapTitle $toggle={toggle}>
        <S.IconDown onClick={() => setToggle(!toggle)} />
        <S.Title>{t('dashboard-page.missed-appointment')}</S.Title>
      </S.WrapTitle>
      <S.WrapContent $display={!toggle ? 'block' : 'none'}>
        <S.Table
          dataSource={dataTable}
          columns={columns}
          rowKey={(record) => record.apptId}
          pagination={false}
          bordered={false}
          scroll={{ x: dataTable.length > 0 && 460 }}
          showHeader={false}
          loading={loading}
          $height="320px"
          $endLine
          $borderBottom={dataTable.length < 5 ? (dataTable.length === 0 ? false : '') : false}
          $heightRow="63px"
        />
        <PaginationCommon total={total} showSizeChanger={false} setPaginate={setPaginate} pageSize={limit} />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
