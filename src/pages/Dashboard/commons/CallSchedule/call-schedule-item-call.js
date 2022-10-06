import { Checkbox, Tooltip } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import call from '../../../../assets/images/icons/callDashboard.svg';
import * as S from '../../styles';
import { createCustomerCallRecord } from '../../../../services/customerCalls';

export default function CallScheduleItemCall(props) {
  const { t } = useTranslation();
  const { record, onClickCall } = props;
  const navigate = useNavigate();

  const handleCall = async (value) => {
    console.log('value', value);
    await createCustomerCallRecord(Number(value?.customerCallId || 0))
    navigate('/call-details/' + value?.customerCallId || 0)
    // if (onClickCall) onClickCall(value);
  };

  return (
    <S.WrapTableAction>
      <Tooltip
        title={t('call-schedule.call')}
        placement="topLeft"
        overlayInnerStyle={{ borderRadius: '15px', padding: '10px 15px' }}
      >
        {/* <Link to="/call-details" style={S.linkStyle}>
          <img src={call} alt="call" onClick={() => handleCall(record)} />
        </Link> */}
        <div>
          <img src={call} alt="call" onClick={() => handleCall(record)} />
        </div>
      </Tooltip>
      <Checkbox className="checkbox-item dashboard__checkbox" />
    </S.WrapTableAction>
  );
}
