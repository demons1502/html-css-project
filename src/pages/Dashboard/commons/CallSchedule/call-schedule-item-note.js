import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from '../../styles';

export default function CallScheduleItemNote({ props }) {
  const { t } = useTranslation();
  const { customer, noteCount } = props;
  const [note, setNote] = useState('');

  useEffect(() => {
    switch (customer.status) {
      case 'STOP_CONSULTING':
        setNote('Không còn tiềm năng');
        break;
      case 'NOT_CALL_YET':
        setNote('Chưa gọi điện');
        break;
      case 'CALL_1_CALL_2':
        setNote(`Đã gọi điện lần ${noteCount}`);
        break;
      case 'CALL_N_CALL_N_1':
        setNote(`Đã gọi điện lần ${noteCount}`);
        break;
      case 'APPOINTMENT_SURVEY':
        setNote('Đã có lịch hẹn gặp khảo sát');
        break;
      case 'SURVEYED_FINANCE_CONSULT':
        setNote('Đã khảo sát');
        break;
      case 'APPOINTMENT_CONSULT':
        setNote('Đã có lịch tư vấn tài chính');
        break;
      case 'SOLUTION_RESULT':
        setNote('Đã tư vấn tài chính');
        break;
      case 'RESULT_CONTRACT':
        setNote('Đã tư vấn giải pháp');
        break;
      case 'CONTRACTED':
        setNote('Đã chốt kết quả');
        break;
      case 'CONSULTED_SOLUTION':
        setNote('Đã có hợp đồng');
        break;
      case 'CUSTOMER_CARE':
        setNote('Chăm sóc khách hàng cho hợp đồng tiếp theo');
        break;

      default:
        break;
    }
  }, [customer, noteCount]);

  return (
    <Tooltip title={note} placement="topLeft" overlayInnerStyle={{ borderRadius: '15px', padding: '10px 15px' }}>
      <S.TextP2Row>{note}</S.TextP2Row>
    </Tooltip>
  );
}
