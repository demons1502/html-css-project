import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAppointment } from '../../../../../../slices/appointmentManagement';

// COMPONENTS
import GroupButton from '../GroupButton';
import DetailAppointment from '../DetailAppointment';
import { Loading } from '../../../../../../components/common';
import ModalConfirm from '../../../../../../components/ModalConfirm';
import EditAppointment from '../EditAppointment';

// STYLES
import * as S from './styles';

export const InformationAppointment = ({ info }) => {
  const dispatch = useDispatch();
  const appointmentReducer = useSelector((state) => state.appointment);
  const { loading } = appointmentReducer;
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = () => {
    ModalConfirm({
      title: 'Xác nhận',
      content: `Bạn thực sự muốn xoá lịch hẹn`,
      callApi: () => dispatch(deleteAppointment({ id: info.apptId })),
    });
  };

  return (
    <S.WrapContainer>
      {info ? (
        <>
          <GroupButton handleOpenEdit={handleOpenEdit} handleDelete={handleDelete} />
          <DetailAppointment info={info} />
          <EditAppointment open={openEdit} handleCancel={handleCancelEdit} info={info} />
        </>
      ) : (
        <>
          {!loading ? (
            <S.Empty>Không có cuộc hẹn nào gần đây. Thêm cuộc hẹn để kết nối đến khách hàng tốt hơn.</S.Empty>
          ) : (
            <S.WrapLoading>
              <Loading size="large" />
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
