import { Badge, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dateFormat } from '../../constants';
import * as S from '../../styles';

export default function CustomerItemRemind(props) {
  const { t } = useTranslation();
  const { record } = props;
  return (
    <Row wrap={false}>
      <Badge color="#36b872" />
      <Col>
        <Row>
          <S.TextP>{record.customerName}</S.TextP>
        </Row>
        <Row>
          <S.TextTable>
            {t('customer-care-dashboard.dueDate')}{' '}
            <S.TextTable $bold>{moment(record.nextDepositDue).format(dateFormat)}</S.TextTable>
          </S.TextTable>
        </Row>
        <Row gutter={10}>
          <Col>
            <S.TextTable>
              {t('customer-care-dashboard.contractId')} <S.TextTable $bold>{record.contractNumber}</S.TextTable>
            </S.TextTable>
          </Col>
          <Col>
            <S.TextTable>
              {t('customer-care-dashboard.money')} <S.TextTable $bold>{record.value}</S.TextTable>
            </S.TextTable>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
