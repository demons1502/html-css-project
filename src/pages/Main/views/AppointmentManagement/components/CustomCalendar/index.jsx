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
import { useSelector } from 'react-redux';

const defaultTZ = DateTime.local().zoneName;
const date = new Date();
const defaultDateStr = moment(date).format('YYYY-MM-DD');
function getDate(str, DateTimeObj) {
  return DateTimeObj.fromISO(str).toJSDate();
}

const CalendarCustom = ({ handleEvent, eventActive }) => {
  const appointmentReducer = useSelector((state) => state.appointment);
  const { data } = appointmentReducer;
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
      localizer.format(date, 'HH:mm', culture),
  };

  const today = new Date();
  const minimum = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    6
  );

  const maximum = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    20
  );

  return (
    <S.WrapContainer
      defaultDate={defaultDate}
      defaultView={Views.WEEK}
      events={data}
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
        event: (event) => DayEvent(event, eventActive),
        header: CustomHeader,
      }}
      style={{ height: 600 }}
    />
  );
};

CalendarCustom.prototype = {
  eventActive: PropTypes.object,
  handleEvent: PropTypes.func,
};

export default CalendarCustom;
