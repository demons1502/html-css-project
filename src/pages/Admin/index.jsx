import React, { useState, useEffect, useRef } from 'react';
import Title from '../../components/Title';
import { Table, Button, Checkbox } from 'antd';
import "../../assets/scss/Admin/styles.scss"
import InputSearch from '../../components/InputSearch';
import Create_user from './Create_user';

const dataSource = [
  {
    id: '213654451',
    name: 'Brooklyn Simmons2',
    number: 1234567897891,
    email: 'nguyenasvnhanh@gmail.com',
    ID_login: 'ABG1930a0',
    isProduct: true,
    isPayment: true,
    isAdmin: true,
    idActive: true,
  }
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'number',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'ID login',
    dataIndex: 'ID_login',
  },
  {
    title: 'Hỏi đáp',
    align: 'center',
    dataIndex: 'isProduct',
    className: 'checkbox_cell',
    render: () => <Checkbox />
  },
  {
    title: 'Thanh toán',
    dataIndex: 'isPayment',
    align: 'center',
    className: 'checkbox_cell',
    render: () => <Checkbox />
  },
  {
    title: 'Admin',
    dataIndex: 'isAdmin',
    align: 'center',
    className: 'checkbox_cell',
    render: () => <Checkbox />
  },
  {
    title: 'Active',
    dataIndex: 'idActive',
    align: 'center',
    className: 'checkbox_cell',
    render: () => <Checkbox />
  },
  {
    title: '',
    dataIndex: '',
    align: 'center',
    render: () => <button className='btn-bgWhite-textGreen-borGreen'>Khởi tạo lại</button>,
  },
  {
    title: '',
    dataIndex: '',
    align: 'center',
    render: () => <img className='dustbin_icon' src='./images/dustbin.svg' />,
  }
];

const data = [];

for (let i = 0; i < 600; i++) {
  data.push({
    key: i,
    ...dataSource[0],
  });
}
export default function UserManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isCreateUser, setIsCreateUser] = useState(false)
  const [isSettingLog, setIssettingLog] = useState(false)

  useEffect(() => {
    input_file.current.style.display = 'none'
  }, [])

  const onSelectChange = (e) => {
    console.log('selectedRowKeys changed: ', e);
    setSelectedRowKeys(e);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const input_file = useRef(null)
  const handleImport = () => {
    input_file.current.click()
  }

  const handleCreateUser = () => {
    setIsCreateUser(true)
  }

  const closeCreateUser = () => {
    setIsCreateUser(false)
  }
  const handleClickSetting = () => {
    setIssettingLog(!isSettingLog)
  }

  return (
    <>
      <div className="admin_header">
        <h3>Admin quản lý khách hàng Manulife</h3>
        <div className="admin_header_func">
          <button className="func_delete-user btn-bgWhite-textGreen-borGreen">
            Xoá
          </button>
          <button className="func_reset-user btn-bgWhite-textGreen-borGreen">
            Khởi tạo lại
          </button>
          <input type='file' ref={input_file} />
          <button className="func_import btn-primary" onClick={handleImport}>
            <img src='./images/import_icon.svg' />
            Import
          </button>
          <button className="func_create-user btn-primary" onClick={handleCreateUser}>
            <img src='./images/Plus_icon.svg' />
            Tạo mới
          </button>
          <img className='icon_setting' src='./images/setting_icon.svg' onClick={handleClickSetting} />
          {isSettingLog ? (
            <div className="setting_modal">
              <div className="watch-log">
                <img src='./images/clock.svg' />
                <label>Xem log</label>
              </div>
              <div className="change-language">
                <img src='./images/Global-earth_icon.svg' />
                <label>Cập nhật ngôn ngữ</label>
              </div>
            </div>
          ) :
            <></>
          }
        </div>
      </div>
      <div className='content-box container_admin'>
        <div className="admin_title">
          <h3>Danh sách tài khoản</h3>
          <div className="search_box">
            <InputSearch />
          </div>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data}
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
        >
        </Table>
        {isCreateUser ? (
          <div className="create_user">
            <Create_user closeCreateUser={closeCreateUser} />
          </div>
        ) : <></>}
      </div>
    </>
  );
};
