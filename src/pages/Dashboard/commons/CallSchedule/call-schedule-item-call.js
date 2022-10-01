import { Checkbox, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import call from '../../../../assets/images/icons/callDashboard.svg';
import * as S from '../../styles';

export default function CallScheduleItemCall(props) {
  const { t } = useTranslation();
  const { phone1, phone2, phone3 } = props.record;

  const handleCall = (value) => {
    console.log('Call,', value);
  };

  return (
    <S.WrapTableAction>
      <Tooltip
        title={t('call-schedule.call')}
        placement="topLeft"
        overlayInnerStyle={{ borderRadius: '15px', padding: '10px 15px' }}
      >
        <img src={call} alt="call" onClick={() => handleCall(phone1 || phone2 || phone3)} />
      </Tooltip>
      <Checkbox className="checkbox-item" />
    </S.WrapTableAction>
  );
}
