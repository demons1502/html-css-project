import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dateFormat } from '../../constants';
import * as S from '../../styles';

export default function CustomerItemBirthday(props) {
  const { t } = useTranslation();
  const { record } = props;
  console.log('record', record);
  console.log('moment', moment(record.dob).format(dateFormat));
  return (
    <Row gutter={[10, 0]}>
      <Col>
        <S.CircleTag />
      </Col>
      <Col>
        <Row>
          <p>{record.fullname}</p>
        </Row>
        <Row>
          <S.TextTable>
            {t('customer-care-dashboard.birthday')}
            {` ${moment(record.dob).format(dateFormat)}`}
          </S.TextTable>
        </Row>
      </Col>
    </Row>
  );
}
