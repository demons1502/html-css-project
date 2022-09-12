import { Table } from 'antd';
import React from 'react';
import calendarIcon from '../../assets/images/icons/calendar.svg';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    key: 'content',
  },
];

const PaymentHistory = ({ customer }) => {
  const data = [];
  for (let i = 0; i <= 2; i++) {
    data.push({
      id: i,
      date: '01/09/2022',
      content: 'Thanh toán 3 tháng từ 1/3 đến 31/12/2022 ',
    });
  }

  return (
    <div className='paymentHistory'>
      <div className='paymentHistory-customer'>
        <div className='paymentHistory-info'>
          <div className='paymentHistory-title'>
            <h4>{customer.username} </h4>
            <p>
              Số tiền: <span>{customer.money}</span>
            </p>
          </div>
          <div className='paymentHistory-time'>
            <div className='paymentHistory-time_item'>
              <div className='paymentHistory-time_title'>
                <img src={calendarIcon} alt='' />
                <span>Ngày thanh toán</span>
              </div>
              <div className='paymentHistory-time_date'>
                {customer.dateOfPayment}
              </div>
            </div>

            <div className='paymentHistory-time_item'>
              <div className='paymentHistory-time_title'>
                <img src={calendarIcon} alt='' />
                <span>Ngày hiệu lực</span>
              </div>
              <div className='paymentHistory-time_date'>
                {customer.effectiveDate}
              </div>
            </div>

            <div className='paymentHistory-time_item'>
              <div className='paymentHistory-time_title'>
                <img src={calendarIcon} alt='' />
                <span>Ngày kết thúc</span>
              </div>
              <div className='paymentHistory-time_date'>{customer.endDate}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='paymentHistory-group'>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
};

export default PaymentHistory;
