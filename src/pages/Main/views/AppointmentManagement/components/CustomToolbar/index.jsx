import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getAppointments } from '../../../../../../slices/appointmentManagement';

// STYLES
import * as S from './styles';

//IMAGE
import LeftArrow from '../../../../../../assets/images/icons/left-arrow-min.svg';
import RightArrow from '../../../../../../assets/images/icons/right-arrow-min.svg';
import { Calender } from '../../../../../../assets/images/icons/components';
import Plus from '../../../../../../assets/images/icons/plus.svg';
import CreateAppointment from '../CreateAppointment';

function CalendarToolbar(props) {
  const { date, onNavigate } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const monDay = moment(new Date(date)).clone().weekday(0).format('DD/MM/YYYY');
  const sunDay = moment(new Date(date)).clone().weekday(6).format('DD/MM/YYYY');

  const goToBack = () => {
    const endDate = moment(
      new Date(date).setDate(
        new Date(date).getDate() - new Date(date).getDay() - 6
      )
    )
      .clone()
      .weekday(6)
      .format('YYYY-MM-DD');

    const startDate = moment(
      new Date(date).setDate(
        new Date(date).getDate() - new Date(date).getDay() - 6
      )
    )
      .clone()
      .weekday(0)
      .format('YYYY-MM-DD');

    dispatch(
      getAppointments({
        startDate: `${startDate} 00:00:00`,
        endDate: `${endDate} 23:59:59`,
      })
    );
    onNavigate('PREV');
  };

  const goToNext = () => {
    const endDate = moment(
      new Date(date).setDate(
        new Date(date).getDate() - new Date(date).getDay() + 14
      )
    )
      .clone()
      .weekday(6)
      .format('YYYY-MM-DD');

    const startDate = moment(
      new Date(date).setDate(
        new Date(date).getDate() - new Date(date).getDay() + 14
      )
    )
      .clone()
      .weekday(0)
      .format('YYYY-MM-DD');

    dispatch(
      getAppointments({
        startDate: `${startDate} 00:00:00`,
        endDate: `${endDate} 23:59:59`,
      })
    );

    onNavigate('NEXT');
  };

  const handleCreate = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <S.WrapContainer>
        <S.WrapLeft>
          <S.ActionLeftTile className='rbc-year'>{`Tháng ${moment(date).format(
            'MM'
          )}`}</S.ActionLeftTile>

          <S.WrapAction>
            <S.Action onClick={goToBack}>
              <img src={LeftArrow} />
            </S.Action>

            <S.Action onClick={goToNext}>
              <img src={RightArrow} />
            </S.Action>
          </S.WrapAction>

          <S.WrapActionCaledar>
            <S.Action onClick={goToBack}>
              <img src={LeftArrow} />
            </S.Action>

            <S.ContentCaledar>
              <Calender />
              <S.TextDate>{`${monDay} - ${sunDay}`}</S.TextDate>
            </S.ContentCaledar>

            <S.Action onClick={goToNext}>
              <img src={RightArrow} />
            </S.Action>
          </S.WrapActionCaledar>
        </S.WrapLeft>

        <S.ButtonImport onClick={handleCreate} type='primary'>
          <img src={Plus} />
          <S.ButonText>Tạo mới</S.ButonText>
        </S.ButtonImport>
      </S.WrapContainer>
      <CreateAppointment open={open} handleCancel={handleCancel} />
    </>
  );
}

export default CalendarToolbar;
