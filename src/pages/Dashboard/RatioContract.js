import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getRatioContracts } from '../../slices/dashboard';
import RatioContractPie from './commons/RatioContract/ratio-contract-pie';
import * as S from './styles';

export default function RatioContract() {
  const { t } = useTranslation();
  const loading = useSelector((state) => state.dashboard.loadingRatioContract);
  const data = useSelector((state) => state.dashboard.ratioContracts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRatioContracts());
  }, [dispatch]);

  return (
    <S.WrapContainer>
      <S.WrapTitle $noneIcon $toggle>
        <S.Title>{t('dashboard-page.ratio-contract')}</S.Title>
      </S.WrapTitle>
      <S.WrapContent>
        <S.WrapRatio>
          <Spin spinning={loading}>
            <RatioContractPie data={data} />
          </Spin>
        </S.WrapRatio>
      </S.WrapContent>
    </S.WrapContainer>
  );
}
