import React, { useEffect, useState } from 'react';
import { Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import * as S from './styles';

import { getSpeechScript } from '../../services/customerCalls';


export default function CustomerVoiceCall() {
  const [scriptData, setScriptData] = useState({});
  const [page, setPage] = useState(0);
  const speechScriptsList = scriptData?.dialogues || [];
  console.log('speechScriptsList', speechScriptsList)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const speechScriptData = await getSpeechScript('call');
        setScriptData({
          ...speechScriptData
        })
        // console.log('customerCall api', customerCall);
      } catch (error) {
        console.log('speechScript api err', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (dir) => {
    if (!dir || speechScriptsList?.length === 0) return;
    if (dir === 'next' && page < speechScriptsList?.length - 1) {
      setPage(page + 1)
    }
    if (dir === 'prev' && page > 0) {
      setPage(page - 1)
    }
  }

  return (
    <div>
      <S.WrapText $fontSize="18px" $fontWeight="700" $padding="15px 30px">
        {`Lời thoại khi gọi điện`}
      </S.WrapText>
      <div
        style={{
          padding: '15px 30px',
          borderTop: `1px solid ${S.gray100}`,
          borderBottom: `1px solid ${S.gray100}`,
        }}
      >
        {speechScriptsList?.length > 0 && (
          <Space direction="vertical" size={6} style={{ height: 'calc(55vh - 20px)', overflow: 'auto' }}>
            <S.WrapBtn $variant="filled" $width="max-content" $padding="14px 16px" style={{ marginBottom: 12 }}>
              {speechScriptsList[page]?.label}
            </S.WrapBtn>
            <S.WrapHTMLString dangerouslySetInnerHTML={{ __html: speechScriptsList[page]?.text }}></S.WrapHTMLString>
          </Space>
        )}
        {/*
        <Space direction="vertical" size={18} style={{ maxHeight: 'calc(55vh - 20px)', overflow: 'auto' }}>
          {speechScriptsList?.map((v, i) => (
            <Space key={i} align="start">
              <div style={{ height: 6, width: 6, background: S.green100, borderRadius: '50%', marginTop: 8 }}></div>
              <S.WrapText>{v}</S.WrapText>
            </Space>
          ))}
        </Space> */}
      </div>
      <div style={{ padding: '15px 30px', display: 'flex', justifyContent: 'flex-end' }}>
        {speechScriptsList?.length > 0 && (
          <Space size={10}>
            <S.WrapText $color={page === 0 ? S.gray300 : 'initial'}>{`Trước`}</S.WrapText>
            <div
              style={{
                cursor: 'pointer', borderRadius: 5, padding: 8,
                background: page === 0 ? '' : S.green50, color: page === 0 ? S.gray300 : S.green100,
                fontSize: 16
              }}
              onClick={() => handleChangePage('prev')}
            >
              <LeftOutlined />
            </div>
            <div
              style={{
                cursor: 'pointer', borderRadius: 5, padding: 8,
                background: page === speechScriptsList.length - 1 ? '' : S.green50, 
                color: page === speechScriptsList.length - 1 ? S.gray300 : S.green100,
                fontSize: 16
              }}
              onClick={() => handleChangePage('next')}
            >
              <RightOutlined />
            </div>
            <S.WrapText $color={page === speechScriptsList.length - 1 ? S.gray300 : 'initial'}>{`Tiếp`}</S.WrapText>
          </Space>
        )}
      </div>
    </div>
  );
}
