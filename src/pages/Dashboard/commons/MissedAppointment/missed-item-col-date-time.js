import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import alarm from '../../../../assets/images/icons/alarm.svg';
import { dateFormat, hhmmFormat } from '../../constants';
import * as S from '../../styles';

export default function MissedItemDateTime(props) {
  const { record } = props;
  const time = record?.startTime
    ? `${moment(record?.startTime).format(hhmmFormat)} - ${moment(record?.endTime).format(hhmmFormat)}`
    : '';
  const date = record?.endTime ? moment(record?.endTime).format(dateFormat) : '';
  return (
    <Row wrap={false}>
      <S.WrapIconTable src={alarm} alt="alarm" />
      <Col span={24}>
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
