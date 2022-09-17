import { Checkbox, Empty } from 'antd';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import call from '../../assets/images/icons/call.svg';
import PaginationCommon from '../../components/PaginationCommon';
import TableCardCommon from '../../components/TableCardCommon';
import * as S from './styles';

const dataSource = [
  {
    key: 1,
    name: 'Devon Lane',
    type: 'Cá nhân',
    phone: '0984 294 902',
    lastCall: '12/08/2022',
    afterCall: '17/08/2022',
    note: 'Đã làm khảo sát',
  },
  {
    key: 2,
    name: 'Cameron Williamson',
    type: 'Cá nhân',
    phone: '0293 893 920',
    lastCall: '02/08/2022',
    afterCall: '17/08/2022',
    note: 'Đã gọi 2 lần',
  },
  {
    key: 3,
    name: 'Jane Cooper',
    type: 'Doanh nghiệp',
    phone: '0392 439 344',
    lastCall: '12/08/2022',
    afterCall: '17/08/2022',
    note: 'Bỏ lỡ lịch tư vấn',
  },
  {
    key: 4,
    name: 'Courtney Henry',
    type: 'Doanh nghiệp',
    phone: '0238 939 893',
    lastCall: '04/08/2022',
    afterCall: '17/08/2022',
    note: 'Chưa gọi điện',
  },
  {
    key: 5,
    name: 'Guy Hawkins',
    type: 'Cá nhân',
    phone: '0293 929 199',
    lastCall: '11/08/2022',
    afterCall: '17/08/2022',
    note: 'Chưa gọi điện',
  },
];

const menuItems = [
  {
    value: 'today',
    label: 'Hôm nay',
  },
  {
    value: 'week',
    label: 'Tuần này',
  },
  {
    value: 'month',
    label: 'Tháng nay',
  },
  {
    value: 'all',
    label: 'Tất cả',
  },
];

export default function CallSchedule() {
  const { t } = useTranslation();
  const [dataTable, setDataTable] = useState(dataSource);
  const [toggle, setToggle] = useState(false);
  const randomColor = ['green', 'yellow', 'blue', 'orange', 'purple'];
  const useColor = [];

  const handleSelect = (value) => {
    console.log(`selected ${value}`);
  };

  const handleCall = (value) => {
    console.log(`Call ${value}`);
  };

  const randomNotDuplicate = () => {
    let color = Math.floor(Math.random() * 5);
    while (useColor.includes(color) && useColor.length < 5) {
      color = Math.floor(Math.random() * 5);
    }
    useColor.push(color);
    return color;
  };

  const columns = [
    {
      title: t('common.customer name'),
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => <S.TagVertical $color={randomColor[randomNotDuplicate()]}>{name}</S.TagVertical>,
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
      title: t('common.last call'),
      dataIndex: 'lastCall',
      key: 'lastCall',
    },
    {
      title: t('common.after call'),
      dataIndex: 'afterCall',
      key: 'afterCall',
    },
    {
      title: t('common.note'),
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '',
      dataIndex: '',
      key: 'phone',
      render: ({ phone }) => (
        <S.WrapTableAction>
          <img src={call} alt="call" onClick={() => handleCall(phone)} />
          <Checkbox className="checkbox-item" />
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
    <S.WrapContainer>
      <S.WrapTitle $toggle={toggle}>
        <S.IconDown onClick={() => setToggle(!toggle)} />
        <S.Title>{t('dashboard-page.call-schedule')}</S.Title>
        <S.Select
          popupClassName="popup-select"
          defaultValue={menuItems[0]?.value}
          options={menuItems}
          onChange={handleSelect}
        />
      </S.WrapTitle>
      <S.WrapContent $display={!toggle ? 'block' : 'none'}>
        {table}
        <PaginationCommon />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
