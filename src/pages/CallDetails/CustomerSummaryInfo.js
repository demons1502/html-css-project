import React from 'react';
import { Space, } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import { CopyOutlined } from '@ant-design/icons';
import * as S from './styles';

import IconFiles from '../../assets/images/icons/files.svg';
import { calculateAge } from '../../helper';


export default function CustomerSumaryInfo() {
  const { t } = useTranslation();
  const { customerInfo } = useSelector(state => state.customerCall)

  const makeCustomerSummaryInfo = () => {
    const arrayData = [];

    if (!customerInfo) return arrayData;
    
    const { dob, maritalStatus, income, job, concerns, note } = customerInfo;
    const collectData = {
      age: calculateAge(dob),
      maritalStatus,
      income: income / 1000000,
      job,
      concerns,
      note
    };

    Object.keys(collectData).filter(info => collectData[info]).map(info => {

      let formatText = '';

      switch (info) {
        case 'age':
          formatText = `${collectData[info]} ${t(`call-schedule.${info}`)}`;
          break;
        case 'maritalStatus':
          formatText = collectData[info] == 1 ? t('call-schedule.married') : t('call-schedule.single');
          break;
        case 'income':
          formatText = `Thu nhập ${collectData[info]} triệu đồng/tháng`;
          break;
        case 'job':
          formatText = `${t(`call-schedule.${info}`)}: ${collectData[info]}`;
          break;
        case 'concerns':
          formatText = `${t(`call-schedule.${info}`)}: ${collectData[info]}`;
          break;
        case 'note':
          formatText = `${t(`call-schedule.${info}`)}: ${collectData[info]}`;
          break;
        default:
          break;
      }

      arrayData.push(formatText)
    })

    return arrayData
  }

  if (!customerInfo) return null;

  return (
    <div>
      <Space size={12} style={{ padding: '15px 30px' }}>
        <S.WrapText $fontSize="16px" $color={S.green100}>
          {/* <CopyOutlined /> */}
          <img src={IconFiles} alt='' />
        </S.WrapText>
        <S.WrapText $fontSize="16px" $fontWeight="600">
          {t('call-schedule.customer-summary-info')}
        </S.WrapText>
      </Space>
      <Space direction="vertical" size={6} style={{ padding: '15px 30px', borderTop: `1px solid ${S.gray100}` }}>
        {/* {CUSTOMER_INFO_SUMARY?.map((v, i) => (
          <Space key={i} align="start">
            <div style={{ height: 4, width: 4, background: '#333333', borderRadius: '50%', marginTop: 8 }}></div>
            <S.WrapText>{v}</S.WrapText>
          </Space>
        ))} */}
        <ul>
          {makeCustomerSummaryInfo().map((info, i) => (
            <S.CustomerSummaryItem key={i}>
              <div className='dot'></div>
              <p>{info}</p>
            </S.CustomerSummaryItem>
          ))}
        </ul>
        {/* <ul>{!!lastGift && <li>{lastGift}</li>}</ul> */}
      </Space>
    </div>
  );
}
