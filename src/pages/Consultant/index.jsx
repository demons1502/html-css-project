import { Spin } from 'antd';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilterCommon from '../../components/common/Filter';
import Pagination from '../../components/common/Pagination';
import TableCommon from '../../components/common/TableNormal';
import { Button } from '../../components/styles';
import { acquaintanceLevel, marriageStatus, typeCustomer } from '../../constants/common';
import { formatDataNumber, formatDate } from '../../helper/index';
import { getConsult } from '../../slices/consult';
import { DEFAULT_SIZE, LOADING_STATUS } from '../../ultis/constant';
import { options } from './options';

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
      render: (_, record, index) => {
        const value = index + 1 + paginate.limit * (paginate.offset - 1);
        return <span>{value < 10 ? `0${value}` : value}</span>;
      },
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
    },
    {
      title: 'Số điện thoại',
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
      render: (record) => {
        const index = acquaintanceLevel.findIndex((item) => item.value === +record.acquaintanceLevel);
        return <span>{acquaintanceLevel[index]?.label}</span>;
      },
    },
    {
      title: 'Thu nhập',
      render: (record) => {
        return <span>{formatDataNumber(record.income)}</span>;
      },
    },
    {
      title: 'Hôn nhân',
      render: (record) => {
        const index = marriageStatus.findIndex((item) => item.value === +record.maritalStatus);
        return <span>{marriageStatus[index]?.label}</span>;
      },
    },
    {
      title: 'Nghề nghiệp',
      dataIndex: 'job',
    },
    {
      title: 'Loại',
      render: (record) => {
        const index = typeCustomer.findIndex((item) => item.value === +record.typeId);
        return <span>{typeCustomer[index]?.label}</span>;
      },
    },
    {
      title: 'Trạng thái',
      render: (record) => {
        const index = options.findIndex((item) => item.value === record.status);
        return <span>{options[index]?.label}</span>;
      },
    },
    {
      title: 'Lịch hẹn sắp tới',
      render: (record) => {
        return <span>{formatDate(record.nextAppointment)}</span>;
      },
    },
    {
      title: '',
      dataIndex: '',
      render: (record) =>
        record.nextAppointment ? (
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
