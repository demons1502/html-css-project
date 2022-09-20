import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import GroupButton from '../GroupButton';
import DetailAppointment from '../DetailAppointment';

// STYLES
import * as S from './styles';

export const InformationAppointment = ({ info }) => {
  console.log(info);
  return (
    <S.WrapContainer>
      <GroupButton />
      <DetailAppointment info={info} />
    </S.WrapContainer>
  );
};

InformationAppointment.prototype = {
  info: PropTypes.object,
};

export default InformationAppointment;
