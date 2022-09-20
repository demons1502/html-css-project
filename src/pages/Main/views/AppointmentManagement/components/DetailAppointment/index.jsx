import React from 'react';
import PropTypes from 'prop-types';
import { statusAppointment } from '../../../../../../ultis/statusAppointment';

// COMPONENTS
import {
  Company,
  Map,
  Clock,
  UserCircle,
  Users,
} from '../../../../../../assets/images/icons/components';
// STYLES
import * as S from './styles';

export const DetailAppointment = ({ info }) => {
  const color =
    info.status === 'wait'
      ? statusAppointment(info.status).backgroundColor
      : statusAppointment(info.status).color;
  return (
    <S.WrapContainer>
      <S.WrapTitle>Thông tin cuộc hẹn</S.WrapTitle>
      <S.WrapInfo>
        <S.WrapTop>
          {info.company ? (
            <S.BoxTitle>
              <Company color={color} />
              <S.Title
                style={{ margin: '0 5px' }}
              >{`${info.title} (Doanh nghiệp - ${info.company.members}`}</S.Title>
              <Users color={color} />
              <S.Title>{`)`}</S.Title>
            </S.BoxTitle>
          ) : (
            <S.BoxTitle>
              <UserCircle color={color} />
              <S.Title style={{ margin: '0 5px' }}>Cá nhân</S.Title>
            </S.BoxTitle>
          )}
          <S.SubTitle>{info.description}</S.SubTitle>
        </S.WrapTop>
        <S.wrapMiddle>
          <S.ItemMiddle></S.ItemMiddle>
          <S.ItemMiddle></S.ItemMiddle>
          <S.ItemMiddle></S.ItemMiddle>
        </S.wrapMiddle>
      </S.WrapInfo>
    </S.WrapContainer>
  );
};

DetailAppointment.prototype = {
  info: PropTypes.object,
};

export default DetailAppointment;
