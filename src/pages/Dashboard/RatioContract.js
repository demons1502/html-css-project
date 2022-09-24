import React from 'react';
import { useTranslation } from 'react-i18next';
import RatioContractPie from './commons/RatioContract/ratio-contract-pie';
import * as S from './styles';

export default function RatioContract() {
  const { t } = useTranslation();

  return (
    <S.WrapContainer>
      <S.WrapTitle $noneIcon $toggle>
        <S.Title>{t('dashboard-page.ratio-contract')}</S.Title>
      </S.WrapTitle>
      <S.WrapContent>
        <RatioContractPie />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
