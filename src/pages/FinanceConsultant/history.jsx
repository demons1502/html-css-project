import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Checkbox, Button, Empty, List } from 'antd';
import { createData, getData } from '../../slices/customerCare';
import Table from '../../components/common/TableNormal';
import IconPlus from '../../assets/images/icons/plus.svg';
import _ from 'lodash';
import FilterCommon from '../../components/common/Filter';
import {formatDataNumber} from '../../helper/'

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const dataSource = [
  {
    key: 1,
    date: '12/04/2022',
    info: 'Tên gợi nhớ 1',
    content: '60000000',
  },
  {
    key: 2,
    date: '12/04/2022',
    info: 'Tên gợi nhớ 2',
    content: '84000000',
  },
  {
    key: 3,
    date: '12/04/2022',
    info: 'Tên gợi nhớ 3',
    content: '54000000',
  },
  {
    key: 4,
    date: '12/04/2022',
    info: 'Tên gợi nhớ 4',
    content: '68000000',
  },
];


export default function History() {
  const { t } = useTranslation();
  const customerCare = useSelector((state) => state.customerCare);
  const [dataTable, setDataTable] = useState(dataSource);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Ngày tháng',
      dataIndex: 'date',
      key: 'stt',
    },
    {
      title: 'Tên gợi nhớ',
      dataIndex: 'info',
      key: 'date',
    },
    {
      title: 'Tổng chi tiêu',
      dataIndex: 'content',
      key: 'content',
      render:(record)=>{
        return <span>{formatDataNumber(record)}</span>
      }
    },
  ];

  // const initFetch = useCallback(() => {
  //   dispatch(getData());
  // }, [dispatch]);

  // useEffect(() => {
  //   initFetch();
  // }, [initFetch]);

  // useEffect(() => {
  //   //re render
  // }, [customerCare]);


  const saveData = (e) => {
    dispatch(
      createData({
        id: 1,
        title: e.target.value,
      })
    );
  };

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return <Table dataSource={dataTable} columnTable={columns} className='financialConsultant-table'/>;
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [dataTable]);

  return (
    <Col span={24} className="financialConsultant-history">
      {table}
    </Col>
  );
}
