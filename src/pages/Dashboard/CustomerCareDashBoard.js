import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PaginationCommon from '../../components/common/Pagination';
import { getCustomerCares, getRemindFees } from '../../slices/dashboard';
import CustomerItemBirthday from './commons/CustomerCareDashboard/customer-item-col-birthday';
import CustomerItemRemind from './commons/CustomerCareDashboard/customer-item-col-remind';
import { limitItem, offsetItem } from './constants';
import * as S from './styles';

const handleCSKH = (value) => {
  console.log('Value:', value);
};
const columnCustomerCare = [
  {
    dataIndex: 'fullname',
    key: 'fullname',
    render: (text, record) => <CustomerItemBirthday record={record} />,
  },
  {
    dataIndex: '',
    key: '',
    render: (record) => (
      <S.WrapButtonTable>
        <S.Button $type="ghost" onClick={() => handleCSKH(record)}>
          CSKH
        </S.Button>
      </S.WrapButtonTable>
    ),
  },
];

const handleRemind = (value) => {
  console.log('Value:', value);
};
const columnsRemind = [
  {
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <CustomerItemRemind record={record} />,
  },
  {
    dataIndex: 'value',
    key: 'value',
    render: (_, record) => (
      <S.WrapButtonTable>
        <S.Button $type="ghost" onClick={() => handleRemind(record)}>
          Nhắc nộp phí
        </S.Button>
      </S.WrapButtonTable>
    ),
  },
];

export default function CustomerCareDashBoard() {
  const { t } = useTranslation();
  const [remind, setRemind] = useState(false);
  const storeCustomerCare = useSelector((state) => state.dashboard.customerCares);
  const storeRemindFee = useSelector((state) => state.dashboard.remindFees);
  const [result, setResult] = useState(remind ? storeRemindFee : storeCustomerCare);
  const storeLoading = useSelector((state) => state.dashboard.loadingCustomerCare);
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState(result.data || []);
  const [columns, setColumns] = useState(columnCustomerCare);
  const [toggle, setToggle] = useState(false);
  const [offset, setOffset] = useState(offsetItem);
  const [limit, setLimit] = useState(limitItem);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(storeLoading);
  useEffect(() => {
    let payload = {};
    if (remind) {
      payload = {
        limit: 4,
        offset,
      };
      dispatch(getRemindFees(payload));
    } else {
      payload = {
        limit,
        offset,
      };
      dispatch(getCustomerCares(payload));
    }
  }, [dispatch, limit, offset, remind]);

  useEffect(() => {
    if (remind) {
      setResult(storeRemindFee);
    } else {
      setResult(storeCustomerCare);
    }
  }, [storeCustomerCare, storeRemindFee, remind]);

  useEffect(() => {
    setDataTable(result.data || result.contracts || []);
    setColumns(remind ? columnsRemind : columnCustomerCare);
    setTotal(result.count || 0);
    setLoading(storeLoading);
  }, [result]);

  const setPaginate = (value) => {
    setOffset(value.offset);
    setLimit(value.limit);
  };

  const handleSwitchMode = () => {
    setRemind(!remind);
  };

  return (
    <S.WrapContainer $toggle={toggle} $height="473px">
      <S.WrapTitle $toggle={toggle}>
        <S.IconDown onClick={() => setToggle(!toggle)} />
        <S.Title>{t('dashboard-page.customer-care-dashboard')}</S.Title>
        <S.WrapButtonTitle flex="auto">
          <S.Button $type={!remind && 'disabled'} onClick={() => handleSwitchMode()}>
            {t('customer-care-dashboard.remind')}
          </S.Button>
        </S.WrapButtonTitle>
      </S.WrapTitle>
      <S.WrapContent $display={!toggle ? 'block' : 'none'}>
        <S.Table
          dataSource={dataTable}
          columns={columns}
          rowKey={(record) => record.customerId || record.id}
          loading={loading}
          pagination={false}
          bordered={false}
          scroll={{ scrollToFirstRowOnChange: false }}
          showHeader={false}
          $height="320px"
          $endLine
          $borderBottom={dataTable.length < 3 ? (dataTable.length === 0 ? false : '') : false}
          $heightRow={remind ? false : '63px'}
        />
        <PaginationCommon total={total} showSizeChanger={false} setPaginate={setPaginate} pageSize={limit} />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
