import React, { useState, useEffect, useRef } from 'react';
import Title from '../../components/Title';
import { Table, Button, Checkbox, Modal } from 'antd';
import "../../assets/scss/Admin/stylesAdmin.scss"
import InputSearch from '../../components/InputSearch';
import Create_user from './Create_user';
import TableCommon from "../../components/TableCommon";
import PaginationCommon from "../../components/PaginationCommon";
import ModalConfirm from '../../components/ModalConfirm';

const dataSource = [
  {
    id: '21365441',
    name: 'Brooklyn Simmons',
    number: 4567897891,
    email: 'nguyennhanh@gmail.com',
    ID_login: 'ABG19300',
    isProduct: true,
    isPayment: false,
    isAdmin: true,
    idActive: true,
  }
];

var handleDeleteUser
var handleCheckboxChange
var handelResetUser

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '95px',
    className: 'id-user',
  },
  {
    title: 'Họ và tên',
    width: '180px',
    dataIndex: 'name',
  },
  {
    title: 'Số điện thoại',
    width: '120px',
    dataIndex: 'number',
  },
  {
    title: 'Email',
    width: '215px',
    dataIndex: 'email',
  },
  {
    width: '105px',
    title: 'ID login',
    dataIndex: 'ID_login',
  },
  {
    title: 'Hỏi đáp',
    align: 'center',
    width: '79px',
    dataIndex: 'isProduct',
    className: 'checkbox_cell ',
    render: (dataIndex) => <Checkbox id='isProduct' defaultChecked={dataIndex} onChange={handleCheckboxChange} />
  },
  {
    title: 'Thanh toán',
    dataIndex: 'isPayment',
    width: '110px',
    align: 'center',
    className: 'checkbox_cell',
    render: (dataIndex) => <Checkbox id='isPayment' defaultChecked={dataIndex} onChange={handleCheckboxChange} />
  },
  {
    title: 'Admin',
    dataIndex: 'isAdmin',
    width: '70px',
    align: 'center',
    className: 'checkbox_cell',
    render: (dataIndex) => <Checkbox id='isAdmin' defaultChecked={dataIndex} onChange={handleCheckboxChange} />
  },
  {
    title: 'Active',
    dataIndex: 'idActive',
    width: '69px',
    align: 'center',
    className: 'checkbox_cell',
    render: (dataIndex) => <Checkbox id='idActive' defaultChecked={dataIndex} onChange={handleCheckboxChange} />
  },
  {
    title: '',
    dataIndex: '',
    width: '110px',
    align: 'center',
    render: () => <button className='btn_reset-user btn-bgWhite-textGreen-borGreen' onClick={handelResetUser}>Khởi tạo lại</button>,
  },
  {
    title: '',
    dataIndex: '',
    width: '30px',
    align: 'center',
    render: () => <img className='dustbin_icon' src='./images/dustbin.svg' onClick={handleDeleteUser} />,
  }
];

const data = [];

for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    ...dataSource[0],
  });
}
export default function UserManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isCreateUser, setIsCreateUser] = useState(false)
  const [isSettingLog, setIssettingLog] = useState(false)

  const getSelectedRowKeys=(rowkeys)=>{
    setSelectedRowKeys(rowkeys);
  }

  useEffect(() => {
    input_file.current.style.display = 'none'
  })

  handleDeleteUser = (e) => {
    const rowOfElement = e.target.parentNode.parentNode
    const idUser = rowOfElement.querySelector('.id-user').innerHTML
    //call api to delete
    ModalConfirm()
  }

  handleCheckboxChange = (e) => {
    const data = e.target.id
    const rowHover = document.querySelectorAll('.ant-table-cell-row-hover')
    const idCheckboxChange = rowHover[1].innerHTML
    //call api when click checkbox
  };

  handelResetUser = (e) => {
    ModalConfirm()
    // const rowHover = document.querySelectorAll('.ant-table-cell-row-hover')
    // const id = rowHover[1].innerHTML
    //call api
  }
 
  const input_file = useRef(null)
  const handleImport = () => {
    input_file.current.click() 
    const inputElement = input_file.current
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
      const fileList = this.files;
      if (fileList) {
        console.log(fileList);
        // call api import file
      }
    }
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

  const handleDeleteUsers = () => {
    selectedRowKeys.map(selectedRowKey => {
      console.log('data ID:', data[selectedRowKey].id);
    })
    //call api delete users
    ModalConfirm()
  }

  useEffect(()=>{
    const pageTitle= document.querySelector('.ant-select-selection-item').innerHTML
    const pageText= pageTitle.slice(0,2)
    document.querySelector('.ant-select-selection-item').innerHTML= pageText
  },[])
  return (
    <>
      <div className="admin_header">
        <h3>Admin quản lý khách hàng Manulife</h3>
        <div className="admin_header_func">
          <button className="func_delete-user btn-bgWhite-textGreen-borGreen"
            onClick={handleDeleteUsers}>
            Xoá
          </button>
          <button className="func_reset-user btn-bgWhite-textGreen-borGreen" 
            onClick={handelResetUser}
          >
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

        <TableCommon dataSource={data} columnTable={columns} isSelection={true} isScroll={true} 
          getSelectedRowKeys={getSelectedRowKeys}>
        </TableCommon>
        <PaginationCommon></PaginationCommon>
        {isCreateUser &&
          <Modal centered width={589} closable={false}
            footer={null}
            open={isCreateUser}
            onCancel={()=>{setIsCreateUser(false)}}
          >
            <Create_user closeCreateUser={closeCreateUser} />
          </Modal>
        }
      </div>
    </>
  );
};
