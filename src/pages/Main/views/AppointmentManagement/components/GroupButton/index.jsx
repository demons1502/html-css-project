import React from 'react';
import PropTypes from 'prop-types';
// COMPONENTS
import Edit from '../../../../../../assets/images/icons/components/Edit';
import Delete from '../../../../../../assets/images/icons/components/Delete';
// STYLES
import * as S from './styles';
import { useNavigate } from 'react-router-dom';

export const GroupButton = ({ handleOpenEdit, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <S.WrapContainer>
      <S.WrapLeft>
        <S.Button
          onClick={() => navigate('/advise/finance-consultant')}
          type='primary'
        >
          Tư vấn
        </S.Button>
        <S.Button onClick={() => navigate('/advise/survey')} type='primary'>
          Khảo sát
        </S.Button>
        <S.Button
          onClick={() => navigate('/advise/financial-solutions')}
          type='primary'
        >
          Giải pháp
        </S.Button>
      </S.WrapLeft>
      <S.WrapRight>
        <S.ButtonIcon
          onClick={handleOpenEdit}
          type='text'
          icon={<Edit />}
        ></S.ButtonIcon>
        <S.ButtonIcon
          onClick={handleDelete}
          type='text'
          icon={<Delete />}
        ></S.ButtonIcon>
      </S.WrapRight>
    </S.WrapContainer>
  );
};

GroupButton.prototype = {
  handleOpenEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default GroupButton;
