import { Empty, Spin } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import calendarIcon from '../../assets/images/icons/calendar.svg';
import { formatDate } from '../../helper/index';
import { getHistoriesData } from '../../slices/paymentManagement';
import { DEFAULT_SIZE, LOADING_STATUS } from '../../ultis/constant';
import TableCommon from '../../components/common/TableNormal';
import PaginationCommon from '../../components/common/Pagination';
import { formatDataNumber } from '../../helper';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'startDate',
    key: 'startDate',
    width: '130px',
    render: (record) => {
      return <span>{formatDate(record)}</span>;
    },
  },
  {
    title: 'Nội dung',
    dataIndex: 'description',
    key: 'description',
  },
];

const PaymentHistory = ({ customer }) => {
  const [paginate, setPaginate] = useState({ page: 1, limit: DEFAULT_SIZE });
  const [data, setData] = useState(null);
  const [rowActive, setRowActive] = useState(null);

  const { histories, isReload } = useSelector((state) => state.paymentManagementReducer);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = { page: paginate.page, limit: paginate.limit };
    customer && dispatch(getHistoriesData({ loginId: customer?.loginId, params: params }));
  }, [customer, paginate, isReload]);

  useEffect(() => {
    setData(customer);
  }, [customer]);

  return (
    <div className="paymentHistory">
      {customer ? (
        <>
          <div className="paymentHistory-customer">
            <div className="paymentHistory-info">
              <div className="paymentHistory-title">
                <h4>{customer?.userFullname} </h4>
                <p>
                  Số tiền: <span>{formatDataNumber(data?.amount)}</span>
                </p>
              </div>
              <div className="paymentHistory-time">
                <div className="paymentHistory-time_item">
                  <div className="paymentHistory-time_title">
                    <img src={calendarIcon} alt="" />
                    <span>Ngày thanh toán</span>
                  </div>
                  <div className="paymentHistory-time_date">
                    <span>{formatDate(data?.startDate)}</span>
                  </div>
                </div>

                <div className="paymentHistory-time_item">
                  <div className="paymentHistory-time_title">
                    <img src={calendarIcon} alt="" />
                    <span>Ngày hiệu lực</span>
                  </div>
                  <div className="paymentHistory-time_date">
                    <span>{formatDate(data?.startDate)}</span>
                  </div>
                </div>

                <div className="paymentHistory-time_item">
                  <div className="paymentHistory-time_title">
                    <img src={calendarIcon} alt="" />
                    <span>Ngày kết thúc</span>
                  </div>
                  <div className="paymentHistory-time_date">
                    <span>{formatDate(data?.dueDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="paymentHistory-group">
            <Spin spinning={loading === LOADING_STATUS.pending}>
              <TableCommon
                className="history-table"
                dataSource={histories.data}
                columnTable={columns}
                rowClassName={(record) => (rowActive === record.id ? 'active' : '')}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setData(record);
                      setRowActive(record.id);
                    },
                  };
                }}
              />
            </Spin>
            <PaginationCommon total={histories.count} setPaginate={setPaginate} />
            {/* <Pagination total={payments.total} setPaginate={onChangePage} /> */}
          </div>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        />
      )}
    </div>
  );
};

export default memo(PaymentHistory);
