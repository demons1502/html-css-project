import { Spin, Table } from 'antd';
import { React, useCallback, useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterCommon from '../../components/common/Filter';
import Pagination from '../../components/common/Pagination';
import TableCommon from '../../components/common/TableNormal';
import { Button } from '../../components/styles';
import { getConsult } from '../../slices/consult';
import { DEFAULT_SIZE, LOADING_STATUS } from '../../ultis/constant';
import { options } from './options';
import { formatDataNumber } from '../../helper/index';
import { marriageStatus, acquaintanceLevel, typeCustomer } from '../../constants/common';
import { useNavigate } from 'react-router-dom';

export default function FinanceConsultant() {
  const [status, setStatus] = useState(_.map(options, 'value'));
  const [paginate, setPaginate] = useState({ limit: DEFAULT_SIZE, offset: 1 });

  const consults = useSelector((state) => state.consultReducer);
  const loading = useSelector((state) => state.loading.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columns = [
    {
      title: 'STT',
      dataIndex: 'customerId',
      // render: (_, record, index) => {
      //   return <span>{index + 1}</span>;
      // },
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
    },
    {
      title: 'Số điện thoại',
      // dataIndex: 'phone1',
      render: (record) => {
        return <span>{record.phone1 || record.phone2}</span>;
      },
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
    },
    {
      title: 'Thân quen',
      // dataIndex: 'acquaintanceLevel',
      render: (record) => {
        const index = acquaintanceLevel.findIndex((item) => item.value === +record.acquaintanceLevel);
        return <span>{acquaintanceLevel[index].label}</span>;
      },
    },
    {
      title: 'Thu nhập',
      // dataIndex: 'income',
      render: (record) => {
        return <span>{formatDataNumber(record.income)}</span>;
      },
    },
    {
      title: 'Hôn nhân',
      // dataIndex: 'maritalStatus',
      render: (record) => {
        const index = marriageStatus.findIndex((item) => item.value === +record.maritalStatus);
        return <span>{marriageStatus[index].label}</span>;
      },
    },
    {
      title: 'Nghề nghiệp',
      dataIndex: 'job',
    },
    {
      title: 'Loại',
      // dataIndex: 'typeId',
      render: (record) => {
        const index = typeCustomer.findIndex((item) => item.value === +record.typeId);
        return <span>{typeCustomer[index]?.label || 'Cá nhân'}</span>;
      },
    },
    {
      title: 'Trạng thái',
      // dataIndex: 'status',
      render: (record) => {
        const index = options.findIndex((item) => item.value === record.status);
        return <span>{options[index].label}</span>;
      },
    },
    {
      title: 'Lịch hẹn sắp tới',
      dataIndex: 'appointment_schedule',
    },
    {
      title: '',
      dataIndex: '',
      render: (record) =>
        record.appointment_schedule ? (
          <Button size="small">Nhắc lịch</Button>
        ) : (
          <Button size="small" type="primary" onClick={() => navigate('/appointment-management')}>
            Đặt lịch
          </Button>
        ),
    },
  ];

  useEffect(() => {
    const offset = (paginate.offset - 1) * paginate.limit;
    const params = { limit: paginate.limit, offset: offset, status };
    status && dispatch(getConsult({ params }));
  }, [paginate, status]);

  return (
    <div className="content-box consultant_container">
      <div className="consultant_header">
        <div className="header_left">
          <h3>Tư vấn</h3>
          <div className="header_list_container">
            <ul className="header_list">
              <li>
                <span className="list_item_badge">68</span>
                <span>
                  {' '}
                  Chờ khảo sát (<span className="item_num">20</span> đã có lịch)
                </span>
              </li>
              <li>
                <span className="list_item_badge">12</span>
                <span> Chờ tư vấn</span>
              </li>
              <li>
                <span className="list_item_badge">20</span>
                <span> Chờ hợp đồng</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_right">
          <FilterCommon options={options} setPayload={setStatus} optionsFilter={status} />
        </div>
      </div>
      <div className="contract_list">
        <Spin spinning={loading === LOADING_STATUS.pending}>
          <TableCommon dataSource={consults.data} columnTable={columns} />
        </Spin>
        <Pagination total={consults.count} setPaginate={setPaginate} />
      </div>
    </div>
  );
}
