import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import Edit from '../../../../../../assets/images/icons/components/Edit';
import Delete from '../../../../../../assets/images/icons/components/Delete';

// STYLES
import * as S from './styles';

export const GroupButton = ({ handleOpenEdit, handleDelete, info }) => {
  const navigate = useNavigate();
  const nowDate = new Date();
  const endEnd = new Date(info.endTime)

  const { customerApptRecords } = info
  const handleFinacial = () => {
    navigate(`/advise/survey?appointment_id=${info.apptId}`);
  };

  const handleFinanceConsultant = () => {
    navigate(`/advise/finance-consultant?appointment_id=${info.apptId}`);
  };

  const checkLink = (key) => {
    const value = customerApptRecords.every(i => i[key] !== null)
    return endEnd.getTime() < nowDate.getTime()
      ? value ? true : false
      : true
  }

  return (
    <S.WrapContainer>
      <S.WrapLeft>
        { checkLink('consultId') &&
          <S.Button onClick={ handleFinanceConsultant } type="primary">
            Tư vấn
          </S.Button>
        }

        { checkLink('surveyId') &&
          <S.Button onClick={ handleFinacial } type="primary">
            Khảo sát
          </S.Button>
        }

        { checkLink('solutionId') &&
          <S.Button onClick={ () => navigate(`/advise/financial-solutions?appointment_id=${info.apptId}`) } type="primary">
            Giải pháp
          </S.Button>
        }

      </S.WrapLeft>
      <S.WrapRight>
        <S.ButtonIcon onClick={ handleOpenEdit } type="text" icon={ <Edit color="#D3D3D3" /> }></S.ButtonIcon>
        <S.ButtonIcon onClick={ handleDelete } type="text" icon={ <Delete color="#D3D3D3" /> }></S.ButtonIcon>
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
