import styled from 'styled-components';
import { Select, Input, DatePicker } from '../../../../../../components/common';
import { Button as ButtonAntd, Row as RowAntd } from 'antd';

export const WrapInput = styled(Input)`
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  color: #333333;
  &.ant-input-disabled {
    color: #333333;
    background: #F8F8F8;
  }
`;

export const WrapSelect = styled(Select)`
  & .ant-select-selector {
    display: flex;
    border-radius: 5px !important;
    height: 40px !important;
    align-items: center;
    & .ant-select-selection-item {
      font-weight: 600;
      color: #333333;
    }
  }
  &.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector{
    color: #333333;
  }
`;

export const WrapRow = styled(RowAntd)`
  margin-bottom: 10px;
`;

export const WrapDatePicker = styled(DatePicker)`
  height: 40px !important; 
  >.ant-picker-input>input[disabled]{
    color: #333333;
    font-weight: 600;
  }
`;

export const ButtonAdd = styled(ButtonAntd)`
  display: flex;
  margin-top: 15px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: #3dbd78;
  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: #30a867;
  }
`;

export const ButtonDelete = styled(ButtonAntd)`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: none;
`;
