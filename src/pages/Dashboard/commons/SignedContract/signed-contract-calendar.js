import { Col, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import signedContract from '../../../../assets/images/icons/signedContract.svg';
import { dateFormat } from '../../constants';
import * as S from '../../styles';

export default function SignedContractCalendar(props) {
  const { t } = useTranslation();
  const { startDate, endDate, setDate, total } = props;
  const [open, setOpen] = useState(false);

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  const onChange = (date) => {
    if (date) {
      setDate(date);
      setOpen(false);
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Row>
      <S.Popover
        placement="right"
        content={<S.WrapDatePicker open={open} onChange={onChange} disabledDate={disabledDate} format="DD/MM/YYYY" />}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <S.WrapIconImageCalendar src={signedContract} />
      </S.Popover>

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
        </Row>
      </S.WrapTextAlign>
    </Row>
  );
}
