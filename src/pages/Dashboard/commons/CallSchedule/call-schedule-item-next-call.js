import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import iconSetNextCall from '../../../../assets/images/icons/iconSetNextCall.svg';
import { setNextCall } from '../../../../slices/dashboard';
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
      nextCall: value.format('YYYY-MM-DD'),
    };
    dispatch(setNextCall(payload));
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <>
      {nextCall ? (
        nextCall
      ) : (
        <S.WrapIconNextCall>
          <S.Popover
            content={<S.WrapDatePicker open={open} onChange={handleChangeDate} format="DD/MM/YYYY" />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <img src={iconSetNextCall} alt="call" />
          </S.Popover>
        </S.WrapIconNextCall>
      )}
    </>
  );
}
