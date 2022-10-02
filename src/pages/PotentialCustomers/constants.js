import React from 'react';
import { Row, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { numerology } from '../../constants/common';
import configs from '../../config';

export const URL_IMPORT_CUSTOMERS = `${configs.API_DOMAIN}/bulk-create-upload`;

export const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    render: (_, __, index) => index + 1,
    align: 'center',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullname',
    key: 'fullname',
    align: 'center',
  },
  {
    title: 'Tuổi',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone1',
    key: 'phone1',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Thân quen',
    dataIndex: 'acquaintanceLevel',
    key: 'acquaintanceLevel',
    align: 'center',
  },
  {
    title: 'Thu nhập',
    dataIndex: 'income',
    key: 'income',
    align: 'center',
  },
  {
    title: 'Hôn nhân',
    dataIndex: 'maritalStatus',
    key: 'maritalStatus',
    align: 'center',
  },
  {
    title: 'Nghề nghiệp',
    dataIndex: 'job',
    key: 'job',
    align: 'center',
  },
  {
    title: 'Loại',
    dataIndex: 'typeId',
    key: 'typeId',
    align: 'center',
  },
  {
    title: 'Thần số học',
    dataIndex: 'numerology',
    key: 'numerology',
    align: 'center',
    render: (record) => (
      <Row align="middle" justify="center" style={{ gap: '10px' }}>
        <p style={{ color: `${record === 22 && '#FF5855'}` }}>{record}</p>
        <Tooltip title={record === 22 ? numerology[numerology.length - 1] : numerology[record]}>
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      </Row>
    ),
  },
  {
    title: 'Tỉ lệ thành công',
    dataIndex: 'successfulProb',
    key: 'successfulProb',
    align: 'center',
    render: (record) => (
      <Row align="middle" justify="center" style={{ gap: '10px' }}>
        <p>
          {(() => {
            switch (true) {
              case record < 5:
                return <p style={{ color: '#FF5855' }}>{record}0%</p>;
              case record >= 5:
                return <p style={{ color: '#F6CF47' }}>{record}0%</p>;
              case record >= 7:
                return <p style={{ color: '#3DBD78' }}>{record}0%</p>;
              case record >= 10:
                return <p style={{ color: '#3DBD78' }}>{record}0%</p>;
              default:
                return null;
            }
          })()}
        </p>
        <Tooltip
          title={(() => {
            switch (true) {
              case record < 5:
                return <p style={{ color: '#FF5855' }}>Không tiềm năng</p>;
              case record >= 5:
                return <p style={{ color: '#F6CF47' }}>Hơi tiềm năng</p>;
              case record >= 7:
                return <p style={{ color: '#3DBD78' }}>Có tiềm năng</p>;
              case record >= 10:
                return <p style={{ color: '#3DBD78' }}>Rất tiềm năng</p>;
              default:
                return null;
            }
          })()}
        >
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      </Row>
    ),
  },
  {
    title: 'Khác',
    dataIndex: 'note',
    key: 'note',
    width: '10%',
    className: 'other',
    align: 'center',
  },
  {
    title: '',
    dataIndex: 'actions',
    className: 'actions',
    align: 'center',
  },
];

export const REGEX_PHONE = new RegExp(/((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/);
