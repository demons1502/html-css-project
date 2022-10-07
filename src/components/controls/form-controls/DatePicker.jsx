import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import moment from 'moment';

const DatePickerControl = ({
  name,
  control,
  errors,
  defaultValue,
  disabled = false,
  className = '',
  allowClear = false,
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            allowClear={allowClear}
            {...field}
            id={name}
            // defaultValue={defaultValue}
            className={`form-control ${className}`}
            status={errMsg && 'error'}
            size="large"
            disabled={disabled}
            placeholder={placeholder}
            placement={'bottomLeft'}
            format={format}
          />
        )}
      />
      <p className="error-msg">{errMsg}</p>
    </div>
  );
};

export default DatePickerControl;