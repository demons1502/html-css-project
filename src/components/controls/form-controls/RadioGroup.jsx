import React from 'react';
import { Radio } from 'antd';
import { Controller } from 'react-hook-form';

export const RadioGroup = ({ control, name, options, errors }) => {
  let errMsg = errors?.[name]?.message;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Radio.Group size="large" {...field}>
            {options.length > 0 &&
              options?.map((option, i) => (
                <Radio key={option?.value} value={option?.value} className={``}>
                  <span className="">{option?.label}</span>
                </Radio>
              ))}
          </Radio.Group>
        )}
      />
      <p className="error-msg">{errMsg}</p>
    </>
  );
};
