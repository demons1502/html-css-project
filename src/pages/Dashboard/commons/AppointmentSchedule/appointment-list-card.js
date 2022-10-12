import { Empty, Spin } from 'antd';
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
  const { handleSlider, select } = props;
  const [weeks, setWeeks] = useState([]);
  const [activeKey, setActiveKey] = useState('0');
  const result = useSelector((state) => state.dashboard.appointmentSchedules);
  const item = useSelector((state) => state.dashboard.appointmentSchedule);
  const loading = useSelector((state) => state.dashboard.loadingAppointmentSchedule);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(moment());
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleActiveKey = (value) => {
    setActiveKey(value);
    setStartDate(weeks[value].timestamp);
  };

  const getListDateOfWeek = () => {
    const now = moment().subtract(1, 'days');
    const templateWeek = [];
    for (let index = 0; index < 7; index++) {
      const currentDay = moment(now.add(1, 'days'));
      const dayOfWeek = arrWeek[moment(currentDay).day()];
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
    let payload = {
      startDate: decodeURIComponent(moment(startDate).utc().hour(0).minute(0).second(0)),
      endDate: decodeURIComponent(moment(startDate).utc().hour(23).minute(59).second(59)),
    };

    if (select?.length === 0) {
      setData([]);
      handleSlider({
        done: 0,
        total: 0,
      });
      return;
    } else {
      payload.titles = select;
    }

    dispatch(getAppointmentSchedules(payload));
  }, [dispatch, startDate, select]);

  useEffect(() => {
    const payload = {
      startDate: decodeURIComponent(moment(startDate).hour(0).minute(0).second(0)),
      endDate: decodeURIComponent(moment(startDate).hour(23).minute(59).second(59)),
    };
    dispatch(getAppointmentSchedules(payload));
  }, [item]);

  useEffect(() => {
    setData(result.data || []);
    handleSlider({
      done: result?.data?.filter((item) => item.isCompleted)?.length || 0,
      total: result?.data?.length || 0,
    });
  }, [result]);

  return (
    <S.Tabs activeKey={activeKey} onChange={handleActiveKey}>
      {weeks.map((element, idx) => (
        <S.Tabs.TabPane tab={idx == activeKey ? `${element.dayOfWeek}(${element.date})` : element.dayOfWeek} key={idx}>
          <Spin spinning={loading}>
            <S.WrapTabs $center={data.length === 0 ? true : false}>
              {data.map((item, idx) => (
                <AppointmentItemCard item={item} key={idx} handleUpdateItem={handleUpdateItem} update={update} />
              ))}
              {data.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </S.WrapTabs>
          </Spin>
        </S.Tabs.TabPane>
      ))}
    </S.Tabs>
  );
}
