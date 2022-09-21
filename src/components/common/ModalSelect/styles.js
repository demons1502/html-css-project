import styled from "styled-components";
import { Select as AntSelect, Button as AntButton } from "antd";

export const Select = styled(AntSelect)`
  &:not(.ant-select-customize-input) .ant-select-selector {
    background: #f8f8f8;
    border-radius: 5px;
    border: none;
    &:hover,
    &:focus {
      border-color: #30a867;
    }
  }
`;

export const Button = styled(AntButton)`
  background: linear-gradient(180deg, #36b872, #30a867);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: none;
  &:hover,
  &:focus {
    background: linear-gradient(180deg, #36b872, #30a867);
    color: #fff;
    border-color: #30a867;
  }
`;

export const ButtonCancel = styled(AntButton)`
  background: #fff;
  color: red;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid red;
  &:hover,
  &:focus {
    background: #fff;
    color: red;
    border-color: red;
  }
`;