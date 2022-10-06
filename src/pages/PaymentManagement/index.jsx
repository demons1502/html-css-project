import { Col, Row, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/common/Pagination';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import Delete from '../../assets/images/icons/components/Delete';
import ModalConfirm from '../../components/ModalConfirm';
import * as S from '../../components/styles';
import { formatDataNumber, formatDate } from '../../helper/index';
import { deletePayment, retrieveData, uploadFile } from '../../slices/paymentManagement';
import CreatePayment from './CreatePayment';
import PaymentHistory from './PaymentHistory';
import PaymentManagementHeader from './PaymentManagementHeader';

const PaymentManagement = () => {
  const [rowActive, setRowActive] = useState({});
  const [searchPayload, setSearchPayload] = useState('');
  const [historyItem, setHistoryItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const inputRef = useRef();

  const payments = useSelector((state) => state.paymentManagementReducer);

  const handleDeleteOne = (item) => {
    ModalConfirm({
      content: `Bạn chắc chắn muốn xóa thanh toán này không`,
      callApi: () => {
        dispatch(deletePayment({ transactionIds: [item.id] })), setHistoryItem(null);
      },
    });
  };

  const handleImport = () => {
    inputRef.current.click();

    const input = inputRef.current;
    const handleFile = (e) => {
      const file = e.target.files[0];
      if (file) {
        const data = new FormData();
        data.append('file', file);
        dispatch(uploadFile(data));
      }
    };

    input.addEventListener('change', handleFile);
    removeEventListener('change', handleFile);
  };

  const columns = [
    {
      title: 'ID login',
      dataIndex: 'loginId',
      key: 'loginId',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'userFullname',
      key: 'userFullname',
    },
    {
      title: 'Ngày thanh toán',
      key: 'startDate',
      render: (record) => {
        return <span>{formatDate(record.startDate)}</span>;
      },
    },
    {
      title: 'Ngày hiệu lực',
      key: 'startDate',
      render: (record) => {
        return <span>{formatDate(record.startDate)}</span>;
      },
    },
    {
      title: 'Ngày kết thúc',
      key: 'dueDate',
      render: (record) => {
        return <span>{formatDate(record.dueDate)}</span>;
      },
    },
    {
      title: 'Số tiền',
      key: 'amount',
      className: 'green-color',
      render: (record) => {
        return <span>{formatDataNumber(record.amount)}</span>;
      },
    },
    {
      title: '',
      key: 'x',
      className: 'deleteCol',
      render: (record) => {
        return (
          <span onClick={() => handleDeleteOne(record)} className="btn-deleteIcon">
            <Delete color={rowActive === record.id ? '#fff' : '#999'} />
          </span>
        );
      },
    },
  ];

  const onChangePage = (e) => {
    setPage(e.offset);
    setLimit(e.limit);
  };

  useEffect(() => {
    const params = { q: searchPayload, page: page, limit: limit };
    dispatch(retrieveData(params));
  }, [searchPayload, page, limit, payments.isReload]);

  return (
    <div className="paymentManagement">
      <input type="file" ref={inputRef} style={{ display: 'none' }} accept=".csv" />
      <S.PageHeader
        className="site-page-header-responsive"
        backIcon={false}
        onBack={() => window.history.back()}
        title="Quản lý thanh toán khách hàng Manulife"
        extra={[
          <S.Button
            key="3"
            type="primary"
            icon={<DownloadOutlined style={{ fontSize: '14px' }} />}
            onClick={handleImport}
          >
            Import
          </S.Button>,
          <S.Button key="4" type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(!isModalOpen)}>
            Thanh toán mới
          </S.Button>,
        ]}
      ></S.PageHeader>

      <div className="paymentManagement-container">
        <Row gutter={[15, 15]} align="stretch" className="paymentManagement-row">
          <Col className="paymentManagement-col" lg={15} md={24} sm={24} xs={24}>
            <div className="paymentManagement-content">
              <PaymentManagementHeader title="Danh sách tài khoản" search setPayload={setSearchPayload} />

              <Table
                className="table-common paymentManagement-table"
                dataSource={payments.data}
                columns={columns}
                pagination={false}
                rowClassName={(record) => (rowActive === record.id ? 'active' : '')}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setRowActive(record.id), setHistoryItem(record);
                    },
                  };
                }}
                rowKey="id"
                size="middle"
                bordered={false}
              />
              <Pagination total={payments.total} setPaginate={onChangePage} />
            </div>
          </Col>
          <Col className="paymentManagement-col" lg={9} md={24} sm={24} xs={24}>
            <div className="paymentManagement-content">
              <PaymentManagementHeader title="Lịch sử thanh toán" />
              <PaymentHistory customer={historyItem} />
            </div>
          </Col>
        </Row>
        <CreatePayment users={payments.data} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default PaymentManagement;
