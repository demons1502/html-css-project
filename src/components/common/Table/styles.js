import { Table as AntTable } from 'antd';
import styled from 'styled-components';

export const Table = styled(AntTable)`
  tr {
    td {
      vertical-align: middle;
    }
    &:hover {
      background: #35b46f;
      td {
        border-bottom: none;
      }
    }
    th {
      vertical-align: middle;
      &::before {
        display: none;
      }
      &:first-child {
        border-top-left-radius: 0 !important;
      }
    }
  }
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: #35b46f;
    color: #fff;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: #35b46f;
    color: #fff;
  }
  .actions {
    display: none;
  }
  .ant-table-row:hover .actions {
    display: block;
    color: #000;
    border-bottom: 0px;
  }
  .ant-table-row:hover .other {
    display: none;
  }

  //customize for table history payment
  &.history-table {
    tr {
      &:hover {
        /* background: #35b46f; */
        td {
          border-bottom: none;
        }
      }
      th {
        &::before {
          display: none;
        }
        &:first-child {
          border-top-left-radius: 0 !important;
        }
      }
    }
  }
`;
