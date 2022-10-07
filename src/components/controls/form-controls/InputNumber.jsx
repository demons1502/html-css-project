import React from 'react';
import { Controller } from 'react-hook-form';
import { InputNumber } from 'antd';

const InputNumberControl = ({
  name,
  control,
  errors,
  isDisabled = false,
  placeholder = '',
  max = 999999999,
  min = 0,
  className = '',
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputNumber
            {...field}
            id={name}
            className={`form-control ${className}`}
            status={errMsg && 'error'}
            size="large"
            max={max}
            min={min}
            step={1}
            disabled={isDisabled}
            placeholder={placeholder}
            style={{ width: '100%' }}
          />
        )}
      />
      <p className="error-msg">{errMsg}</p>
    </>
  );
};

export default InputNumberControl;
