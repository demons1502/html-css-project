import { Badge, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from '../../styles';

export default function MissedItemName(props) {
  const { t } = useTranslation();
  const { record } = props;

  return (
    <Row wrap={false}>
      <Badge color="#ff5855" />
      <Col>
        <Row>
          <S.TextP>{record?.customerApptRecords[0]?.name}</S.TextP>
        </Row>
        <Row>
          <S.TextTable>{record.note}&nbsp;</S.TextTable>
        </Row>
      </Col>
    </Row>
  );
}
