import { DatePicker as AntDatePicker } from 'antd';
import styled from 'styled-components';

export const DatePicker = styled(AntDatePicker)`
  &.ant-picker-focused,
  &.ant-picker:hover {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }
  background-color: #f8f8f8 !important;
  border-radius: 5px;
  border: none;
  height: 40px;
  input {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #999999;
  }
  &:focus {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }
`;
