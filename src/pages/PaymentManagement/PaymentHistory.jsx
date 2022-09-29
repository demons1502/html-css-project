import { Empty, Spin, } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import calendarIcon from '../../assets/images/icons/calendar.svg';
import { getTimeByTZ } from '../../helper/index';
import { getHistoriesData } from '../../slices/paymentManagement';
import { DEFAULT_SIZE, LOADING_STATUS } from '../../ultis/constant';
import TableCommon from '../../components/common/TableNormal';
import PaginationCommon from '../../components/common/Pagination';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'startDate',
    key: 'startDate',
    width: '130px',
  },
  {
    title: 'Nội dung',
    dataIndex: 'description',
    key: 'description',
  },
];

const PaymentHistory = ({ customer }) => {
  const format = new Intl.NumberFormat('vi-VN').format(customer?.amount);

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [paginate, setPaginate] = useState({page:1,limit:DEFAULT_SIZE})

  const {histories} = useSelector((state) => state.paymentManagementReducer);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();


  const onChangePage = (e) => {
    
  };


  useEffect(() => {
    const params = { page: paginate.page, limit: paginate.limit };
    customer && dispatch(getHistoriesData({ loginId: customer?.loginId, params: params }));
  }, [customer,paginate]);

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
              <TableCommon
                dataSource={histories.data}
                columnTable={columns}
              />
            </Spin>
            <PaginationCommon total={histories.count} setPaginate={setPaginate}/>
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
