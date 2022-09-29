import { Empty, Spin, Table } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import calendarIcon from '../../assets/images/icons/calendar.svg';
import { getTimeByTZ } from '../../helper/index';
import { getHistoriesData } from '../../slices/paymentManagement';
import { LOADING_STATUS } from '../../ultis/constant';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'startDate',
    key: 'startDate',
    width: '140px',
  },
  {
    title: 'Nội dung',
    dataIndex: 'description',
    key: 'description',
  },
];

const PaymentHistory = ({ customer }) => {
  const format = new Intl.NumberFormat('vi-VN').format(customer?.amount);

  const histories = useSelector((state) => state.paymentManagementReducer);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();
  console.log(histories.histories)

  useEffect(() => {
    const params = { page: 1, limit: 10 };
    customer && dispatch(getHistoriesData({ loginId: customer?.loginId, params: params }));
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
                  Số tiền: <span>{format}</span>
                </p>
              </div>
              <div className="paymentHistory-time">
                <div className="paymentHistory-time_item">
                  <div className="paymentHistory-time_title">
                    <img src={calendarIcon} alt="" />
                    <span>Ngày thanh toán</span>
                  </div>
                  <div className="paymentHistory-time_date">
                    <span>{getTimeByTZ(customer?.startDate)}</span>
                  </div>
                </div>

                <div className="paymentHistory-time_item">
                  <div className="paymentHistory-time_title">
                    <img src={calendarIcon} alt="" />
                    <span>Ngày hiệu lực</span>
                  </div>
                  <div className="paymentHistory-time_date">
                    <span>{getTimeByTZ(customer?.startDate)}</span>
                  </div>
                </div>

                <div className="paymentHistory-time_item">
                  <div className="paymentHistory-time_title">
                    <img src={calendarIcon} alt="" />
                    <span>Ngày kết thúc</span>
                  </div>
                  <div className="paymentHistory-time_date">
                    <span>{getTimeByTZ(customer?.dueDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="paymentHistory-group">
            <Spin spinning={loading === LOADING_STATUS.pending}>
              <Table
                className="table-common"
                size="middle"
                dataSource={histories.histories}
                columns={columns}
                pagination={false}
                rowKey="id"
              />
            </Spin>
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
