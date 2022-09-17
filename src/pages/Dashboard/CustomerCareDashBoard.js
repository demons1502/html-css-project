import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

export default function CustomerCareDashBoard() {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(true);

  return (
    <S.WrapContainer>
      <S.WrapTitle>
        <S.IconDown onClick={() => setToggle(!toggle)} />
        <S.Title>{t('dashboard-page.customer-care-dashboard')}</S.Title>
      </S.WrapTitle>
    </S.WrapContainer>
  );
}
