import { CaretDownOutlined as AntDCaretDownOutlined } from '@ant-design/icons';
import { Select as AntDSelect, Row as AntDRow, Col as AntDCol, Button as AntDButton } from 'antd';
import styled, { css } from 'styled-components';

const greyColor = '#e6e6e6';
const primaryColor = '#36b872';
const disabledColor = '#f4f4f4';
const fontSize = '1.4rem';

export const WrapLayout = styled.div`
  padding-bottom: 88px;
  font-size: ${fontSize};
`;

export const WrapContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 30px rgb(0 0 0 / 5%);
  border-radius: 25px 25px 25px 25px;
  height: 100%;
  width: 100%;
`;

export const WrapHeader = styled.div`
  padding-top: 6px;
  padding-bottom: 10px;
`;

export const WrapTitle = styled(AntDRow)`
  height: 60px;
  border-bottom: 1px solid ${greyColor};
  display: flex;
  align-items: center;
  width: 100%;

  ${(props) =>
    props.$toggle &&
    css`
      border: none;
    `};

  ${(props) =>
    props.$noneIcon &&
    css`
      padding: 19px 0px 19px 23px;
    `};
`;

export const IconDown = styled(AntDCaretDownOutlined)`
  padding-left: 19.96px;
  padding-right: 9.96px;
  color: #999999;
`;

export const Title = styled.h3`
  padding-right: 25px;
`;

export const Select = styled(AntDSelect)`
  min-width: 120px;
  min-height: 32px;

  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: ${primaryColor};
    border: none;
    border-radius: 10px;
    color: white;
  }

  .ant-select-arrow {
    color: white;
  }

  &.ant-select-selection-item {
    color: white;
  }

  &.ant-select-single.ant-select-open .ant-select-selection-item {
    color: white;
    background-color: ${primaryColor};
  }

  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
    box-shadow: none;
  }
`;

export const WrapContent = styled.div`
  ${(props) => {
    switch (props.$display) {
      case 'none':
        return css`
          display: none;
        `;
      default:
        return css`
          display: block;
        `;
    }
  }}
`;

export const WrapTableAction = styled.div`
  display: flex;
  gap: 13px;
  justify-content: center;
  align-items: center;
`;

export const TagVertical = styled.div`
  display: flex;
  align-items: center;
  padding: 1px 0px;
  height: 100%;
  padding-left: 12px;
  ${(props) => {
    switch (props.$color) {
      case 'green':
        return css`
          border-left: 2px solid #3dbd78;
        `;
      case 'yellow':
        return css`
          border-left: 2px solid #f6a447;
        `;
      case 'blue':
        return css`
          border-left: 2px solid #407bff;
        `;
      case 'orange':
        return css`
          border-left: 2px solid #ed706e;
        `;
      case 'purple':
        return css`
          border-left: 2px solid #8f99d3;
        `;
    }
  }}
`;

export const WrapButtonTitle = styled(AntDCol)`
  text-align: right;
  padding-right: 23px;
`;

export const WrapButtonTable = styled.div`
  text-align: right;
  padding-right: 3px;
`;

export const TextTable = styled.span`
  font-size: 12px;
  line-height: 15px;
  color: #999999;
  ${(props) =>
    props.$bold &&
    css`
      color: #333333;
    `};
`;

export const CircleTag = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  margin-left: 7px;
  margin-top: 8px;
  background-color: ${primaryColor};
  ${(props) =>
    props.$miss &&
    css`
      background-color: #ff5855;
    `};
`;

export const Button = styled(AntDButton)`
  background: ${primaryColor};
  color: #fff;
  border-radius: 10px;
  border: none;
  &:hover,
  &:focus {
    background: ${primaryColor};
    color: #fff;
    border-color: #30a867;
  }
  ${(props) => {
    switch (props.$type) {
      case 'disabled':
        return css`
          background: ${disabledColor};
          color: #666666;
          &:hover,
          &:focus {
            background: ${disabledColor};
            color: #666666;
          }
        `;
      case 'ghost':
        return css`
          background: #ffffff;
          color: ${primaryColor};
          border: 1px solid ${primaryColor};
          &:hover,
          &:focus {
            background: #ffffff;
            color: ${primaryColor};
            border: 1px solid ${primaryColor};
          }
        `;
    }
  }}
`;
