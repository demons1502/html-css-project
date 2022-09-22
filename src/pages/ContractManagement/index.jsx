import { React, useState, useEffect } from 'react'
import InputSearch from '../../components/common/InputSearch'
import "../../assets/scss/ContractManagement/styleContract.scss"
import { Button, Table, Modal } from 'antd'
import CreateContract from './CreateContract';
import { retrieveData, setRefresh } from '../../slices/contractManagement';
import { useDispatch, useSelector } from 'react-redux';
import TableCommon from '../../components/common/TableNormal'
import Pagination from "../../components/common/Pagination";

import moment from 'moment';
import { getByIds } from '../../slices/contractManagement';

var handleEditUser

const columns = [
  {
    title: 'Mã số',
    dataIndex: 'contractNumber',
    className: 'id-contract',
    key: '1',
  },
  {
    title: 'Người mua',
    dataIndex: 'customerName',
    key: '2',
  },
  {
    title: 'Người hưởng',
    dataIndex: 'beneficiary',
    key: '3',
  },
  {
    title: 'Giá trị',
    className: 'value',
    dataIndex: 'value',
    key: '4',
  },
  {
    title: 'Ngày hiệu lực',
    dataIndex: 'startDate',
    key: '5',
  },
  {
    title: 'Số năm nộp phí',
    dataIndex: 'duration',
    key: '6',
  },
  {
    title: 'Chu kì nộp phí',
    dataIndex: 'depositTerm',
    key: '7',
  },
  {
    title: 'Lần cuối nộp phí',
    dataIndex: 'lastDepositDate',
    key: '8',
  },
  {
    title: 'Hạn nộp phí tiếp theo',
    dataIndex: 'nextDepositDue',
    key: '9',
  },
  {
    title: '',
    dataIndex: '',
    width: '118px',
    render: () => <button className='btn_modal_example btn-bgWhite-textGreen-borGreen'>Bảng minh hoạ</button>,
    key: '10',
  },
  {
    title: '',
    dataIndex: '',
    render: () => <img className='edit_icon' src='../images/edit-icon.svg' onClick={handleEditUser} />,
    key: '11',
  }
];

const data = [];

export default function ContractManagement() {
  const [modalCreateContract, setModalCreateContract] = useState(false)
  const [modalEditContract, setModalEditContract] = useState(false)
  const [dataEdit, setDataEdit] = useState(null)
  const [dataTable, setDataTable] = useState([])

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.contractManagement.data)
  const dataEditStore = useSelector((state) => state.contractManagement.contractById)
  const refreshData= useSelector((state) => state.contractManagement.refreshData)
  const totalItem=useSelector((state) => state.contractManagement.totalItem)
  console.log(totalItem);
  const handleCloseModalCreate = () => {
    setModalCreateContract(false)
    setModalEditContract(false)
  }
  
  useEffect(() => {
    dispatch(retrieveData({ limit: 10, offset: 0 }))
  }, [])

  useEffect(() => {
    setDataEdit(dataEditStore)
  }, [dataEditStore])

  useEffect(()=>{
    if(refreshData){
      dispatch(retrieveData({ limit: 10, offset: 0 }))
      dispatch(setRefresh())
    }
  },[refreshData])
  useEffect(() => {
    // userData.map(item => {
    //   // return { createAt: moment(item.createAt), lastDepositDate: moment(item.lastDepositDate), nextDepositDue: moment(item.nextDepositDue), ...item }
    //   console.log(item);
    // })
    // console.log(moment('2022-09-21T07:19:42.220Z'));
    setDataTable(userData)
  }, [userData])

  handleEditUser = (e) => {
    const rowHover = document.querySelectorAll('.ant-table-cell-row-hover')
    const id = rowHover[0].innerHTML
    dataTable.map(item => {
      (item.contractNumber == id) ? setDataEdit(item) : null
    })
    setModalEditContract(true)
  }
  const onChangePage=(e) => {
    // setPaginate({limit: pageSize, offset: page})
    console.log(e);
  }

  return (
    <div className='content-box container_contract'>
      <div className="contract_header">
        <h3>Quản lý hợp đồng</h3>
        <div className="header_right">
          <InputSearch />
          <Button className='btn-primary' onClick={() => setModalCreateContract(true)}>
            <img src="../images/plus_icon.svg" />
            <p>Thêm hợp đồng</p>
          </Button>
        </div>
      </div>
      <div className="contract_list">
        <TableCommon dataSource={dataTable} columns={columns} size='middle' rowKey='id' />
        {/* pagination={{ defaultPageSize: 10, total:{totalItem} , showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}} */}
        
      </div>
      {
        modalCreateContract ? (
          <Modal width='800px' centered footer={null} closable={false}
            open={modalCreateContract}
            onOk={() => setModalCreateContract(false)}
            onCancel={() => setModalCreateContract(false)}>
            <CreateContract handleCloseModalCreate={handleCloseModalCreate} />
          </Modal>
        ) :
          <></>
      }
      {
        modalEditContract ? (
          <Modal width='800px' centered footer={null} closable={false}
            open={modalEditContract}
            onOk={() => setModalEditContract(false)}
            onCancel={() => setModalEditContract(false)}>
            <CreateContract handleCloseModalCreate={handleCloseModalCreate} data={dataEdit} func={'edit'} />
          </Modal>
        ) :
          <></>
      }
    </div>
  )
}

