import { Button, Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import deleteIcon from '../../assets/images/icons/deleteIcon.svg';
import importIcon from '../../assets/images/icons/importIcon.svg';
import plusIcon from '../../assets/images/icons/plus.svg';
import CreatePayment from './CreatePayment';
import { customers } from './data';
import PaymentHistory from './PaymentHistory';
import PaymentManagementHeader from './PaymentManagementHeader';

const PaymentManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(customers);
  const [rowActive, setRowActive] = useState({});
  const [searchPayload, setSearchPayload] = useState(null);
  const [historyItem, setHistoryItem] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    /* console.log('selectedRowKeys changed: ', selectedRowKeys); */
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const dataSource = [];
  for (let i = 0; i < 100; i++) {
    dataSource.push({ ...data[0], id: i });
  }

  const handleDeleteOne = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setHistoryItem({});
  };

  const handleDelete = () => {
    if (selectedRowKeys.length > 0) {
      const newData = data.filter((item) => !selectedRowKeys.includes(item.id));
      setHistoryItem({});
      setData(newData);
    } else {
      alert('not selection');
    }
  };

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'dateOfPayment',
      key: 'dateOfPayment',
    },
    {
      title: 'Ngày hiệu lực',
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Số tiền',
      dataIndex: 'money',
      key: 'money',
      className: 'green-color',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <img
          src={deleteIcon}
          className='btn-deleteIcon'
          onClick={() => handleDeleteOne(record.id)}
        />
      ),
    },
  ];

  const handleAdd = (values) => {
    const payment = values.payment;
    const newPayment = {
      ...payment,
      dateOfPayment: payment.dateOfPayment?._d,
      effectiveDate: payment.dateOfPayment?._d,
      endDate: payment.endDate?._d,
      money: +payment.money,
      histories: [
        {
          id: '1-1',
          date: payment.dateOfPayment?._d,
          content: payment.content,
        },
      ],
    };
    console.log(newPayment);
  };

  useEffect(() => {
    setRowActive(data[0]?.id);
    setHistoryItem(data[0]);
  }, []);

  return (
    <div className='paymentManagement'>
      <div className='paymentManagement-nav'>
        <div className='paymentManagement-title'>
          <h3>Quản lý thanh toán khách hàng Manulife</h3>
        </div>
        <div className='paymentManagement-option'>
          <Button onClick={handleDelete}>Xóa</Button>
          <Button type='primary'>
            <label htmlFor='import'>
              <img src={importIcon} alt='' />
              <input type='file' id='import' style={{ display: 'none' }} />
              Import
            </label>
          </Button>
          <Button
            type='primary'
            icon={<img src={plusIcon} alt='' />}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Thanh toán mới
          </Button>
        </div>
      </div>
      <div className='paymentManagement-container'>
        <Row
          gutter={[15, 15]}
          align='stretch'
          className='paymentManagement-row'
        >
          <Col
            span={15}
            className='paymentManagement-col'
            lg={15}
            md={24}
            sm={24}
            xs={24}
          >
            <div className='paymentManagement-content'>
              <PaymentManagementHeader
                title='Danh sách tài khoản'
                search
                setPayload={setSearchPayload}
              />
              <Table
                className='table-common'
                dataSource={dataSource}
                columns={columns}
                pagination={{ className: 'payment-pagination' }}
                rowSelection={{
                  selectedRowKeys,
                  onChange: onSelectChange,
                }}
                rowClassName={(record) =>
                  rowActive === record.id ? 'active' : ''
                }
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setRowActive(record.id), setHistoryItem(record);
                    },
                  };
                }}
                rowKey={(record) => record.id}
                size='middle'
                bordered={false}
              />
            </div>
          </Col>
          <Col
            span={9}
            className='paymentManagement-col'
            lg={9}
            md={24}
            sm={24}
            xs={24}
          >
            <div className='paymentManagement-content'>
              <PaymentManagementHeader title='Lịch sử thanh toán' />
              <PaymentHistory customer={historyItem} />
            </div>
          </Col>
        </Row>
        <CreatePayment
          users={data}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onClick={handleAdd}
        />
      </div>
    </div>
  );
};

export default PaymentManagement;
