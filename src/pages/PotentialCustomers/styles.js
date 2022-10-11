import { Button as AntDButton, InputNumber as AntInputNumber } from 'antd';
import styled, { css } from 'styled-components';

export const WrapHeader = styled.div`
  border-bottom: 1px solid #e6e6e6;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

export const WrapSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 3;
  height: 100%;
  border-right: 1px solid #e6e6e6;
  span.input-item-search {
    max-width: 430px;
  }
`;

export const WrapAction = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 2;
`;

export const WrapIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  border-right: 1px solid #e6e6e6;
  img {
    cursor: pointer;
  }

  ${({ $isDelete }) =>
    $isDelete &&
    css`
      padding: 0 20px;
    `};

  ${({ $isCall }) =>
    $isCall &&
    css`
      padding: 0 10px;
    `};
`;

export const WrapButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-left: 20px;
`;

export const Button = styled(AntDButton)`
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

export const WrapFilter = styled.div`
  padding: 10px 20px;
`;

export const InputNumber = styled(AntInputNumber)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #f8f8f8;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #999999;
  input {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #999999;
  }
  .ant-input {
    background-color: #f8f8f8;
  }
  &:focus {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }
  &.ant-input-number-focused {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }

  &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
  &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover {
    background: #f8f8f8;
  }
`;
