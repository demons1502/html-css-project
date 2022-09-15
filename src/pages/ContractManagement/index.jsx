import { React, useState } from 'react'
import InputSearch from '../../components/InputSearch'
import "../../assets/scss/ContractManagement/styleContract.scss"
import { Button, Table, Modal } from 'antd'
import CreateContract from './CreateContract';

const dataSource = [
  {
    id_contract: '213654451',
    name_payment: 'Brooklyn Simmo',
    beneficiary: 'Guy hawking',
    price: '65.000.000',
    effective_date: '01/01/2001',
    year_payment: '20 năm',
    submission_cycle: 'Năm',
    last_time_payment: '01/01/2002',
    last_day_payment: '01/01/2003',
  }
];

var handleEditUser

const columns = [
  {
    title: 'Mã số',
    dataIndex: 'id_contract',
    className: 'id-contract',
  },
  {
    title: 'Người mua',
    dataIndex: 'name_payment',
  },
  {
    title: 'Người hưởng',
    dataIndex: 'beneficiary',
  },
  {
    title: 'Giá trị',
    className: 'table_price',
    dataIndex: 'price',
  },
  {
    title: 'Ngày hiệu lực',
    dataIndex: 'effective_date',
  },
  {
    title: 'Số năm nộp phí',
    dataIndex: 'year_payment',
  },
  {
    title: 'Chu kì nộp phí',
    dataIndex: 'submission_cycle',
  },
  {
    title: 'Lần cuối nộp phí',
    dataIndex: 'last_time_payment',
  },
  {
    title: 'Hạn nộp phí tiếp theo',
    dataIndex: 'last_day_payment',
  },
  {
    title: '',
    dataIndex: '',
    width:'118px',
    render: () => <button className='btn_modal_example btn-bgWhite-textGreen-borGreen'>Bảng minh hoạ</button>
  },
  {
    title: '',
    dataIndex: '',
    render: () => <img className='edit_icon' src='../images/edit-icon.svg' onClick={handleEditUser} />,
  }
];

const data = [];

for (let i = 0; i < 600; i++) {
  data.push({
    key: i,
    ...dataSource[0],
  });
}
export default function ContractManagement() {
  const [modalCreateContract, setModalCreateContract] = useState(false)
  const [modalEditContract, setModalEditContract] = useState(false)
  const [dataEdit, setDataEdit] = useState(null)

  const handleCloseModalCreate = () => {
    setModalCreateContract(false)
    setModalEditContract(false)
  }
  handleEditUser = (e) => {
    const rowHover = document.querySelectorAll('.ant-table-cell-row-hover')
    const id = rowHover[0].innerHTML
    //call api
    setDataEdit({
      title: 'Thay đổi nội dung hợp đồng',
      id_contract: '213654451',
      name_payment: 'Brooklyn Simmons2',
      beneficiary: 'Guy hawking',
      price: 65000000,
      effective_date: '01/01/2001',
      year_payment: '20 năm',
      submission_cycle: 'Năm',
      last_time_payment: '01/01/2002',
      last_day_payment: '01/01/2003',
      btn_submit_text: 'Lưu thay đổi'
    })
    setModalEditContract(true)
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
        <Table dataSource={data} columns={columns} size='middle' 
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
        />
      </div>
      {
        modalCreateContract ? (
          <Modal width='800px' centered footer={null} closable={false}
            open={() => setModalCreateContract(true)} 
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
            open={() => setModalEditContract(true)} 
            onOk={() => setModalEditContract(false)} 
            onCancel={() => setModalEditContract(false)}>
            <CreateContract handleCloseModalCreate={handleCloseModalCreate} data={dataEdit} />
          </Modal>
        ) :
          <></>
      }
    </div>
  )
}

