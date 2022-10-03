import { Checkbox, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import call from '../../../../assets/images/icons/callDashboard.svg';
import * as S from '../../styles';

export default function CallScheduleItemCall(props) {
  const { t } = useTranslation();
  const { record, onClickCall } = props;

  const handleCall = (value) => {
    console.log('Call,', value);
    if (onClickCall)
      onClickCall(value)
  };

  return (
    <S.WrapTableAction>
      <Tooltip
        title={t('call-schedule.call')}
        placement="topLeft"
        overlayInnerStyle={{ borderRadius: '15px', padding: '10px 15px' }}
      >
        {/* <img src={call} alt="call" onClick={() => handleCall(record.phone)} /> */}
        <Link to="/call-details"><img src={call} alt="call" onClick={() => handleCall(record)} /></Link>
      </Tooltip>
      <Checkbox className="checkbox-item" />
    </S.WrapTableAction>
  );
}
