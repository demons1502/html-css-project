import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

export default function AppointmentSchedule() {
  const { t } = useTranslation();

  return (
    <S.WrapContainer>
      <S.WrapTitle $noneIcon $toggle>
        <S.Title>{t('dashboard-page.appointment-schedule')}</S.Title>
      </S.WrapTitle>
    </S.WrapContainer>
  );
}
