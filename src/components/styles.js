import { Button as AntButton, PageHeader as AntPageHeader } from 'antd';
import styled from 'styled-components';

export const PageHeader = styled(AntPageHeader)`
  &.ant-page-header {
    background-color: #fff; 
    padding: 7px 28px;
    margin: 0 -28px 13px -28px;
    & .ant-page-header-heading-title {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #333333;
    }
  }
`;

export const Button = styled(AntButton)`
  font-family: 'Quicksand';
  font-style: normal;
  border-radius: 10px;
  height: 35px;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  padding: 0 24px;
  &.ant-btn-primary {
    background: linear-gradient(180deg, #36B872 0%, #30A867 100%);
    color: #fff;
    border: none;
    &:hover,
    &:focus {
      opacity: 0.8
    }
    
  }
  &.ant-btn-default {
    border: 1px solid #3DBD78;
    color: #3DBD78;
    &:hover,
    &:focus {
      background: linear-gradient(180deg, #36b872, #30a867);
      color: #fff;
      border-color: #30a867;
    }
  }
  &.ant-btn-icon-only {
    border: none;
    color: #999999;
    padding: 0;
    font-size: 20px;
    & . anticon {
      font-size: 20px;
    }
    &.btn-hover-danger {
      &:hover ,
      &:focus {
        background: none;
        color: #FF5855;
      }
    }
    &.btn-hover-primary {
      &:hover ,
      &:focus {
        background: none;
        color: #30a867;
      }
    }
  }
  &.ant-btn-sm {
    height: 25px;
    padding: 0 10px;
  }
`;