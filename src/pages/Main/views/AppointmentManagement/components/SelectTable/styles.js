import { Select as AntSelect } from 'antd';
import styled from 'styled-components';

export const Select = styled(AntSelect)`
  &:not(.ant-select-customize-input) .ant-select-selector {
    background-color: #f8f8f8 !important;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    border: none;
    &:hover,
    &:focus,
    :focus-within {
      border-color: #30a867;
      box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
    }
  }

  & .ant-picker-focused {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }

  &.ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    height: 40px;
  }
  & .ant-select-selection-item {
    font-weight: 600;
    font-size: 14px;
    color: #333333;
  }
`;
