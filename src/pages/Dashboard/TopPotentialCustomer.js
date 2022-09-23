import { Col, Empty, Row, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import groupCall from '../../assets/images/icons/groupCalll.svg';
import noteCircle from '../../assets/images/icons/noteCircle.svg';
import TableCardCommon from '../../components/TableCardCommon';
import * as S from './styles';

const dataSource = [
  {
    key: 1,
    name: 'Devon Lane',
    type: 'Cá nhân',
    phone: '0984 294 902',
    potentialPoint: '90% quỹ hưu trí',
  },
  {
    key: 2,
    name: 'Cameron Williamson',
    type: 'Cá nhân',
    phone: '0293 893 920',
    potentialPoint: '78% quỹ hưu trí',
  },
  {
    key: 3,
    name: 'Jane Cooper',
    type: 'Doanh nghiệp',
    phone: '0392 439 344',
    potentialPoint: '78% quỹ hưu trí',
  },
  {
    key: 4,
    name: 'Courtney Henry',
    type: 'Doanh nghiệp',
    phone: '0238 939 893',
    potentialPoint: '78% quỹ hưu trí',
  },
  {
    key: 5,
    name: 'Guy Hawkins',
    type: 'Cá nhân',
    phone: '0293 929 199',
    potentialPoint: '78% quỹ hưu trí',
  },
  {
    key: 6,
    name: 'Devon Lane',
    type: 'Cá nhân',
    phone: '0984 294 902',
    potentialPoint: '90% quỹ hưu trí',
  },
  {
    key: 7,
    name: 'Cameron Williamson',
    type: 'Cá nhân',
    phone: '0293 893 920',
    potentialPoint: '78% quỹ hưu trí',
  },
  {
    key: 8,
    name: 'Jane Cooper',
    type: 'Doanh nghiệp',
    phone: '0392 439 344',
    potentialPoint: '78% quỹ hưu trí',
  },
  {
    key: 9,
    name: 'Courtney Henry',
    type: 'Doanh nghiệp',
    phone: '0238 939 893',
    potentialPoint: '78% quỹ hưu trí',
  },
  {
    key: 10,
    name: 'Guy Hawkins',
    type: 'Cá nhân',
    phone: '0293 929 199',
    potentialPoint: '78% quỹ hưu trí',
  },
];

export default function TopPotentialCustomer() {
  const { t } = useTranslation();
  const [dataTable, setDataTable] = useState(dataSource);
  const [toggle, setToggle] = useState(false);

  const handleCall = (value) => {
    console.log('Call,', value);
  };

  const columns = [
    {
      title: t('common.customer name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('common.customer type'),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: t('common.phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('top-potential-customer.potentialPoint'),
      dataIndex: 'potentialPoint',
      key: 'potentialPoint',
      render: (text, record) => (
        <Row gutter={10}>
          <Col>{text}</Col>
          <S.WrapIconCenter>
            <Tooltip placement="bottomRight" title={text}>
              <S.IconTooltip src={noteCircle} />
            </Tooltip>
          </S.WrapIconCenter>
        </Row>
      ),
    },
    {
      key: 'phone',
      render: ({ phone }) => (
        <S.WrapTableAction>
          <img src={groupCall} alt="" onClick={() => handleCall(phone)} />
        </S.WrapTableAction>
      ),
    },
  ];

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return <TableCardCommon dataSource={dataTable} columnTable={columns}></TableCardCommon>;
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  }, [dataTable]);

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
          pagination={false}
          bordered={false}
          scroll={{ scrollToFirstRowOnChange: false }}
          $borderBottom={false}
          $paddingIcon
        />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
