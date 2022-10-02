import { Col, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import signedContract from '../../../../assets/images/icons/signedContract.svg';
import * as S from '../../styles';
import { dateFormat } from '../../constants';

export default function SignedContractCalendar(props) {
  const { t } = useTranslation();
  const { startDate, endDate, setDate, total } = props;
  const [active, setActive] = useState(false);

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  const onChange = (date) => {
    if (date) {
      setDate(date);
      setActive(false);
    }
  };

  const handleSelectCalendar = () => {
    setActive(true);
  };

  return (
    <Row>
      <S.WrapIconImageCalendar src={signedContract} onClick={handleSelectCalendar} />
      <S.WrapTextAlign flex="auto">
        <Row gutter={[0, 5]}>
          <Col span={24}>
            {startDate.format(dateFormat)} - {endDate.format(dateFormat)}
          </Col>
          <Col span={24}>
            <S.TextColor $color="#3DBD77" $fontSize="20px">
              {total}
            </S.TextColor>
            {` hợp đồng`}
          </Col>
          <S.DatePicker $display={active} onChange={onChange} disabledDate={disabledDate} />
        </Row>
      </S.WrapTextAlign>
    </Row>
  );
}