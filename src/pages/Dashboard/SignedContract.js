import React from 'react';
import { useTranslation } from 'react-i18next';
import SignedContractPlot from './commons/SignedContract/signed-contract-plot';
import * as S from './styles';

export default function SignedContract() {
  const { t } = useTranslation();

  return (
    <S.WrapContainer>
      <S.WrapTitle $noneIcon $toggle>
        <S.Title>{t('dashboard-page.signed-contract')}</S.Title>
      </S.WrapTitle>
      <S.WrapContent>
        <SignedContractPlot />
      </S.WrapContent>
    </S.WrapContainer>
  );
}
