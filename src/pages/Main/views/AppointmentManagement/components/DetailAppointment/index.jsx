import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { statusAppointment } from '../../../../../../ultis/statusAppointment';
import { getTitleAppointment } from '../../../../../../ultis/appointment';

// COMPONENTS
import {
  Company,
  Map,
  Clock,
  UserCircle,
  Users,
  Calender,
  Note,
  Delete,
} from '../../../../../../assets/images/icons/components';

// STYLES
import * as S from './styles';

export const DetailAppointment = ({ info }) => {
  const startDate = new Date(info.start);
  const endDate = new Date(info.end);
  const nowDate = new Date();
  const diffTime = new Date(endDate) - new Date(startDate);
  const minutes = moment
    .duration(diffTime, 'milliseconds')
    .asMinutes()
    .toFixed();

  const statusColor = statusAppointment(
    startDate,
    endDate,
    nowDate,
    info.isCompleted,
    false
  );
  const checkColor = statusColor.color;

  const handleRemoveItem = (item) => {
    console.log(item);
  };

  return (
    <S.WrapContainer>
      <S.WrapTitle>Thông tin cuộc hẹn</S.WrapTitle>
      <S.WrapInfo>
        <S.WrapTop>
          {info?.typeId === 3 ? (
            <S.BoxTitle>
              <Company color={checkColor} />
              <S.Title
                style={{ margin: '0 5px' }}
              >{`${info.host} (Doanh nghiệp - ${info.customerApptRecords.length}`}</S.Title>
              <Users color={checkColor} />
              <S.Title>{`)`}</S.Title>
            </S.BoxTitle>
          ) : (
            <S.BoxTitle>
              <UserCircle color={checkColor} />
              <S.Title style={{ margin: '0 5px' }}>Cá nhân</S.Title>
            </S.BoxTitle>
          )}
          <S.SubTitle>{getTitleAppointment(info.title)}</S.SubTitle>
        </S.WrapTop>
        <S.wrapMiddle>
          <S.ItemMiddle>
            <Calender color='#999999' width={13} height={13} />
            <S.ItemMiddleContent>
              <S.ItemMiddleTitle>Ngày hẹn:</S.ItemMiddleTitle>
              <S.ItemMiddleTextCalender>
                {moment(info.startTime).utc().format('DD/MM/YYYY')}
              </S.ItemMiddleTextCalender>
            </S.ItemMiddleContent>
          </S.ItemMiddle>

          <S.ItemMiddle>
            <S.Divider type='vertical' />
            <Clock color='#999999' />
            <S.ItemMiddleContent>
              <S.ItemMiddleTitle>Thời gian:</S.ItemMiddleTitle>
              <S.ItemMiddleText time>
                {`${moment(info.startTime)
                  .utc()
                  .format('HH:ss')} (${minutes})p`}
              </S.ItemMiddleText>
            </S.ItemMiddleContent>
          </S.ItemMiddle>

          <S.ItemMiddle>
            <S.Divider type='vertical' />
            <Map color='#999999' />
            <S.ItemMiddleContent>
              <S.ItemMiddleTitle>Địa điểm:</S.ItemMiddleTitle>
              <S.ItemMiddleText>{info.location}</S.ItemMiddleText>
            </S.ItemMiddleContent>
          </S.ItemMiddle>
        </S.wrapMiddle>
        <S.WrapBottom>
          <Note />
          <S.WrapBottomTitle>Ghi chú:</S.WrapBottomTitle>
          <S.WrapBottomText>{info.note}</S.WrapBottomText>
        </S.WrapBottom>
      </S.WrapInfo>
      {info?.typeId === 3 && (
        <>
          <S.WrapTitle>Thành phần tham gia</S.WrapTitle>
          <S.WrapParticipant>
            {info?.customerApptRecords.map((i) => (
              <S.WrapParticipantItem key={i.customerApptRecordId}>
                <S.WrapParticipantItem>
                  <S.Badge status='success' text={i.name} />
                  <S.ButtonDelete
                    icon={<Delete width={16} height={16} />}
                    onClick={() => handleRemoveItem(i)}
                    type='text'
                  ></S.ButtonDelete>
                </S.WrapParticipantItem>
              </S.WrapParticipantItem>
            ))}
          </S.WrapParticipant>
        </>
      )}

      <S.Button>Trang chủ</S.Button>
    </S.WrapContainer>
  );
};

DetailAppointment.prototype = {
  info: PropTypes.object,
};

export default DetailAppointment;
