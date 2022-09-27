import { Table } from 'antd';
import { React } from 'react';
import { TableFilter } from './TableFilter';
import { Button } from '../../components/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getConsult } from '../../slices/consult';
import { useEffect } from 'react';
import TableCommon from "../../components/common/TableNormal";
import Pagination from "../../components/common/Pagination";


const dataSource = [
  {
    id: '01',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '02',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '03',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '04',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '05',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '06',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '07',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '08',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '09',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '10',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '11',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
  {
    id: '12',
    fullName: 'Robert Fox',
    phone: '093 8992 990',
    age: 50,
    familiar: 'Thân quen',
    income: '100.000.000',
    like: '1 vợ, 2 con',
    job: 'Kinh doanh',
    type: 'Cá nhân',
    status: 'Đã có hợp đồng',
    appointment_schedule: '22/08/2022 8:40',
  },
];

var handleEditUser;

const columns = [
  {
    title: 'STT',
    // dataIndex: 'id',
    render: (_, record, index) => {
      return <span>{index + 1}</span>;
    },
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    render:(record)=>{}
  },
  {
    title: 'Tuổi',
    dataIndex: 'age',
  },
  {
    title: 'Thân quen',
    dataIndex: 'familiar',
  },
  {
    title: 'Thu nhập',
    dataIndex: 'income',
  },
  {
    title: 'Hôn nhân',
    dataIndex: 'like',
  },
  {
    title: 'Nghề nghiệp',
    dataIndex: 'job',
  },
  {
    title: 'Loại',
    dataIndex: 'type',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
  },
  {
    title: 'Lịch hẹn sắp tới',
    dataIndex: 'appointment_schedule',
  },
  {
    title: '',
    dataIndex: '',
    render: () => (
      <Button size="small">Nhắc lịch</Button>
    ),
  },
];

export default function FinanceConsultant() {
  const consults  = useSelector((state) => state.consultReducer);
  console.log(consults);

  const dispatch = useDispatch();

  useEffect(() => {
    const params = { limit: 20, offset: 0 };
    dispatch(getConsult({ params }));
  }, []);

  return (
    <div className="content-box consultant_container">
      <div className="consultant_header">
        <div className="header_left">
          <h3>Tư vấn</h3>
          <div className="header_list_container">
            <ul className="header_list">
              <li>
                <span className="list_item_badge">68</span>
                <span>
                  {' '}
                  Chờ khảo sát (<span className="item_num">20</span> đã có lịch)
                </span>
              </li>
              <li>
                <span className="list_item_badge">12</span>
                <span> Chờ tư vấn</span>
              </li>
              <li>
                <span className="list_item_badge">20</span>
                <span> Chờ hợp đồng</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_right">
          <TableFilter />
        </div>
      </div>
      <div className="contract_list">
        {/* <Table
          dataSource={dataSource}
          columns={columns}
          size="middle"
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30'],
          }}
        /> */}
        <TableCommon dataSource={dataSource} columnTable={columns}/>
        <Pagination total={dataSource.length}/>
      </div>
    </div>
  );
}
