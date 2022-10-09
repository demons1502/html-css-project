import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getcustomersByCompany } from '../../../../../../services/customers';
import { CUSTOMER_STATUS } from '../../../../../../constants/customerStatus';

// COMPONENTS
import { Table, Typography } from 'antd';

//ULTIS
import { classifyCustomer } from '../../../../../../ultis/classifyCustomer';

//HOOKS
import useOutsideClick from '../../../../../../hooks/useOutsideClick';

// STYLES
import * as S from './styles';

let timeout;

const fetch = (value, callback, companyId) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  const getData = async () => {
    try {
      await getcustomersByCompany(companyId, {
        name: value,
        isActiveCompany: true,
      }).then((d) => {
        callback(d.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  timeout = setTimeout(getData, 300);
};

const SelectTableCustomers = ({ customer, handleChangeValue, keyForm, companyId }) => {
  const [data, setData] = useState([]);
  const [valueSeach, setvalueSeach] = useState();
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    customer ? setvalueSeach(customer) : setvalueSeach({})
  }, [customer]);

  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, setData, companyId);
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
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Phân loại',
      dataIndex: 'typeId',
      key: 'typeId',
      render: (text) => {
        return <Typography>{ classifyCustomer(text) }</Typography>;
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
      render: (text) => <Typography>{ text && moment(text).format('DD/MM/YYYY') }</Typography>,
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
      render: (text) => <Typography style={ { color: '#2CB3A5' } }>{ CUSTOMER_STATUS[text] ? CUSTOMER_STATUS[text] : CUSTOMER_STATUS['DEFAULT'] }</Typography>,
    },
  ];

  const TableDropDown = () => {
    return (
      <Table
        onRow={ (record) => {
          return {
            onClick: () => {
              setOpenDropDown(false);
              setvalueSeach(record);
              handleChangeValue(record, keyForm);
            },
          };
        } }
        dataSource={ data }
        columns={ columns }
        onClick={ useOutsideClick(() => setOpenDropDown(false)) }
        pagination={ false }
      />
    );
  };

  return (
    <S.Select
      placeholder={ 'Họ và tên' }
      showSearch
      value={ valueSeach?.fullName }
      defaultActiveFirstOption={ false }
      showArrow={ false }
      filterOption={ false }
      onSearch={ handleSearch }
      onChange={ handleChange }
      notFoundContent={ null }
      open={ openDropDown }
      dropdownRender={ TableDropDown }
      dropdownStyle={ { minWidth: 800 } }
      allowClear={ true }
    >
      <TableDropDown />
    </S.Select>
  );
};

SelectTableCustomers.prototype = {
  handleChangeValue: PropTypes.func,
  customer: PropTypes.object,
  keyForm: PropTypes.number,
  companyId: PropTypes.number,
};

export default SelectTableCustomers;
