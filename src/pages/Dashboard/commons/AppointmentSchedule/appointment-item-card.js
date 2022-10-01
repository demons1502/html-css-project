import { Checkbox, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import alarmGray from '../../../../assets/images/icons/alarmGray.svg';
import calendar from '../../../../assets/images/icons/calendar.svg';
import company from '../../../../assets/images/icons/company.svg';
import locationIcon from '../../../../assets/images/icons/location.svg';
import userCircle from '../../../../assets/images/icons/userCircle.svg';
import { updateAppointmentSchedules } from '../../../../slices/dashboard';
import { dateFormat, hhmmFormat } from '../../constants';
import * as S from '../../styles';

export default function AppointmentItemCard(props) {
  const { t } = useTranslation();
  const { apptId, typeId, host, title, startTime, endTime, location, isCompleted } = props.item;
  const dispatch = useDispatch();

  const handleSelectDone = () => {
    if (!isCompleted) {
      const payload = {
        ...props.item,
        customerId: props.item.customerApptRecords[0].customerId,
        isCompleted: true,
      };
      dispatch(updateAppointmentSchedules(payload));
    }
  };

  return (
    <S.ItemAppointment>
      <S.WrapFirstColAppointment span={24}>
        <Row>
          <Col span={20}>
            <Row>
              <S.WrapIconImage $width="15px" $height="15px" src={typeId === 1 ? userCircle : company} alt="iconType" />
              <Col span={22}>
                <Row gutter={[0, 4]}>
                  <S.WrapTextItem $fontSize="14px" $fontWeight="700" $lineHeight="18px" span={24}>
                    {host}
                  </S.WrapTextItem>
                  <S.WrapTextItem $fontWeight="600" $lineHeight="15px" span={24}>
                    {title}
                  </S.WrapTextItem>
                </Row>
              </Col>
            </Row>
          </Col>
          <S.WrapTextRight span={4}>
            <Checkbox className="checkbox-item" onClick={handleSelectDone} checked={isCompleted} />
          </S.WrapTextRight>
        </Row>
      </S.WrapFirstColAppointment>
      <S.WrapHr />
      <S.WrapSecondColAppointment span={24}>
        <Row gutter={5}>
          <Col span={6}>
            <Row>
              <S.WrapIconImage $width="15px" $height="15px" src={calendar} alt="company" />
              <S.WrapBorderRight span={18}>
                <Row gutter={[0, 4]}>
                  <Col span={24}>Ngày hẹn:</Col>
                  <S.WrapTextItem $fontWeight="600" $lineHeight="15px" span={24}>
                    {moment(endTime).format(dateFormat)}
                  </S.WrapTextItem>
                </Row>
              </S.WrapBorderRight>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <S.WrapIconImage $width="15px" $height="15px" src={alarmGray} alt="company" />
              <S.WrapBorderRight span={18}>
                <Row gutter={[0, 4]}>
                  <Col span={24}>Thời gian:</Col>
                  <S.WrapTextItem $fontWeight="600" $lineHeight="15px" span={24}>
                    {moment(startTime).format(hhmmFormat)} ({moment(endTime).diff(moment(startTime), 'minutes')}p)
                  </S.WrapTextItem>
                </Row>
              </S.WrapBorderRight>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <S.WrapIconImage $width="15px" $height="15px" src={locationIcon} alt="company" />
              <Col span={20}>
                <Row gutter={[0, 4]}>
                  <Col span={24}>Địa điểm:</Col>
                  <S.WrapTextItem $fontWeight="600" $lineHeight="15px" span={24}>
                    {location}
                  </S.WrapTextItem>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </S.WrapSecondColAppointment>
    </S.ItemAppointment>
  );
}
