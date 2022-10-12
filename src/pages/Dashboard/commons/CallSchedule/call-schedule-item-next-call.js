import { Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import iconSetNextCall from '../../../../assets/images/icons/iconSetNextCall.svg';
import { setNextCall } from '../../../../slices/dashboard';
import { dateFormat } from '../../constants';
import * as S from '../../styles';

export default function CallScheduleItemNextCall(props) {
  const { t } = useTranslation();
  const { nextCall, id } = props.record;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChangeDate = (value) => {
    setOpen(false);
    const payload = {
      id,
      nextCall: value.utc().format('YYYY-MM-DD'),
    };
    dispatch(setNextCall(payload));
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Row wrap={false}>
      {nextCall && moment(nextCall).format(dateFormat)}
      <S.WrapIconNextCall>
        <S.Popover
          content={
            <S.WrapDatePicker disabledDate={disabledDate} open={open} onChange={handleChangeDate} format="DD/MM/YYYY" />
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
          placement="right"
        >
          <img src={iconSetNextCall} alt="call" />
        </S.Popover>
      </S.WrapIconNextCall>
    </Row>
  );
}
