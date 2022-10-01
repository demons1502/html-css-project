import { Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentSchedules } from '../../../../slices/dashboard';
import { arrWeek } from '../../constants';
import * as S from '../../styles';
import AppointmentItemCard from './appointment-item-card';

export default function AppointmentListCard(props) {
  const { t } = useTranslation();
  const [weeks, setWeeks] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const result = useSelector((state) => state.dashboard.appointmentSchedules);
  const item = useSelector((state) => state.dashboard.appointmentSchedule);
  const loading = useSelector((state) => state.dashboard.loading);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(moment().subtract(2, 'days'));
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleActiveKey = (value) => {
    setActiveKey(value);
    setStartDate(weeks[value - 1].timestamp);
  };

  const getListDateOfWeek = () => {
    const now = moment();
    const formatDate = moment(`${now.date() - 1}-${now.month() + 1}-${now.year()}`, 'DD/MM/YYYY');
    const templateWeek = [];
    for (let index = 0; index < 7; index++) {
      const currentDay = moment(formatDate.add(1, 'days'));
      const dayOfWeek = arrWeek[currentDay.day()];
      const date = moment(currentDay).format('DD/MM');
      const timestamp = moment(currentDay);
      templateWeek.push({ dayOfWeek, date, timestamp });
    }
    setWeeks(templateWeek);
  };

  const handleUpdateItem = (value) => {
    setUpdate(value);
  };

  useEffect(() => {
    getListDateOfWeek();
  }, []);

  useEffect(() => {
    const payload = {
      startDate: decodeURIComponent(moment(startDate).hour(0).minute(0).second(0)),
      endDate: decodeURIComponent(moment(startDate).hour(23).minute(59).second(59)),
    };
    dispatch(getAppointmentSchedules(payload));
  }, [dispatch, startDate]);

  useEffect(() => {
    const payload = {
      startDate: decodeURIComponent(moment(startDate).hour(0).minute(0).second(0)),
      endDate: decodeURIComponent(moment(startDate).hour(23).minute(59).second(59)),
    };
    dispatch(getAppointmentSchedules(payload));
  }, [item]);

  useEffect(() => {
    setData(result.data || []);
  }, [result]);

  return (
    <S.Tabs activeKey={activeKey} onChange={handleActiveKey}>
      {weeks.map((element, idx) => (
        <S.Tabs.TabPane
          tab={idx + 1 == activeKey ? `${element.dayOfWeek}(${element.date})` : element.dayOfWeek}
          key={idx + 1}
        >
          <Spin spinning={loading}>
            <S.WrapTabs>
              {data.map((item, idx) => (
                <AppointmentItemCard item={item} key={idx} handleUpdateItem={handleUpdateItem} update={update} />
              ))}
            </S.WrapTabs>
          </Spin>
        </S.Tabs.TabPane>
      ))}
    </S.Tabs>
  );
}
