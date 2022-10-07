import { Badge, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dateFormat } from '../../constants';
import * as S from '../../styles';

export default function CustomerItemBirthday(props) {
  const { t } = useTranslation();
  const { record } = props;
  return (
    <Row wrap={false}>
      <Badge color="#36b872" />
      <Col>
        <Row>
          <S.TextP>{record.fullname}</S.TextP>
        </Row>
        <Row>
          <S.TextTable>{record.customerEvents[0].name}</S.TextTable>
        </Row>
      </Col>
    </Row>
  );
}
