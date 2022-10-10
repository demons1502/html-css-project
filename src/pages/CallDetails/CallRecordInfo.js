import { message, Space } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as S from './styles';
import { updateCustomerCallRecord } from '../../services/customerCalls';
import { creactAppointmentApi } from '../../services/appointment';
import { useNavigate } from 'react-router-dom';
import CreateAppointment from '../Main/views/AppointmentManagement/components/CreateAppointment';
import { COMPANY_CUSTOMER_TYPE_ID, EMPLOYEE_CUSTOMER_TYPE_ID, PERSONAL_CUSTOMER_TYPE_ID } from './constants';
import { updateCallRecord } from '../../slices/customerCall';
import { createAppointment } from '../../slices/appointmentManagement';
import moment from 'moment';

export default function CallRecordInfo(props) {
  const [currentCheck, setCurrentCheck] = useState('');
  const [loadingBtn, setLoadingBtn] = useState({
    complete: false,
    cancel: false
  });
  const [openAppointment, setOpenAppointment] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { callRecord: callRecordData, customerInfo: customerData, customerCall: customerCallData } = useSelector(state => state.customerCall);
  // const { callRecordData, customerData, customerCallData } = props;
  const isCompleted = callRecordData?.completedAt;


  const renderNoteStatus = (sttEnum) => {
    switch (sttEnum) {
      case 'NOT_CALL_YET':
        return 'Chưa gọi điện lần nào';
      case 'CALL_1_CALL_2':
        return 'Đã gọi điện 1 lần';
      case 'CALL_N_CALL_N_1':
        return `Đã gọi điện ${customerCallData?.noteCount} lần`;
      default:
        return sttEnum;
    }
  };

  const getCustomerType = (typeId) => {
    switch (typeId) {
      case PERSONAL_CUSTOMER_TYPE_ID:
        return t('call-schedule.user');
      case EMPLOYEE_CUSTOMER_TYPE_ID:
        return t('call-schedule.user');
      case COMPANY_CUSTOMER_TYPE_ID:
        return t('call-schedule.company');
      default:
        return '';
    }
  }

  const handleUpdateCallRecord = async (action) => {
    if (!action) return;
    let isCompleted = null;
    // console.log({ callrecordData, customerData, customerCallData })
    if (action === 'complete') { isCompleted = true }
    if (action === 'cancel') { isCompleted = false }

    setLoadingBtn({ ...loadingBtn, [action]: true });
    const prePayload = {
      customerCallId: customerCallData.id,
      customerCallRecordId: callRecordData.id,
      isCompleted
    }
    if (currentCheck) {
      prePayload.isPotential = currentCheck === '1' ? true : false
    }

    dispatch(updateCallRecord(prePayload)).then(({ error }) => {
      setLoadingBtn({ ...loadingBtn, [action]: false });
      if (error) {
        message.error('Hoàn thành hoặc hủy cuộc gọi xảy ra lỗi')
      } else {
        navigate('/dashboard')
      }
    })
  };

  const toggleAppointment = (status) => {
    if ([true, false].includes(status))
      return setOpenAppointment(status);
    return setOpenAppointment(!openAppointment)
  };

  const handleClickFuncBtn = async (action) => {
    setLoadingBtn({ ...loadingBtn, [action]: true });

    if (action === 'appointment') {
      toggleAppointment(true)
    } else {
      const prePayload = {
        customerCallId: customerCallData.id,
        customerCallRecordId: callRecordData.id,
        isCompleted: true
      }
      if (currentCheck) {
        prePayload.isPotential = currentCheck === '1' ? true : false
      }
      // complete call
      dispatch(updateCallRecord(prePayload)).then(({ error }) => {
        setLoadingBtn({ ...loadingBtn, [action]: false });
        if (error) {
          message.error('Hoàn thành hoặc hủy cuộc gọi xảy ra lỗi')
        } else {
          const title = {
            'survey': 'Khảo sát',
            'consult': 'Tư vấn tài chính',
            'solution': 'Tư vấn giải pháp'
          };
          const startTime = moment(new Date());;
          const appointmentPayload = {
            typeId: customerData.typeId,
            customerId: customerData.customerId,
            title: title[action],
            startTime: startTime.toDate(),
            endTime: startTime.add(10, 'm').toDate(),
            isAuto: true
          };
          // console.log('appointmentPayload', appointmentPayload)
          creactAppointmentApi(appointmentPayload).then(data => {
            const redirectPage = {
              'survey': `/advise/survey?appointment_id=${data.apptId}`,
              'consult': '/advise',
              'solution': '/advise/financial-solutions'
            }
            navigate(redirectPage[action])
          })
        }
      })
    }
    setLoadingBtn({ ...loadingBtn, [action]: false })
  }

  return (
    <div>
      <S.WrapContent $padding="30px">
        <Space direction="vertical" size={15} style={{ width: '100%' }}>
          <Space align="center">
            <S.WrapText $color={S.gray200} $fontSize="13px">
              {`${t('call-schedule.call-status-label')}:`}
            </S.WrapText>
            <S.WrapText $color={isCompleted ? S.error : S.green100} $fontSize="18px">
              {isCompleted ? t('call-schedule.call-canceled-status') : t('call-schedule.call-pending-status')}
            </S.WrapText>
          </Space>
          <S.WrapContent $padding="15px" $borderColor={S.gray100} $borderRadius="15px" $wFull={true}>
            <Space direction="vertical" size={15} style={{ width: '100%' }}>
              <S.FlexContent $justifyContent="space-between">
                <S.WrapText $fontSize="18px" $fontWeight="bold">
                  {customerData?.fullname}
                </S.WrapText>
                <Space>
                  <S.WrapBtn $variant="filled" disabled={isCompleted || loadingBtn['complete']} onClick={() => handleUpdateCallRecord('complete')}>
                    {t('call-schedule.call-completed-status')}
                  </S.WrapBtn>
                  <S.WrapBtn $variant="filled" $colorScheme="error" disabled={isCompleted || loadingBtn['cancel']} onClick={() => handleUpdateCallRecord('cancel')}>
                    {t('call-schedule.call-cancel')}
                  </S.WrapBtn>
                </Space>
              </S.FlexContent>
              <S.WrapContent $padding="15px" $borderColor={S.green100} $borderRadius="15px">
                <Space direction="vertical">
                  <Space size={44}>
                    <Space direction="vertical" size={4}>
                      <Space align="center">
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: S.green100 }}></div>
                        <S.WrapText>{`Số điện thoại:`}</S.WrapText>
                      </Space>
                      <S.WrapText $fontWeight="700" style={{ marginLeft: 12 }}>
                        {customerData?.phone1}
                      </S.WrapText>
                    </Space>
                    <Space direction="vertical" size={4}>
                      <Space align="center">
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: S.green100 }}></div>
                        <S.WrapText>{`${t('call-schedule.customer-type-label')}:`}</S.WrapText>
                      </Space>
                      <S.WrapText $fontWeight="700" style={{ marginLeft: 12 }}>
                        {getCustomerType(customerData?.typeId)}
                      </S.WrapText>
                    </Space>
                  </Space>
                  <Space style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 16, color: S.gray200 }}>
                      <FileDoneOutlined />
                    </div>
                    <S.WrapText>{`${t('common.note')}:`}</S.WrapText>
                    <S.WrapText $fontWeight="700">{renderNoteStatus(customerData?.status)}</S.WrapText>
                  </Space>
                </Space>
              </S.WrapContent>
              <Space align="center">
                <S.WrapBtn $variant="outlined" $borderRadius="5px" disabled={isCompleted || loadingBtn['appointment']} onClick={() => handleClickFuncBtn('appointment')}>
                  {t('call-schedule.make-appointment')}
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px" disabled={isCompleted || loadingBtn['survey']} onClick={() => handleClickFuncBtn('survey')}>
                  {t('call-schedule.survey')}
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px" disabled={isCompleted || loadingBtn['consult']} onClick={() => handleClickFuncBtn('consult')}>
                  {t('call-schedule.consult')}
                </S.WrapBtn>
                <S.WrapBtn $variant="outlined" $borderRadius="5px" disabled={isCompleted || loadingBtn['solution']} onClick={() => handleClickFuncBtn('solution')}>
                  {t('call-schedule.solution')}
                </S.WrapBtn>
              </Space>
            </Space>
          </S.WrapContent>
          <Space size={40} align="center">
            <S.WrapCheckbox
              checked={currentCheck === '1'}
              disabled={isCompleted}
              onChange={({ target }) => setCurrentCheck(target.checked ? '1' : '')}
            >
              {t('call-schedule.call-more')}
            </S.WrapCheckbox>
            <S.WrapCheckbox 
              checked={currentCheck === '2'} 
              disabled={isCompleted} 
              onChange={({ target }) => setCurrentCheck(target.checked ? '2' : '')}
            >
              {t('call-schedule.no-more-potential')}
            </S.WrapCheckbox>
          </Space>
        </Space>
      </S.WrapContent>
      <CreateAppointment 
        open={openAppointment} 
        handleCancel={toggleAppointment}
        customerInfo={customerData}
        outsideLink={true}
      />
    </div>
  );
}
