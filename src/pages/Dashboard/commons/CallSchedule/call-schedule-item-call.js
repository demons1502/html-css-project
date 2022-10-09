import { Checkbox, message, Tooltip } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import call from '../../../../assets/images/icons/callDashboard.svg';
import * as S from '../../styles';
import { createCallRecord } from '../../../../slices/customerCall';
import moment from 'moment';
import { dateContractFormat } from '../../constants';
import { setDoneCall } from '../../../../slices/dashboard';

export default function CallScheduleItemCall(props) {
  const { t } = useTranslation();
  const { record } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checked = moment().format(dateContractFormat) === record.lastCall;

  const handleCall = async (value) => {
    dispatch(createCallRecord(Number(value?.customerCallId || 0))).then(({ error }) => {
      if (error) {
        message.error('Không thể tạo cuộc gọi');
      } else {
        navigate('/call-details/' + value?.customerCallId || 0);
      }
    });
  };

  const handleCheckCallDone = (e) => {
    if (!checked && e.target.checked) {
      const payload = {
        customerCallId: record?.customerCallId,
        isInstant: true,
      };
      dispatch(setDoneCall(payload));
    }
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
