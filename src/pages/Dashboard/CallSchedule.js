import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaginationCommon from '../../components/common/Pagination';
import CallScheduleItemCall from './commons/CallSchedule/call-schedule-item-call';
import * as S from './styles';
import { dateFormat, limitItem, menuItems, offsetItem } from './constants';
import { randomColor } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCallSchedules } from '../../slices/dashboard';
import CallScheduleItemNote from './commons/CallSchedule/call-schedule-item-note';
import CallScheduleItemNextCall from './commons/CallSchedule/call-schedule-item-next-call';
import { Col, Tooltip } from 'antd';
import moment from 'moment/moment';
import CallScheduleItemTitle from './commons/CallSchedule/call-schedule-item-title';

export default function CallSchedule() {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const loading = useSelector((state) => state.dashboard.loadingCallSchedule);
  const reloadData = useSelector((state) => state.dashboard.callTransfer);
  const result = useSelector((state) => state.dashboard.callSchedules);
  const itemCallSchedule = useSelector((state) => state.dashboard.callSchedule);
  const dispatch = useDispatch();
  const [interval, setInterval] = useState(menuItems[0].value);
  const [dataTable, setDataTable] = useState(result.customerCalls || []);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(offsetItem);
  const [limit, setLimit] = useState(limitItem);
  const useColor = [];

  useEffect(() => {
    const payload = {
      limit,
      offset,
      interval,
    };
    dispatch(getCallSchedules(payload));
  }, [dispatch, offset, limit, interval, reloadData, itemCallSchedule]);

  useEffect(() => {
    setDataTable(result.customerCalls || []);
    setTotal(result.count || 0);
  }, [result]);

  const setPaginate = (value) => {
    setOffset(value.offset);
    setLimit(value.limit);
  };

  const handleSelect = (value) => {
    setInterval(value);
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
      title: <CallScheduleItemTitle title={t('common.customer name')} />,
      dataIndex: 'customer',
      key: 'name',
      render: ({ fullname }) => (
        <S.TagVertical $color={randomColor[randomNotDuplicate()]}>
          <Tooltip
            title={fullname}
            placement="topLeft"
            overlayInnerStyle={{ borderRadius: '15px', padding: '10px 15px' }}
          >
            <S.TextP2Row> {fullname}</S.TextP2Row>
          </Tooltip>
        </S.TagVertical>
      ),
    },
    {
      title: <CallScheduleItemTitle title={t('common.customer type')} />,
      dataIndex: 'customer',
      key: 'type',
      render: ({ typeId }) => (typeId === 1 ? t('call-schedule.user') : t('call-schedule.company')),
    },
    {
      title: <CallScheduleItemTitle title={t('common.phone')} />,
      dataIndex: 'customer',
      key: 'phone',
      render: ({ phone1, phone2, phone3 }) => phone1 || phone2 || phone3,
    },
    {
      title: <CallScheduleItemTitle title={t('common.last call')} />,
      dataIndex: 'lastCall',
      key: 'lastCall',
      ellipsis: true,
      render: (text) => text && moment(text).format(dateFormat),
    },
    {
      title: <CallScheduleItemTitle title={t('common.after call')} />,
      dataIndex: 'nextCall',
      key: 'nextCall',
      ellipsis: true,
      render: (_, record) => <CallScheduleItemNextCall record={record} />,
    },
    {
      title: <CallScheduleItemTitle title={t('common.note')} />,
      dataIndex: 'customer',
      key: 'note',
      render: (_, record) => <CallScheduleItemNote props={record} />,
    },
    // {
    //   dataIndex: 'customer',
    //   render: ({ phone1, phone2, phone3 }) => <CallScheduleItemCall record={{ phone1, phone2, phone3 }} />,
    // },
    {
      width: 100,
      key: 'action',
      render: (_, record) => (
        <CallScheduleItemCall
          record={{
            customerCallId: record.id,
            lastCall: record.lastCall,
            phone1: record?.customer?.phone1,
            phone2: record?.customer?.phone2,
            phone3: record?.customer?.phone3,
          }}
        />
      ),
    },
  ];

  return (
    <S.WrapContainer $toggle={toggle}>
      <S.WrapTitle $toggle={toggle}>
        <S.IconDown onClick={() => setToggle(!toggle)} />
        <S.Title>{t('dashboard-page.call-schedule')}</S.Title>
        <S.Select popupClassName="popup-select" defaultValue={interval} options={menuItems} onChange={handleSelect} />
      </S.WrapTitle>
      <S.WrapContent $display={!toggle ? 'block' : 'none'}>
        <S.Table
          dataSource={dataTable}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={false}
          bordered={false}
          $borderBottom={dataTable.length === 0 ? false : ''}
          loading={loading}
          $heightRow="46px"
          $height="276px"
        />
      </S.WrapContent>
      <S.WrapPagination span={24}>
        <PaginationCommon total={total} showSizeChanger={false} setPaginate={setPaginate} pageSize={limit} />
      </S.WrapPagination>
    </S.WrapContainer>
  );
}