import { Checkbox, message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import call from '../../../../assets/images/icons/callDashboard.svg';
import { createCallRecord } from '../../../../slices/customerCall';
import { setDoneCall } from '../../../../slices/dashboard';
import { RESPONSE_STATUS } from '../../../../ultis/constant';
import * as S from '../../styles';

export default function CallScheduleItemCall(props) {
  const { t } = useTranslation();
  const { record } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(record.isChecked);
  const customerCall = useSelector((state) => state.customerCall);

  useEffect(() => {
    const res = customerCall?.newCallRecordResponse;
    if (res?.status === RESPONSE_STATUS.SUCCESS) {
      navigate('/call-details/' + res?.data?.call?.id || 0);
    }
    if (res?.status === RESPONSE_STATUS.FAILED) {
      message.error('Không thể tạo cuộc gọi');
    }
  }, [customerCall?.newCallRecordResponse]);

  const handleCall = async (value) => {
    dispatch(createCallRecord(Number(value?.customerCallId || 0)));
  };

  const handleCheckCallDone = (e) => {
    setChecked(e.target.checked);
    const payload = {
      customerCallId: record?.customerCallId,
      isChecked: e.target.checked,
    };
    dispatch(setDoneCall(payload));
  };

  return (
    <S.WrapTableAction>
      <Tooltip
        title={t('call-schedule.call')}
        placement="topLeft"
        overlayInnerStyle={{ borderRadius: '15px', padding: '10px 15px' }}
      >
        <img src={call} alt="call" onClick={() => handleCall(record)} />
      </Tooltip>
      <Checkbox className="checkbox-item dashboard__checkbox" checked={checked} onChange={handleCheckCallDone} />
    </S.WrapTableAction>
  );
}
