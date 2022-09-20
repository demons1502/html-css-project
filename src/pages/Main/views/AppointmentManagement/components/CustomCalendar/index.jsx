import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/vi';
import { DateTime, Settings } from 'luxon';
import PropTypes from 'prop-types';

// COMPONENTS
import CalendarToolbar from '../CustomToolbar';
import DayEvent from '../CustomDayEvent';

// STYLES
import * as S from './styles';
import 'react-big-calendar/lib/sass/styles.scss';
import CustomHeader from '../CustomHeader';

const myEventsList = [
  {
    id: 16,
    title: 'Video Record',
    start: new Date('2022-09-20T08:24:00'),
    end: new Date('2022-09-20T09:50:00'),
    description: 'Tư vấn hợp đồng',
    company: {
      members: 6,
    },
    status: 'cancel',
    address: 'Lô 22, số 35 Lê Văn Thiêm',
    note: 'Mang theo hợp đồng, quà tặng cho khách hàng',
  },

  {
    id: 18,
    title: 'Jenny Wilson',
    start: new Date('2022-09-22T08:24:00'),
    end: new Date('2022-09-22T09:50:00'),
    description: 'Tư vấn hợp đồng',
    status: 'success',
    address: 'Lô 22, số 35 Lê Văn Thiêm',
    note: 'Mang theo hợp đồng, quà tặng cho khách hàng',
  },
  {
    id: 19,
    title: 'Jenny Wilson',
    start: new Date('2022-09-23T08:24:00'),
    end: new Date('2022-09-23T09:15:00'),
    description: 'Tư vấn hợp đồng',
    company: {
      members: 4,
    },
    status: 'wait',
    address: 'Lô 22, số 35 Lê Văn Thiêm',
    note: 'Mang theo hợp đồng, quà tặng cho khách hàng',
  },
  {
    id: 20,
    title: 'Jenny Wilson',
    start: new Date('2022-09-24T08:24:00'),
    end: new Date('2022-09-24T09:15:00'),
    description: 'Tư vấn hợp đồng',
    status: 'waiting',
    address: 'Lô 22, số 35 Lê Văn Thiêm',
    note: 'Mang theo hợp đồng, quà tặng cho khách hàng',
  },
];

const defaultTZ = DateTime.local().zoneName;
const date = new Date();
const defaultDateStr = moment(date).format('YYYY-MM-DD');
function getDate(str, DateTimeObj) {
  return DateTimeObj.fromISO(str).toJSDate();
}

const CalendarCustom = ({ handleEvent }) => {
  const [timezone] = useState(defaultTZ);

  const { defaultDate, getNow, localizer, scrollToTime } = useMemo(() => {
    Settings.defaultZone = timezone;
    return {
      defaultDate: getDate(defaultDateStr, DateTime),
      getNow: () => DateTime.local().toJSDate(),
      localizer: momentLocalizer(moment),
      scrollToTime: DateTime.local().toJSDate(),
    };
  }, [timezone]);

  useEffect(() => {
    return () => {
      Settings.defaultZone = defaultTZ;
    };
  }, []);

  // SELECT EVENT
  const handleSelectEvent = useCallback((event) => handleEvent(event), []);

  //FORMAT
  const formats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, 'H:mm', culture),
  };

  const today = new Date();
  const minimum = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    7
  );
  const maximum = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    18
  );

  return (
    <S.WrapContainer
      defaultDate={defaultDate}
      defaultView={Views.WEEK}
      events={myEventsList}
      getNow={getNow}
      localizer={localizer}
      scrollToTime={scrollToTime}
      startAccessor='start'
      endAccessor='end'
      min={minimum}
      max={maximum}
      timeslots={1}
      step={30}
      onSelectEvent={handleSelectEvent}
      formats={formats}
      components={{
        toolbar: CalendarToolbar,
        event: DayEvent,
        header: CustomHeader,
      }}
    />
  );
};

CalendarCustom.prototype = {
  handleEvent: PropTypes.func,
};

export default CalendarCustom;
