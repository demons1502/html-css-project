/* eslint-disable indent */
import {
  CaretDownOutlined as AntDCaretDownOutlined,
  ExclamationCircleOutlined as AntDIconTooltip,
} from '@ant-design/icons';
import {
  Button as AntDButton,
  Col as AntDCol,
  Row as AntDRow,
  Select as AntDSelect,
  Table as AntDTable,
  Tabs as AntDTabs,
  DatePicker as AntDDatePicker,
  Modal as AntDModal,
  Popover as AntDPopover,
} from 'antd';
import styled, { css } from 'styled-components';

const greyColor = '#e6e6e6';
const greyTableColor = '#cccccc';
const primaryColor = '#36b872';
const secondaryColor = '#f8f8f8';
const disabledColor = '#f4f4f4';
const fontSize = '1.4rem';
const fontWeightSemiBold = '600 !default';

export const WrapLayout = styled.div`
  padding-bottom: 88px;
  font-size: ${fontSize};
`;

export const WrapContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 30px rgb(0 0 0 / 5%);
  border-radius: 25px;
  height: 100%;
  width: 100%;

  ${(props) =>
    props.$toggle &&
    css`
      height: 60px;
      width: 100%;
    `};

  ${(props) =>
    props.$maxHeight &&
    css`
      max-height: ${props.$maxHeight};
    `};

  ${(props) =>
    props.$height &&
    css`
      height: ${props.$height};
    `};
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
  gap: 10px;

  ${(props) =>
    props.$toggle &&
    css`
      border: none;
    `};

  ${(props) =>
    props.$noneIcon &&
    css`
      padding: 19px 23px;
    `};

  ${(props) =>
    props.$height &&
    css`
      height: ${props.$height};
    `};

  ${(props) =>
    props.$padding &&
    css`
      padding: ${props.$padding};
    `};
`;

export const IconDown = styled(AntDCaretDownOutlined)`
  padding-left: 19.96px;
  color: #999999;
`;

export const Title = styled.h3`
  ${(props) =>
    props.$nonePadding &&
    css`
      padding: 0px;
    `};
`;

export const Select = styled(AntDSelect)`
  min-width: 120px;
  min-height: 32px;

  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: ${primaryColor} !important;
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

  ${(props) =>
    props.$paddingBottom &&
    css`
      padding-bottom: 13px;
    `};

  ${(props) =>
    props.$padding &&
    css`
      padding: ${props.$padding};
    `};
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
  min-width: 88px;
  flex: 1 1 auto;
`;

export const WrapButtonTable = styled.div`
  text-align: right;
  padding-right: 3px;

  ${(props) =>
    props.$paddingRight &&
    css`
      padding-right: ${props.$paddingRight || '0px'};
    `};

  ${(props) =>
    props.$center &&
    css`
      text-align: center;
    `};
`;

export const TextTable = styled.span`
  font-size: 12px;
  line-height: 15px;
  color: #999999;
  max-width: 100%;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${(props) =>
    props.$bold &&
    css`
      color: #333333;
    `};
  ${(props) =>
    props.$paddingLeft &&
    css`
      padding-left: ${props.$paddingLeft};
    `};
`;

export const CircleTag = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  margin: 8px 6px 0px 7px;
  background-color: ${(props) => props?.$color || primaryColor};

  ${(props) =>
    props.$miss &&
    css`
      background-color: #ff5855;
    `};
`;

export const Button = styled(AntDButton)`
  background: ${primaryColor};
  color: ${(props) => props?.$color || '#fff'};
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
          color: ${(props) => props?.$color || primaryColor};
          border: 1px solid ${(props) => props?.$color || primaryColor};
          &:hover,
          &:focus {
            background: #ffffff;
            color: ${(props) => props?.$color || primaryColor};
            border: 1px solid ${(props) => props?.$color || primaryColor};
          }
        `;
    }
  }}

  ${(props) =>
    props.$height &&
    css`
      height: ${props.$height || '32px'};
    `};

  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width || '94px'};
    `};
`;

export const WrapIconTable = styled.img`
  width: 12px;
  height: 12px;

  margin: 5px 6px 0px 0px;
`;

export const IconTooltip = styled(AntDIconTooltip)`
  width: 12px;
  height: 12px;
  color: #999999;

  &:hover {
    color: #3dbd78;
  }
`;

export const Table = styled(AntDTable)`
  .ant-table-thead tr {
    th {
      background: ${secondaryColor};
      padding: 11.5px;
      font-size: 1.4rem;
      border-bottom: none;
      font-weight: ${fontWeightSemiBold};

      &::before {
        display: none;
      }

      &:first-child {
        border-top-left-radius: 0 !important;
        padding-left: 25px;
        ${(props) => {
          switch (props.$paddingIcon) {
            case true:
              return css`
                padding: 11.5px 20px;
              `;
            default:
              return css`
                padding-left: 25px;
              `;
          }
        }}
      }
    }
  }

  .ant-table-tbody {
    tr {
      td {
        font-size: 1.4rem;
        border-bottom: 1px dashed ${greyTableColor};
        padding: 10px;
        vertical-align: middle;

        ${(props) =>
          props.$paddingCel &&
          css`
            padding: ${props.$paddingCel};
          `};

        &:first-child {
          padding-left: 10px;
          ${(props) =>
            props.$paddingIcon &&
            css`
              padding-left: 20px;
            `};
        }
      }

      &:last-child {
        td {
          ${(props) => {
            switch (props.$borderBottom) {
              case false:
                return css`
                  border-bottom: none;
                `;
              case true:
                return css`
                  border-bottom: 1px solid ${greyTableColor};
                `;
              default:
                return css`
                  border-bottom: 1px dashed ${greyTableColor};
                `;
            }
          }}
        }
      }

      ${(props) =>
        props.$heightRow &&
        css`
          height: ${props.$heightRow};
        `};
    }
  }

  .ant-table-row-selected {
    td {
      background: $green-table-bg !important;
      border-bottom: 1px solid $white-color !important;
      color: $white-color;
    }
  }

  .ant-table-content {
    ${(props) =>
      props.$height &&
      css`
        height: ${props.$height};
      `};
  }

  ${(props) =>
    props.$height &&
    css`
      height: ${props.$height};
    `};

  ${(props) =>
    props.$minHeight &&
    css`
      min-height: ${props.$minHeight};
    `};

  ${(props) =>
    props.$endLine &&
    css`
      border-bottom: 1px solid ${greyTableColor};
    `};
`;

export const WrapIconCenter = styled(AntDCol)`
  display: flex;
  align-items: center;
`;

export const TextColor = styled.span`
  color: ${(props) => props.$color || '#fff'};
  ${(props) =>
    props.$fontSize &&
    css`
      font-size: ${props.$fontSize};
    `};
`;

export const WrapTooltip = styled.div`
  padding: 10px;
`;

export const ItemAppointment = styled(AntDRow)`
  width: 100%;
  font-size: 12px;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.07);
  border-radius: 15px;
  margin: 10px 0px;
`;

export const WrapHr = styled.hr`
  display: block;
  border: 1px dashed #e6e6e6;
  width: 100%;
`;

export const WrapFirstColAppointment = styled(AntDCol)`
  padding: 8px 15px 0px;
`;

export const WrapSecondColAppointment = styled(AntDCol)`
  padding: 0px 15px 10px;
`;

export const WrapIconImage = styled.img`
  width: ${(props) => props.$width || '12px'};
  height: ${(props) => props.$height || '10px'};
  margin-right: ${(props) => props.marginRight || '10px'};
`;

export const WrapTextCenter = styled(AntDCol)`
  text-align: center;
`;

export const WrapTextRight = styled(AntDCol)`
  text-align: right;
`;

export const WrapBorderRight = styled(AntDCol)`
  border-right: 1px solid ${greyColor};
`;

export const Tabs = styled(AntDTabs)`
  border-radius: 10px;
  background-color: #f8f8f8;
  color: #999999;

  padding: 7px 5px;
  width: 100%;
  height: 100%;
  max-height: 37px;

  display: flex;
  justify-content: center;

  .ant-tabs-nav {
    margin: 0;

    &:before {
      border: none;
    }
  }

  .ant-tabs-tab {
    padding: 0px;
    margin: 0px;

    &:before {
      border: none;
    }
  }

  .ant-tabs-nav-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .ant-tabs-content {
    margin-top: 10px;
  }

  .ant-tabs-tab-btn {
    padding: 5px 9px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ffffff;
    padding: 5px 9px;
    background-color: ${primaryColor};
    border-radius: 9px;
    max-height: 24px;
  }
  .ant-tabs-tab {
    &:hover {
      color: ${primaryColor};
    }
  }
  .ant-tabs-nav .ant-tabs-ink-bar {
    height: 0px;
  }
`;

export const WrapTextItem = styled(AntDCol)`
  color: #333333;
  font-size: ${(props) => props.$fontSize || '12px'};
  font-weight: ${(props) => props.$fontWeight || '500'};
  line-height: ${(props) => props.$lineHeight || '15px'};

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const WrapTextAlign = styled(AntDCol)`
  display: flex;
  align-items: center;
`;

export const WrapIconImageCalendar = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

export const DatePicker = styled(AntDDatePicker)`
  position: absolute;
  display: ${(props) => (props.$display ? props.$display : 'none')};
  border: 1px solid red;
  width: 280px;
  height: 40px;
`;

export const WrapRatio = styled(AntDRow)`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapTabs = styled.div`
  width: 100%;
  height: 720px;
  overflow: auto;

  ${(props) =>
    props.$center &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `};
`;

export const linkStyle = {
  display: 'flex',
};

export const Modal = styled(AntDModal)`
  .ant-modal-header {
    border-radius: 20px 20px 0 0;
  }
  .ant-modal-content {
    border-radius: 20px;
  }
`;

export const WrapIconNextCall = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const WrapDatePicker = styled(AntDDatePicker)`
  margin-right: 20px;
`;

export const Popover = styled(AntDPopover)`
  &:hover {
    cursor: pointer;
  }
`;

export const WrapPagination = styled(AntDCol)`
  height: 54px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .ant-pagination {
    padding: 0px;
  }
`;

export const WrapTextPadding = styled(AntDCol)`
  ${(props) =>
    props.$paddingTop &&
    css`
      padding-top: ${props.$paddingTop};
    `};

  ${(props) =>
    props.$marginBottom &&
    css`
      margin-bottom: ${props.$marginBottom};
    `};
`;

export const TextP = styled.p`
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
