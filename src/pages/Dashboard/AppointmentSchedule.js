import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentItemTitle from './commons/AppointmentSchedule/appointment-item-title';
import AppointmentListCard from './commons/AppointmentSchedule/appointment-list-card';
import * as S from './styles';

export default function AppointmentSchedule() {
  const { t } = useTranslation();
  const [slider, setSlider] = useState({});

  const handleSlider = (value) => {
    setSlider(value);
  };

  return (
    <S.WrapContainer $height="768px">
      <AppointmentItemTitle props={slider} />
      <S.WrapContent $padding="15px">
        <AppointmentListCard handleSlider={handleSlider} />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
