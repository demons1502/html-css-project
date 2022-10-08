import React, { useState } from 'react';
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
  const monDay = moment(new Date(date)).clone().weekday(0).format('DD/MM/YYYY');
  const sunDay = moment(new Date(date)).clone().weekday(6).format('DD/MM/YYYY');

  const goToBackWeek = () => {
    const startDate = getdate(date, -6, 0, true);
    const endDate = getdate(date, -6, 6, true);
    dispatch(
      getAppointments({
        startDate: `${startDate} 00:00:00`,
        endDate: `${endDate} 23:59:59`,
      })
    );
    onNavigate('PREV');
  };

  const goToNextWeek = () => {
    const startDate = getdate(date, 14, 0, true);
    const endDate = getdate(date, 14, 6, true);
    dispatch(
      getAppointments({
        startDate: `${startDate} 00:00:00`,
        endDate: `${endDate} 23:59:59`,
      })
    );

    onNavigate('NEXT');
  };

  const goToBackMonth = () => {
    const month = new Date(date).getMonth() - 1;
    const startDate = getdate(date, 0, 0, false, month, 0);
    const endDate = getdate(date, 0, 6, false, month, 0);
    const prevDate = getdate(date, 0, 7, false, month, 1);
    dispatch(
      getAppointments({
        startDate: `${startDate} 00:00:00`,
        endDate: `${endDate} 23:59:59`,
      })
    );

    onNavigate('PREV', prevDate);
  };

  const goToNextMonth = () => {
    const month = new Date(date).getMonth() + 1;
    const startDate = getdate(date, -1, 0, false, month, 0);
    const endDate = getdate(date, -1, 6, false, month, 0);
    const nextDate = getdate(date, 0, -1, false, month, 0);

    dispatch(
      getAppointments({
        startDate: `${startDate} 00:00:00`,
        endDate: `${endDate} 23:59:59`,
      })
    );

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
          <S.ActionLeftTile className="rbc-year">{`Tháng ${moment(date).format('MM')}`}</S.ActionLeftTile>

          <S.WrapAction>
            <S.Action onClick={goToBackMonth}>
              <img src={LeftArrow} />
            </S.Action>

            <S.Action onClick={goToNextMonth}>
              <img src={RightArrow} />
            </S.Action>
          </S.WrapAction>

          <S.WrapActionCaledar>
            <S.Action onClick={goToBackWeek}>
              <img src={LeftArrow} />
            </S.Action>

            <S.ContentCaledar>
              <Calender />
              <S.TextDate>{`${monDay} - ${sunDay}`}</S.TextDate>
            </S.ContentCaledar>

            <S.Action onClick={goToNextWeek}>
              <img src={RightArrow} />
            </S.Action>
          </S.WrapActionCaledar>
        </S.WrapLeft>

        <S.ButtonImport onClick={handleCreate} type="primary">
          <img src={Plus} />
          <S.ButonText>Tạo mới</S.ButonText>
        </S.ButtonImport>
      </S.WrapContainer>
      <CreateAppointment open={open} handleCancel={handleCancel} />
    </>
  );
}

export default CalendarToolbar;
