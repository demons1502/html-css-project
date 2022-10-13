import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaginationCommon from '../../components/common/Pagination';
import { getMissedAppointments, setCSKHForAppointments } from '../../slices/dashboard';
import MissedItemDateTime from './commons/MissedAppointment/missed-item-col-date-time';
import MissedItemName from './commons/MissedAppointment/missed-item-col-name';
import { limitItem, offsetItem } from './constants';
import * as S from './styles';

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
  const navigate = useNavigate();

  const handleCSKH = (value) => {
    const customerId = value?.customerApptRecords[0]?.customerId || 0;
    dispatch(setCSKHForAppointments({ customerId, isCare: true }));
    navigate(`/customer-care?customerId=${customerId}`);
  };

  const columns = [
    {
      dataIndex: 'host',
      key: 'host',
      ellipsis: true,
      render: (_, record) => <MissedItemName record={record} />,
    },
    {
      dataIndex: 'time',
      key: 'time',
      width: 140,
      render: (_, record) => <MissedItemDateTime record={record} />,
    },
    {
      key: 'action',
      width: 120,
      render: (_, record) => (
        <S.WrapButtonTable $center>
          <S.Button $width="87px" $height="30px" $type="ghost" onClick={() => handleCSKH(record)}>
            CSKH
          </S.Button>
        </S.WrapButtonTable>
      ),
    },
  ];

  useEffect(() => {
    const payload = {
      limit,
      offset,
      endDate: decodeURIComponent(moment().utc()),
      isCare: false,
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
          showHeader={false}
          loading={loading}
          $height="320px"
          $borderBottom={dataTable.length === 0 ? false : ''}
          $heightRow="63px"
          $paddingCel="5px"
        />
      </S.WrapContent>
      <S.WrapPagination span={24}>
        <PaginationCommon total={total} showSizeChanger={false} setPaginate={setPaginate} pageSize={limit} />
      </S.WrapPagination>
    </S.WrapContainer>
  );
}
