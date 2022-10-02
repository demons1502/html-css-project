import { Col, Row, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedContracts } from '../../slices/dashboard';
import SignedContractCalendar from './commons/SignedContract/signed-contract-calendar';
import SignedContractPlot from './commons/SignedContract/signed-contract-plot';
import { dateContractFormat } from './constants';
import * as S from './styles';

export default function SignedContract() {
  const { t } = useTranslation();
  const loading = useSelector((state) => state.dashboard.loadingSignedContract);
  const result = useSelector((state) => state.dashboard.signedContracts);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(moment().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  const setDate = (date) => {
    setEndDate(date);
    setStartDate(moment(date).subtract(7, 'days'));
  };

  useEffect(() => {
    const payload = {
      from: decodeURIComponent(startDate.format(dateContractFormat)),
      to: decodeURIComponent(endDate.format(dateContractFormat)),
    };
    dispatch(getSignedContracts(payload));
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    setTotal(result.total || 0);
    setData(result.histogram || []);
  }, [result]);

  return (
    <S.WrapContainer>
      <S.WrapTitle $noneIcon $toggle>
        <S.Title>{t('dashboard-page.signed-contract')}</S.Title>
      </S.WrapTitle>
      <S.WrapContent $padding="20px">
        <Spin spinning={loading}>
          <Row gutter={[0, 30]}>
            <Col span={24}>
              <SignedContractCalendar setDate={setDate} startDate={startDate} endDate={endDate} total={total} />
            </Col>
            <Col span={24}>
              <SignedContractPlot data={data} />
            </Col>
          </Row>
        </Spin>
      </S.WrapContent>
    </S.WrapContainer>
  );
}
