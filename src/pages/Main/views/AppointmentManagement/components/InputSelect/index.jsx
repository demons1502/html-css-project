import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Select } from 'antd';

// STYLES
import * as S from './styles';

export const InputSelect = ({ value, handleChange }) => {
  const [valueInput, setValueInput] = useState(value);
  const { Option } = Select;

  const onChangeSelect = (value) => {
    setValueInput(value);
    handleChange(value);
  };

  const onChangeInput = (e) => {
    setValueInput(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <S.WrapContainer>
      <S.Input
        placeholder='Nội dung lịch hẹn'
        value={valueInput}
        onChange={onChangeInput}
      />
      <S.Select
        dropdownStyle={{ minWidth: 295 }}
        onChange={onChangeSelect}
        placement='bottomRight'
      >
        <Option value='Khảo sát'>Khảo sát</Option>
        <Option value='Tư vấn tài chính'>Tư vấn tài chính</Option>
        <Option value='Tư vấn giải pháp'>Tư vấn giải pháp</Option>
      </S.Select>
    </S.WrapContainer>
  );
};

InputSelect.prototype = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

export default InputSelect;
