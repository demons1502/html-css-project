import { Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from '../../styles';

export default function CallScheduleItemTitle(props) {
  const { t } = useTranslation();
  const { title } = props;

  return (
    <S.TextP>
      <Tooltip title={title} placement="topLeft" overlayInnerStyle={{ borderRadius: '15px', padding: '10px 15px' }}>
        {title}
      </Tooltip>
    </S.TextP>
  );
}
