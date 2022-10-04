import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Edit from '../../../../../../assets/images/icons/components/Edit';
import Delete from '../../../../../../assets/images/icons/components/Delete';
// STYLES
import * as S from './styles';
import { setSelectedCustomer } from '../../../../../../slices/customers';

export const GroupButton = ({ handleOpenEdit, handleDelete, info }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinacial = () => {
    dispatch(setSelectedCustomer(getCustomerId()));
    navigate('/advise/survey');
  };

  const getCustomerId = () => {
    if (info.typeId === 1) {
      return info.customerId ? info.customerId : info.customerApptRecords[0].customerId;
    } else {
      return info.companyCustomerId;
    }
  };

  return (
    <S.WrapContainer>
      <S.WrapLeft>
        <S.Button onClick={() => navigate('/advise')} type="primary">
          Tư vấn
        </S.Button>
        <S.Button onClick={handleFinacial} type="primary">
          Khảo sát
        </S.Button>
        <S.Button onClick={() => navigate('/advise/financial-solutions')} type="primary">
          Giải pháp
        </S.Button>
      </S.WrapLeft>
      <S.WrapRight>
        <S.ButtonIcon onClick={handleOpenEdit} type="text" icon={<Edit color="#D3D3D3" />}></S.ButtonIcon>
        <S.ButtonIcon onClick={handleDelete} type="text" icon={<Delete color="#D3D3D3" />}></S.ButtonIcon>
      </S.WrapRight>
    </S.WrapContainer>
  );
};

GroupButton.prototype = {
  handleOpenEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  info: PropTypes.object,
};

export default GroupButton;
