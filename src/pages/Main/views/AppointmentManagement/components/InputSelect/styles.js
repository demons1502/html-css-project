import { Select as AntSelect } from 'antd';
import styled from 'styled-components';
import { Input as InputComon } from '../../../../../../components/common';
export const WrapContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled(InputComon)`
  position: relative;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  color: #333333;
`;

export const Select = styled(AntSelect)`
  position: absolute;
  width: 20px !important;
  right: 0;

  &:not(.ant-select-customize-input) .ant-select-selector {
    background-color: #f8f8f8 !important;
    border: none;

    &:hover,
    &:focus,
    :focus-within {
      border-color: unset !important;
      box-shadow: unset !important;
    }
  }

  & .ant-picker-focused {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }

  & .ant-select-selector {
    & .ant-select-selection-item {
      display: none;
    }
  }
`;
