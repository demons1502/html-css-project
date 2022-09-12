import { Button, Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import PaymentManagementHeader from './PaymentManagementHeader';
import deleteIcon from '../../assets/images/icons/deleteIcon.svg';
import plusIcon from '../../assets/images/icons/plus.svg';
import importIcon from '../../assets/images/icons/importIcon.svg';
import { customers } from '../../assets/fake-data/data';
import PaymentHistory from './PaymentHistory';
import { LoadingOutlined } from '@ant-design/icons';

const PaymentManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(customers);
  const [rowActive, setRowActive] = useState({});
  const [searchPayload, setSearchPayload] = useState(null);
  const [historyItem, setHistoryItem] = useState({});

  const onSelectChange = (newSelectedRowKeys) => {
    /* console.log('selectedRowKeys changed: ', selectedRowKeys); */
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleRow = (item) => {
    setHistoryItem(item);
  };

  const handleDeleteOne = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setHistoryItem({});
  };
  const handleDelete = () => {
    const newData = data.filter((item) => !selectedRowKeys.includes(item.id));
    setData(newData);
    setHistoryItem({});
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

  useEffect(() => {
    setRowActive(data[0].id);
    setHistoryItem(data[0]);
  }, []);

  return (
    <div className='paymentManagement'>
      <div className='paymentManagement-nav'>
        <div className='paymentManagement-title'>
          <h3>Quản lý thanh toán khách hàng Manulife</h3>
        </div>
        <div className='paymentManagement-option'>
          <Button icon={<LoadingOutlined />} onClick={handleDelete}>
            Xóa
          </Button>
          <Button type='primary'>
            <label htmlFor='import'>
              <img src={importIcon} alt='' />
              <input type='file' id='import' style={{ display: 'none' }} />
              Import
            </label>
          </Button>
          <Button type='primary' icon={<img src={plusIcon} alt='' />}>
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
                dataSource={data}
                columns={columns}
                pagination={false}
                rowSelection={{
                  selectedRowKeys,
                  onChange: onSelectChange,
                }}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setRowActive(record.id), handleRow(record);
                    },
                    className: `${rowActive === record.id ? 'active' : ''}`,
                  };
                }}
                rowKey={(record) => record.id}
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
      </div>
    </div>
  );
};

export default PaymentManagement;
