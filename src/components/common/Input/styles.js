import { Input as AntInput } from 'antd';
import { InputNumber as AntInputNumber } from 'antd';
import styled from 'styled-components';

export const Input = styled(AntInput)`
  height: 40px;
  background: #f8f8f8;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #999999;
  .ant-input {
    background-color: #f8f8f8;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #999999;
  }
  &:focus {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }

  &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
  &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover {
    background: #f8f8f8;
  }
`;

export const InputNumber = styled(AntInputNumber)`
  width: 100%;
  background: #f8f8f8;
  border-radius: 5px;
  border: none;

  line-height: 18px;
  color: #999999;
  &:focus {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }
  input {
    font-weight: 700;
    font-size: 14px;
  }

  &.ant-input-number-status-error:not(.ant-input-number-disabled):not(.ant-input-number-borderless).ant-input-number,
  &.ant-input-number-status-error:not(.ant-input-number-disabled):not(.ant-input-number-borderless).ant-input-number:hover {
    background: #f8f8f8;
  }
`;
