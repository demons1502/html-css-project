import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Checkbox, Button, Empty, Input, Popover} from 'antd';
import Table from '../../../components/common/TableNormal';
import _ from 'lodash';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

export default function SurveyForm() {
  const {t} = useTranslation();
  const rowData = [...Array(10)].map((v, i) => {
    return {
      key: i + 1,
      type: 'qũy đầu tư',
      infulence: 1,
      infulence2: false,
      infulence3: true,
      have: true,
      nothave: false,
      money: '12000',
      order: i + 1,
    }
  })
  console.log(rowData);
  const [dataTable, setDataTable] = useState(rowData);

  const handleCheckboxChangeFactory = (rowIndex, columnKey) => event => {
    const newCheckboxState = [...dataTable];
    newCheckboxState[rowIndex][columnKey] = event.target.checked;
    setDataTable(newCheckboxState);
  };

  const handleInput = (rowIndex, columnKey) => event => {
    const newCheckboxState = [...checkboxState];
    newCheckboxState[rowIndex][columnKey] = event.target.value;
    setDataTable(newCheckboxState);
  };

  const columns = [
    {
      title: 'Nền tảng của sự giàu có',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'infulence level',
      children: [
        {
          title: 'Rất quan trọng',
          dataIndex: 'infulence1',
          key: 'infulence1',
          render: (value, record, rowIndex) => (
            <Checkbox
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "infulence1")}
            />
          )
        },
        {
          title: 'Quan trọng',
          dataIndex: 'infulence2',
          key: 'infulence2',
          render: (value, record, rowIndex) => (
            <Checkbox
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "infulence2")}
            />
          )
        },
        {
          title: 'Ít quan trọng',
          dataIndex: 'infulence3',
          key: 'infulence3',
          render: (value, record, rowIndex) => (
            <Checkbox
              className='radius-5'
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "infulence3")}
            />
          )
        },
      ],
    },
    {
      title: 'Xây dựng vương quốc tài chính',
      children: [
        {
          title: 'Chưa có',
          dataIndex: 'nothave',
          key: 'nothave',
          render: (value, record, rowIndex) => (
            <Checkbox
              className='radius-5'
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "nothave")}
            />
          )
        },
        {
          title: 'Đã có',
          dataIndex: 'have',
          key: 'have',
          render: (value, record, rowIndex) => (
            <Checkbox
              className='radius-5'
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "have")}
            />
          )
        },
        {
          title: 'Số tiền (1000đ)',
          dataIndex: 'money',
          key: 'money',
          render: (value, record, rowIndex) => (
            <Input
              className='radius-10'
              value={value}
              onChange={handleInput(rowIndex, "money")}
            />
          )
        },
      ],
    },
    {
      title: 'TT ưu tiên',
      dataIndex: 'order',
      key: 'order',
      render: (value, record, rowIndex) => (
        <Input
          className='radius-10'
          value={value}
          onChange={handleInput(rowIndex, "order")}
        />
      )
    }
  ];

  const clickHandler = (e) => {
    alert('feature incoming');
  };

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return <Table dataSource={dataTable} columnTable={columns} bordered={true} />
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  }, [dataTable])

  return (
    <>
      <Col span={18} className="survey__center">
        <div className="survey__center--top">
          <div className="survey__center--top--left">
            <Button type="primary" className="btn-primary" onClick={clickHandler}>{t('common.history')}</Button>
          </div>
          <div className="survey__center--top--right">
            <Button type="primary" className="btn-primary" onClick={clickHandler}>{t('common.solution')}</Button>
            <Button type="primary" className="btn-primary" onClick={clickHandler}>{t('common.consultant')}</Button>
            <Button type="primary" className="btn-primary" onClick={clickHandler}>{t('common.booking')}</Button>
          </div>
        </div>
        <div className="survey__center--list">
          {table}
        </div>
        <div className="survey__center--action">
          <div className="survey__center--action--left">
            <Checkbox className="checkbox-item">{t('customer care.no more potential')}</Checkbox>
          </div>
          <div className="survey__center--action--right">
            <Button type="primary" className="btn-primary" onClick={clickHandler}>{t('survey.save')}</Button>
          </div>
        </div>
      </Col>
    </>
  );
}
