import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  getCustomers,
  getcustomersByCompany,
} from '../../../../../../services/customers';

// COMPONENTS
import { Table, Typography } from 'antd';

//ULTIS
import { classifyCustomer } from '../../../../../../ultis/classifyCustomer';
import { getCustomerStatus } from '../../../../../../ultis/statusCustomer';

// STYLES
import * as S from './styles';

let timeout;

const fetch = (value, typeId, callback, subCustomer, companyId) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  const getData = async () => {
    try {
      if (subCustomer) {
        await getcustomersByCompany(companyId, {
          name: value,
          isActiveCompany: true,
        }).then((d) => {
          callback(d.data);
        });
      }

      await getCustomers({
        name: value,
        typeId: typeId,
        isActiveCompany: true,
      }).then((d) => {
        callback(d.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  timeout = setTimeout(getData, 300);
};

const SelectTable = ({
  typeId,
  value,
  handleChangeValue,
  keyForm,
  subCustomer,
  companyId,
}) => {
  const [data, setData] = useState([]);
  const [valueSeach, setvalueSeach] = useState(value);
  const [openDropDown, setOpenDropDown] = useState(false);
  const showName = typeId === 3 ? 'name' : 'fullname';
  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, typeId, setData, subCustomer, companyId);
      setOpenDropDown(true);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setvalueSeach(newValue);
    setOpenDropDown(true);
  };

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: showName,
      key: showName,
    },
    {
      title: 'Phân loại',
      dataIndex: 'typeId',
      key: 'typeId',
      render: (text) => {
        return <Typography>{classifyCustomer(text)}</Typography>;
      },
    },
    {
      title: 'Công ty',
      dataIndex: 'companyText',
      key: 'companyText',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      render: (text) => (
        <Typography>{moment(text).format('DD/MM/YYYY')}</Typography>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone1',
      key: 'phone1',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Typography style={{ color: '#2CB3A5' }}>
          {getCustomerStatus(text)}
        </Typography>
      ),
    },
  ];

  const TableDropDown = () => {
    return (
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              setOpenDropDown(false);
              setvalueSeach(record);
              handleChangeValue(record, keyForm);
            },
          };
        }}
        dataSource={data}
        columns={columns}
      />
    );
  };

  return (
    <S.Select
      placeholder='Tên khách hàng'
      showSearch
      value={typeId === 3 ? valueSeach?.name : valueSeach?.fullname}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      open={openDropDown}
      dropdownRender={TableDropDown}
      dropdownStyle={{ minWidth: 800 }}
    >
      <TableDropDown />
    </S.Select>
  );
};

SelectTable.defaultProps = {
  subCustomer: false,
};

SelectTable.prototype = {
  typeId: PropTypes.number,
  handleChangeValue: PropTypes.func,
  value: PropTypes.object,
  keyForm: PropTypes.number,
  subCustomer: PropTypes.bool,
  companyId: PropTypes.number,
};

export default SelectTable;
