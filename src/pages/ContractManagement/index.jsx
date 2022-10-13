import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "../../components/styles"
import IconPlus from '../../assets/images/icons/plus.svg';
import InputSearch from '../../components/common/InputSearch'
import Table from '../../components/common/TableNormal'
import Pagination from '../../components/common/Pagination'
import Modal from '../../components/common/Modal';
import CreateContract from './CreateContract';
import { retrieveData } from '../../slices/contractManagement';
import { DEFAULT_SIZE } from '../../ultis/constant'
import { EditOutlined } from '@ant-design/icons';

export default function ContractManagement() {
  const dispatch = useDispatch()
  const { data, totalItem, refreshData } = useSelector((state) => state.contractManagement)
  console.log(data);
  const [visibleModal, setVisibleModal] = useState(false)
  const [dataEdit, setDataEdit] = useState(null)
  const [titleModal, setTitleModal] = useState('')
  const [paginate, setPaginate] = useState({
    limit: DEFAULT_SIZE,
    offset: 1
  });

  const [inputText, setInputText] = useState('')

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'contractNumber',
      className: 'id-contract',
    },
    {
      title: 'Người mua',
      dataIndex: 'customerName',
    },
    {
      title: 'Người hưởng',
      dataIndex: 'beneficiary',
    },
    {
      title: 'Giá trị',
      className: 'green-color text-right value',
      dataIndex: 'value',
    },
    {
      title: 'Ngày hiệu lực',
      dataIndex: 'startDate',
    },
    {
      title: 'Số năm nộp phí',
      dataIndex: 'duration',
    },
    {
      title: 'Chu kì nộp phí',
      dataIndex: 'depositTerm'
    },
    {
      title: 'Lần cuối nộp phí',
      dataIndex: 'lastDepositDate',
    },
    {
      title: 'Hạn nộp phí tiếp theo',
      dataIndex: 'nextDepositDue'
    },
    {
      title: '',
      dataIndex: '',
      width: '118px',
      render: () => <Button size='small' className=''>Bảng minh hoạ</Button>
    },
    {
      title: '',
      render: (record) => <Button onClick={() => handleEditContract(record)} icon={<EditOutlined style={{ fontSize: '14px' }} />}></Button>,
    }
  ];

  useEffect(() => {
    let offset = (paginate.offset - 1) * paginate.limit;
    if (refreshData) {
      dispatch(retrieveData({ limit: paginate.limit, offset: offset }))
    }
  }, [refreshData])

  useEffect(() => {
    let offset = (paginate.offset - 1) * paginate.limit;
    inputText ?
      dispatch(retrieveData({ userSearch: inputText, limit: paginate.limit, offset: offset }))
      :
      dispatch(retrieveData({ limit: paginate.limit, offset: offset }))
  }, [inputText, paginate,])

  const handleEditContract = (record) => {
    setDataEdit({ id: record.id })
    setVisibleModal(true)
    setTitleModal('Thay đổi hợp đồng')
  }

  const handleCreateContract = (record) => {
    setDataEdit({})
    setVisibleModal(true)
    setTitleModal('Thêm hợp đồng')
  }

  return <>
    <div className='content-box container_contract'>
      <div className="contract_header">
        <h3>Quản lý hợp đồng</h3>
        <div className="header_right">
          <InputSearch setPayload={setInputText} />
          <Button type='primary' onClick={handleCreateContract}>
            <img src={IconPlus} alt="" />
            Thêm hợp đồng
          </Button>
        </div>
      </div>
      <div className="contract_list">
        <Table dataSource={data} columnTable={columns} size='middle' />
        <Pagination total={totalItem} pageSize={paginate.limit} setPaginate={setPaginate} />
      </div>
    </div>
    <Modal isVisible={visibleModal} setIsVisible={setVisibleModal} title={titleModal} width={800}
      content={<CreateContract dataEdit={dataEdit} setVisibleModal={setVisibleModal} />} />
  </>
}

