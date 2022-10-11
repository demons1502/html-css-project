import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getAppointments } from '../../../../../../slices/appointmentManagement';

//COMPONENTS
import { Calender } from '../../../../../../assets/images/icons/components';
import Plus from '../../../../../../assets/images/icons/plus.svg';
import CreateAppointment from '../CreateAppointment';

// STYLES
import * as S from './styles';

//IMAGE
import LeftArrow from '../../../../../../assets/images/icons/left-arrow-min.svg';
import RightArrow from '../../../../../../assets/images/icons/right-arrow-min.svg';

function CalendarToolbar(props) {
  const { date, onNavigate } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dateEvent, setDateEvent] = useState(date)
  const [dateEventEndOld, setDateEventEndOld] = useState()
  const monDay = moment(new Date(dateEvent)).clone().weekday(0).format('DD/MM/YYYY');
  const sunDay = moment(new Date(dateEvent)).clone().weekday(6).format('DD/MM/YYYY');
  const monthEvent = moment(new Date(dateEvent)).clone().weekday(6).format('MM')

  useEffect(() => {
    setDateEvent(date)
  }, [date])

  const goToBackWeek = () => {
    const startDate = getdate(dateEvent, -6, 0, true);
    const endDate = getdate(dateEvent, -6, 6, true);
    const prevDate = getdate(dateEvent, 7, 0, true);

    dispatch(
      getAppointments({
        startDate: moment.utc(`${startDate} 00:00:00`).format(),
        endDate: moment.utc(`${endDate} 23:59:59`).format(),
      })
    );
    onNavigate('PREV', prevDate);
  };

  const goToNextWeek = () => {
    const startDate = getdate(dateEvent, 14, 0, true);
    const endDate = getdate(dateEvent, 14, 6, true);
    const nextDate = getdate(dateEvent, 7, 0, true);
    dispatch(
      getAppointments({
        startDate: moment.utc(`${startDate} 00:00:00`).format(),
        endDate: moment.utc(`${endDate} 23:59:59`).format(),
      })
    );

    onNavigate('NEXT', nextDate);
  };

  const goToBackMonth = () => {
    const month = new Date(dateEvent).getMonth() - 1;
    const dateEventEnd = moment(new Date(getdate(dateEvent, 0, 6, false, month, 0))).format('DD')
    const dateEventStart = moment(new Date(getdate(dateEvent, 0, 0, false, month, 0))).format('DD')
    const checkMonth = dateEventEndOld === dateEventEnd ? month - 1 : month

    const startDate = getdate(dateEvent, 0, 0, false, checkMonth, 0)
    const endDate = getdate(dateEvent, 0, 6, false, checkMonth, 0)
    const prevDate =
      dateEventStart >= 25
        ? getdate(dateEvent, 0, 13, false, checkMonth, 0)
        : getdate(dateEvent, 0, 7, false, checkMonth, 1);

    console.log(startDate, prevDate, endDate)

    dispatch(
      getAppointments({
        startDate: moment.utc(`${startDate} 00:00:00`).format(),
        endDate: moment.utc(`${endDate} 23:59:59`).format(),
      })
    );
    setDateEventEndOld(dateEventEnd)
    onNavigate('PREV', prevDate);
  };

  const goToNextMonth = () => {
    const month = new Date(dateEvent).getMonth() + 1
    const dateEventEnd = moment(new Date(getdate(dateEvent, 0, 6, false, month, 0))).format('DD')
    const checkMonth = dateEventEndOld === dateEventEnd ? month + 1 : month
    const startDate =
      dateEventEnd >= 30
        ? getdate(dateEvent, 0, 7, false, checkMonth, 0)
        : getdate(dateEvent, 0, 0, false, checkMonth, 0)

    const endDate =
      dateEventEnd >= 30
        ? getdate(dateEvent, 0, 13, false, checkMonth, 0)
        : getdate(dateEvent, 0, 6, false, checkMonth, 0)

    const nextDate =
      dateEventEnd >= 30
        ? getdate(dateEvent, 0, 6, false, checkMonth, 0)
        : getdate(dateEvent, 0, -1, false, checkMonth, 1)

    dispatch(
      getAppointments({
        startDate: moment.utc(`${startDate} 00:00:00`).format(),
        endDate: moment.utc(`${endDate} 23:59:59`).format(),
      })
    );
    console.log(startDate, nextDate, endDate)
    setDateEventEndOld(dateEventEnd)
    onNavigate('NEXT', nextDate);
  };

  const handleCreate = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getdate = (date, count, weekday, week, month, monthdate) => {
    const convertDate = new Date(date);
    const setDate = convertDate.setDate(convertDate.getDate() - convertDate.getDay() + count);
    const value = week
      ? moment(setDate).clone().weekday(weekday)
      : moment(setDate).clone().month(month).date(monthdate).weekday(weekday);
    return value.format('YYYY-MM-DD');
  };

  return (
    <>
      <S.WrapContainer>
        <S.WrapLeft>
          <S.ActionLeftTile className="rbc-year">{ `Tháng ${monthEvent}` }</S.ActionLeftTile>

          <S.WrapAction>
            <S.Action onClick={ goToBackMonth }>
              <img src={ LeftArrow } />
            </S.Action>

            <S.Action onClick={ goToNextMonth }>
              <img src={ RightArrow } />
            </S.Action>
          </S.WrapAction>

          <S.WrapActionCaledar>
            <S.Action onClick={ goToBackWeek }>
              <img src={ LeftArrow } />
            </S.Action>

            <S.ContentCaledar>
              <Calender />
              <S.TextDate>{ `${monDay} - ${sunDay}` }</S.TextDate>
            </S.ContentCaledar>

            <S.Action onClick={ goToNextWeek }>
              <img src={ RightArrow } />
            </S.Action>
          </S.WrapActionCaledar>
        </S.WrapLeft>

        <S.ButtonImport onClick={ handleCreate } type="primary">
          <img src={ Plus } />
          <S.ButonText>Tạo mới</S.ButonText>
        </S.ButtonImport>
      </S.WrapContainer>
      <CreateAppointment open={ open } handleCancel={ handleCancel } />
    </>
  );
}

export default CalendarToolbar;
