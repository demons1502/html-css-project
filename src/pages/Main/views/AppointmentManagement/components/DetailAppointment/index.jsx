import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { statusAppointment } from '../../../../../../ultis/statusAppointment';
import { getTitleAppointment } from '../../../../../../ultis/appointment';
import { editAppointment } from '../../../../../../slices/appointmentManagement';

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
import ModalConfirm from '../../../../../../components/ModalConfirm';

// STYLES
import * as S from './styles';

export const DetailAppointment = ({ info }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startDate = new Date(info.start);
  const endDate = new Date(info.end);
  const nowDate = new Date();
  const diffTime = new Date(endDate) - new Date(startDate);
  const minutes = moment.duration(diffTime, 'milliseconds').asMinutes().toFixed();

  const statusColor = statusAppointment(startDate, endDate, nowDate, info.isCompleted, false);
  const checkColor = statusColor.color;

  const openPopUpRemove = (item) => {
    ModalConfirm({
      title: 'Xác nhận',
      content: `Bạn thực sự muốn xoá người tham gia ${item.name}`,
      callApi: () => handleRemoveItem(item),
    });
  };

  const handleRemoveItem = (item) => {
    const subCustomerIds = info.customerApptRecords
      .filter((i) => i.customerId !== item.customerId)
      .map((i) => i.customerId);

    const data = {
      ...info,
      customerId: info.companyCustomerId,
      subCustomerIds: subCustomerIds,
    };

    dispatch(editAppointment({ id: data.apptId, data: data })).then(({ error }) => {
      if (!error) {
        handleCancel();
        message.success(`Bạn đã xoá thành công người tham gia ${item.name}`);
      } else {
        message.error(`Bạn đã xoá thất bại người tham gia ${item.name}`);
      }
    });
  };

  return (
    <S.WrapContainer>
      <S.WrapTitle>Thông tin cuộc hẹn</S.WrapTitle>
      <S.WrapInfo>
        <S.WrapTop>
          { info?.typeId === 3 ? (
            <S.BoxTitle>
              <Company color={ checkColor } />
              <S.Title
                style={ { margin: '0 5px' } }
              >{ `${info.host} (Doanh nghiệp - ${info.customerApptRecords.length}` }</S.Title>
              <Users color={ checkColor } />
              <S.Title>{ `)` }</S.Title>
            </S.BoxTitle>
          ) : (
            <S.BoxTitle>
              <UserCircle color={ checkColor } />
              <S.Title style={ { margin: '0 5px' } }>{ info.host }</S.Title>
            </S.BoxTitle>
          ) }
          <S.SubTitle>{ getTitleAppointment(info.title) }</S.SubTitle>
        </S.WrapTop>
        <S.wrapMiddle>
          <S.ItemMiddle>
            <Calender color="#999999" width={ 13 } height={ 13 } />
            <S.ItemMiddleContent>
              <S.ItemMiddleTitle>Ngày hẹn:</S.ItemMiddleTitle>
              <S.ItemMiddleTextCalender>{ moment(info.startTime).utc().format('DD/MM/YYYY') }</S.ItemMiddleTextCalender>
            </S.ItemMiddleContent>
          </S.ItemMiddle>

          <S.ItemMiddle>
            <S.Divider type="vertical" />
            <Clock color="#999999" />
            <S.ItemMiddleContent>
              <S.ItemMiddleTitle>Thời gian:</S.ItemMiddleTitle>
              <S.ItemMiddleText time>
                { `${moment(info.startTime).utc().format('HH:mm')} (${minutes})p` }
              </S.ItemMiddleText>
            </S.ItemMiddleContent>
          </S.ItemMiddle>

          <S.ItemMiddle>
            <S.Divider type="vertical" />
            <Map color="#999999" />
            <S.ItemMiddleContent>
              <S.ItemMiddleTitle>Địa điểm:</S.ItemMiddleTitle>
              <S.ItemMiddleText>{ info.location }</S.ItemMiddleText>
            </S.ItemMiddleContent>
          </S.ItemMiddle>
        </S.wrapMiddle>
        <S.WrapBottom>
          <Note />
          <S.WrapBottomTitle>Ghi chú:</S.WrapBottomTitle>
          <S.WrapBottomText>{ info.note }</S.WrapBottomText>
        </S.WrapBottom>
      </S.WrapInfo>
      { info?.typeId === 3 && (
        <>
          <S.WrapTitle>Thành phần tham gia</S.WrapTitle>
          <S.WrapParticipant>
            { info?.customerApptRecords.map((i) => (
              <S.WrapParticipantItem key={ i.customerApptRecordId }>
                <S.WrapParticipantItem>
                  <S.Badge status="success" text={ i.name } />
                  <S.ButtonDelete
                    icon={ <Delete width={ 16 } height={ 16 } /> }
                    onClick={ () => handleRemoveItem(i) }
                    type="text"
                  ></S.ButtonDelete>
                </S.WrapParticipantItem>
              </S.WrapParticipantItem>
            )) }
          </S.WrapParticipant>
        </>
      ) }

      <S.Button onClick={ () => navigate('/dashboard') }>Trang chủ</S.Button>
    </S.WrapContainer>
  );
};

DetailAppointment.prototype = {
  info: PropTypes.object,
};

export default DetailAppointment;
