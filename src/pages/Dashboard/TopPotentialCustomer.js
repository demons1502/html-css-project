import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getTopPotentialCustomers } from '../../slices/dashboard';
import PotentialItemCall from './commons/TopPotentialCustomer/potential-item-col-call';
import PotentialItemTooltip from './commons/TopPotentialCustomer/potential-item-col-tooltip';
import { limitTopPotentialItem, offsetItem } from './constants';
import * as S from './styles';

export default function TopPotentialCustomer() {
  const { t } = useTranslation();
  const loading = useSelector((state) => state.dashboard.loadingTopPotential);
  const result = useSelector((state) => state.dashboard.topPotentialCustomers);
  const [dataTable, setDataTable] = useState(result.data || []);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const columns = [
    {
      title: t('common.customer name'),
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: t('common.customer type'),
      dataIndex: 'typeId',
      key: 'typeId',
      render: (text) => (text === 1 ? t('top-potential-customer.user') : t('top-potential-customer.company')),
    },
    {
      title: t('common.phone'),
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => record?.phone1 || record?.phone2 || record?.phone3,
    },
    {
      title: t('top-potential-customer.potentialPoint'),
      dataIndex: 'potentialPoint',
      key: 'potentialPoint',
      render: (_, record) => <PotentialItemTooltip record={record} />,
    },
    {
      key: 'phone',
      render: (_, record) => <PotentialItemCall record={record} />,
    },
  ];

  useEffect(() => {
    const payload = {
      limit: limitTopPotentialItem,
      offset: offsetItem,
      orderField: 'successfulProb',
      orderType: 'desc',
      isNotIncludeCustomerCall: true,
    };
    dispatch(getTopPotentialCustomers(payload));
  }, [dispatch]);

  useEffect(() => {
    setDataTable(result.data || []);
  }, [result]);

  return (
    <S.WrapContainer $toggle={toggle}>
      <S.WrapTitle $toggle={toggle}>
        <S.IconDown onClick={() => setToggle(!toggle)} />
        <S.Title>{t('dashboard-page.top-potential-customer')}</S.Title>
      </S.WrapTitle>
      <S.WrapContent $display={!toggle ? 'block' : 'none'} $paddingBottom>
        <S.Table
          dataSource={dataTable}
          columns={columns}
          rowKey={(record) => record.customerId}
          pagination={false}
          bordered={false}
          scroll={{ scrollToFirstRowOnChange: false }}
          $borderBottom={dataTable.length === 0 ? false : ''}
          $paddingIcon
          $height="550px"
          loading={loading}
          $heightRow="50px"
        />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
