import { Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import groupCall from '../../../../assets/images/icons/groupCall.svg';
import { createCallTransfer } from '../../../../slices/dashboard';
import * as S from '../../styles';

export default function PotentialItemCall(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { record } = props;
  const handleCall = (value) => {
    if (value) {
      dispatch(createCallTransfer({ customerIds: [value] }));
    }
  };

  return (
    <Tooltip
      title={t('top-potential-customer.changeCall')}
      placement="topLeft"
      overlayInnerStyle={{ borderRadius: '15px', padding: '10px 15px' }}
    >
      <S.WrapTableAction>
        <img src={groupCall} alt="" onClick={() => handleCall(record.customerId)} />
      </S.WrapTableAction>
    </Tooltip>
  );
}
