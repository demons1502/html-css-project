import { React, useState, useEffect } from 'react';
import InputSearch from '../../components/common/InputSearch';
import '../../assets/scss/ContractManagement/styleContract.scss';
import { Button, Modal } from 'antd';
import CreateContract from './CreateContract';
import { retrieveData, setRefresh } from '../../slices/contractManagement';
import { useDispatch, useSelector } from 'react-redux';
import TableCommon from '../../components/common/TableNormal';
import Pagination from '../../components/common/Pagination';
import moment from 'moment';
import { getByIds } from '../../slices/contractManagement';
import { getTimeByTZ } from '../../helper/index';
import ModalCommon from '../../components/common/Modal';



export default function ContractManagement() {
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
      // dataIndex: 'value',
      key: '4',
      render:(record)=>{
        const formatValue=new Intl.NumberFormat('vi-VN').format(record.value)
        return <span>{formatValue}</span>
      }
    },
    {
      title: 'Ngày hiệu lực',
      // dataIndex: 'startDate',
      key: '5',
      render: (record) => {
        return <span>{getTimeByTZ(record.startDate)}</span>;
      },
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
      // dataIndex: 'lastDepositDate',
      key: '8',
      render: (record) => {
        return <span>{getTimeByTZ(record.lastDepositDate)}</span>;
      },
    },
    {
      title: 'Hạn nộp phí tiếp theo',
      // dataIndex: 'nextDepositDue',
      key: '9',
      render: (record) => {
        return <span>{getTimeByTZ(record.nextDepositDue)}</span>;
      },
    },
    {
      title: '',
      dataIndex: '',
      width: '118px',
      render: () => (
        <button className='btn_modal_example btn-bgWhite-textGreen-borGreen'>
          Bảng minh hoạ
        </button>
      ),
      key: '10',
    },
    {
      title: '',
      dataIndex: '',
      render: () => (
        <img
          className='edit_icon'
          src='../images/edit_icon.svg'
          onClick={handleEditContract}
        />
      ),
      key: '11',
    },
  ];

  const [visitModal, setVisibleModal] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [inputText, setInputText] = useState('');
  const [titleModal, setTitleModal] = useState('')
  const [func, setFunc] = useState(0)

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.contractManagement.data);
  
  const dataEditStore = useSelector(
    (state) => state.contractManagement.contractById
  );
  const refreshData = useSelector(
    (state) => state.contractManagement.refreshData
  );
  
  const totalItem = useSelector((state) => state.contractManagement.totalItem);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const handleCloseModalCreate = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    dispatch(retrieveData({ limit: limit, offset: offset }));
  }, []);

  useEffect(() => {
    setDataEdit(dataEditStore);
  }, [dataEditStore]);

  useEffect(() => {
    if (refreshData) {
      dispatch(retrieveData({ limit: limit, offset: offset }));
      dispatch(setRefresh());
    }
  }, [refreshData]);

  useEffect(() => {
    setDataTable(userData);
  }, [userData]);

  useEffect(() => {
    if (inputText) {
      dispatch(retrieveData({userSearch: inputText , limit: limit, offset: offset}));
    } else {
      dispatch(retrieveData({ limit: limit, offset: offset }));
    }
  }, [inputText, limit, offset]);

  var handleEditContract = (e) => {
    const rowHover = document.querySelectorAll('.ant-table-cell-row-hover');
    const id = rowHover[0].innerHTML;
    dataTable.map((item) => {
      item.contractNumber == id ? setDataEdit(item) : null;
    });
    setVisibleModal(true)
    setTitleModal('Thay đổi nội dung hợp đồng')
    setFunc(1)
  };

  const handleCreateContract=()=>{
    setVisibleModal(true)
    setDataEdit([])
    setTitleModal('Thêm hợp đồng')
    setFunc(0)
  }

  const setPaginate = (e) => {
    console.log(e);
    if (totalItem < (e.offset - 1) * e.limit) {
      setOffset(e.limit);
    } else {
      setOffset((e.offset - 1) * e.limit);
    }
    setLimit(e.limit);
  };
  return (
    <div className='content-box container_contract'>
      <div className='contract_header'>
        <h3>Quản lý hợp đồng</h3>
        <div className='header_right'>
          <InputSearch setPayload={setInputText} />
          <Button
            className='btn-primary'
            onClick={handleCreateContract}
          >
            <img src='../images/plus_icon_admin.svg' />
            <p>Thêm hợp đồng</p>
          </Button>
        </div>
      </div>
      <div className='contract_list'>
        <TableCommon
          dataSource={dataTable}
          columnTable={columns}
          size='middle'
          rowKey='id'
        />
        <Pagination total={totalItem} setPaginate={setPaginate} />
      </div>
      {visitModal ? (
        <Modal
          width='800px'
          centered
          footer={null}
          closable={false}
          open={visitModal}
          onOk={() => setVisibleModal(false)}
          onCancel={() => setVisibleModal(false)}
        >
          <CreateContract handleCloseModalCreate={handleCloseModalCreate} 
            data={dataEdit}
            title={titleModal}
            func={func}
          />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
