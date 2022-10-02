import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from '../../styles';

export default function CustomerItemRemind(props) {
  const { t } = useTranslation();
  const { record } = props;

  return (
    <Row gutter={[10, 0]}>
      <Col>
        <S.CircleTag />
      </Col>
      <Col>
        <Row>
          <p>{record.customerName}</p>
        </Row>
        <Row>
          <S.TextTable>
            {t('customer-care-dashboard.dueDate')} <S.TextTable $bold>{record.nextDepositDue}</S.TextTable>
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
