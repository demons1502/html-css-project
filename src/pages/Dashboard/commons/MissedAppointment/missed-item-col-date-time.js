import { Col, Row } from 'antd';
import React from 'react';
import alarm from '../../../../assets/images/icons/alarm.svg';
import * as S from '../../styles';
import moment from 'moment';
import { dateFormat, timeFormat } from '../../constants';

export default function MissedItemDateTime(props) {
  const { record } = props;
  const time = record?.startTime
    ? `${moment(record?.startTime).format(timeFormat)} - ${moment(record?.endTime).format(timeFormat)}`
    : '';
  const date = record?.endTime ? moment(record?.endTime).format(dateFormat) : '';
  return (
    <Row gutter={[10, 0]}>
      <Col>
        <S.WrapIconTable src={alarm} alt="alarm" />
      </Col>
      <Col>
        <Row>
          <p>{time}</p>
        </Row>
        <Row>
          <S.TextTable>{date}</S.TextTable>
        </Row>
      </Col>
    </Row>
  );
}
