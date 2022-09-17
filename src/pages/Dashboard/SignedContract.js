import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

export default function SignedContract() {
  const { t } = useTranslation();

  return (
    <S.WrapContainer>
      <S.WrapTitle $noneIcon $toggle>
        <S.Title>{t('dashboard-page.signed-contract')}</S.Title>
      </S.WrapTitle>
    </S.WrapContainer>
  );
}
