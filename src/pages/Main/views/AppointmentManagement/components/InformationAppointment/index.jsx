import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// COMPONENTS
import GroupButton from '../GroupButton';
import DetailAppointment from '../DetailAppointment';
import { Loading } from '../../../../../../components/common';

// STYLES
import * as S from './styles';

export const InformationAppointment = ({ info }) => {
  const appointmentReducer = useSelector((state) => state.appointment);
  const { loading } = appointmentReducer;
  return (
    <S.WrapContainer>
      {Object.keys(info).length > 0 ? (
        <>
          <GroupButton />
          <DetailAppointment info={info} />
        </>
      ) : (
        <>
          {!loading ? (
            <S.Empty>
              Không có cuộc hẹn nào gần đây. Thêm cuộc hẹn để kết nối đến khách
              hàng tốt hơn.
            </S.Empty>
          ) : (
            <S.WrapLoading>
              <Loading size='large' />
            </S.WrapLoading>
          )}
        </>
      )}
    </S.WrapContainer>
  );
};

InformationAppointment.prototype = {
  info: PropTypes.object,
};

export default InformationAppointment;
