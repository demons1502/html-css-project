import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaginationCommon from '../../components/common/Pagination';
import { getCustomerCares, getRemindFees } from '../../slices/dashboard';
import CustomerButtonRemind from './commons/CustomerCareDashboard/customer-button-remind';
import CustomerItemBirthday from './commons/CustomerCareDashboard/customer-item-col-birthday';
import CustomerItemRemind from './commons/CustomerCareDashboard/customer-item-col-remind';
import { limitItem, offsetItem } from './constants';
import * as S from './styles';

export default function CustomerCareDashBoard() {
  const columnCustomerCare = [
    {
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text, record) => <CustomerItemBirthday record={record} />,
    },
    {
      dataIndex: '',
      key: '',
      render: () => (
        <S.WrapButtonTable>
          <S.Button $type="ghost" onClick={handleCSKH}>
            CSKH
          </S.Button>
        </S.WrapButtonTable>
      ),
    },
  ];
  const columnsRemind = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <CustomerItemRemind record={record} />,
    },
    {
      dataIndex: 'value',
      key: 'value',
      render: (_, record) => <CustomerButtonRemind record={record} />,
    },
  ];
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
  const navigate = useNavigate();

  const handleCSKH = () => {
    navigate('/customer-care');
  };

  useEffect(() => {
    let payload = {};
    if (remind) {
      payload = {
        limit: 4,
        offset,
        sortByDue: true,
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
    setTotal(result.count || result.total || 0);
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
      <S.WrapTitle $toggle={toggle} wrap={false} $padding="0px 23px 0px 0px">
        <S.IconDown onClick={() => setToggle(!toggle)} />
        <Col>
          <S.Title>{t('dashboard-page.customer-care-dashboard')}</S.Title>
        </Col>
        <S.WrapButtonTitle>
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
          scroll={{ x: dataTable.length > 0 && 460 }}
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
