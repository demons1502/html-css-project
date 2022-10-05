import React, { useEffect, useState } from 'react';
import { Space } from 'antd';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import * as S from './styles';

import { getSpeechScript } from '../../services/customerCalls';

const TEXT_VOICES = [
  'Thưa chị xxxx, Manulife hiện đang có công cụ tài chính đặc biệt giúp khách hàng quản trị tốt vận may và chuyển giao sự thịnh vượng cho thế hệ thứ 2 một cách trọn vẹn.',
  'Thưa chị xxxx, Manulife hiện đang có công cụ tài chính đặc biệt giúp khách hàng quản trị tốt vận may và chuyển giao sự thịnh vượng cho thế hệ thứ 2 một cách trọn vẹn.',
  'Thưa chị xxxx, Manulife hiện đang có công cụ tài chính đặc biệt giúp khách hàng quản trị tốt vận may và chuyển giao sự thịnh vượng cho thế hệ thứ 2 một cách trọn vẹn.',
  'Chính vì thế em muốn chia sẻ những lợi ích này cùng chị và gia đình. Việc khảo sát này chỉ mất khoảng 10 phút mà thôi trừ khi chị muốn tim hieu them thong tin.',
  'Chính vì thế em muốn chia sẻ những lợi ích này cùng chị và gia đình. Việc khảo sát này chỉ mất khoảng 10 phút mà thôi trừ khi chị muốn tim hieu them thong tin.',
  'Chính vì thế em muốn chia sẻ những lợi ích này cùng chị và gia đình. Việc khảo sát này chỉ mất khoảng 10 phút mà thôi trừ khi chị muốn tim hieu them thong tin.',
];

export default function CustomerVoiceCall() {
  const [scriptData, setScriptData] = useState({});
  const speechScriptsList = scriptData?.objective?.split('\n') || [];

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

  return (
    <div>
      <S.WrapText $fontSize="18px" $fontWeight="700" $padding="15px 30px">
        {`Lời thoại khi gọi điện`}
      </S.WrapText>
      <div
        style={{
          padding: '15px 30px',
          borderTop: `1px solid ${S.gray100}`,
          // borderBottom: `1px solid ${S.gray100}`,
        }}
      >
        <S.WrapBtn $variant="filled" $width="max-content" $padding="14px 16px" style={{ marginBottom: 12 }}>
          {`Lời thoại 1`}
        </S.WrapBtn>
        <Space direction="vertical" size={18} style={{ maxHeight: 'calc(55vh - 20px)', overflow: 'auto' }}>
          {speechScriptsList?.map((v, i) => (
            <Space key={i} align="start">
              <div style={{ height: 6, width: 6, background: S.green100, borderRadius: '50%', marginTop: 8 }}></div>
              <S.WrapText>{v}</S.WrapText>
            </Space>
          ))}
        </Space>
      </div>
      {/* <div style={{ padding: '15px 30px', display: 'flex', justifyContent: 'flex-end' }}>
        <Space size={10}>
          <S.WrapText>Truoc</S.WrapText>
          <div style={{ borderRadius: 5, padding: 8, background: S.green50, color: S.green100, fontSize: 16 }}>
            <LeftOutlined />
          </div>
          <div style={{ borderRadius: 5, padding: 8, background: S.green50, color: S.green100, fontSize: 16 }}>
            <RightOutlined />
          </div>
          <S.WrapText>Tiep</S.WrapText>
        </Space>
      </div> */}
    </div>
  );
}
