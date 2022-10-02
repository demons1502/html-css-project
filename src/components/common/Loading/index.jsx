import React from 'react';
import PropTypes from 'prop-types';

//STYLES
import * as S from './styles';

export const Loading = ({ size }) => {
  return <S.Spin size={size}></S.Spin>;
};

Loading.defaultProps = {
  size: '',
};

Loading.prototype = {
  size: PropTypes.string,
};
export default Loading;
