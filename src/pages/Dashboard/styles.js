import { CaretDownOutlined as AntDCaretDownOutlined } from '@ant-design/icons';
import { Select as AntDSelect } from 'antd';
import styled, { css } from 'styled-components';

const greyColor = '#e6e6e6';
const primaryColor = '#36b872';
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

export const WrapTitle = styled.div`
  height: 60px;
  border-bottom: 1px solid ${greyColor};
  display: flex;
  align-items: center;

  ${({ $toggle }) =>
    $toggle &&
    css`
      border: none;
    `};

  ${({ $noneIcon }) =>
    $noneIcon &&
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
