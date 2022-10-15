import { Drawer as ADrawer, Collapse as ACollapse } from 'antd';
import styled from 'styled-components';

export const SearchDrawer = styled(ADrawer)`
  top: 60px;
  border-radius: 37px 0 0 37px;

  .ant-drawer-content {
    border-radius: 17px 0 0 17px;

    &-wrapper {
      border-radius: 17px 0 0 17px;

      @media (max-width: 768px) {
        width: 360px !important;
      }
    }
  }

  .ant-drawer-body {
    padding: 0;
  }

  .ant-drawer-header {
    padding-left: 40px;
    border-bottom-width: 2px;
  }

  .ant-drawer-title {
    font-size: 18px;
    font-weight: 700;
  }

  .ant-drawer-mask {
    background: none;
  }

  .ant-drawer-close {
    display: none;
  }
`;

export const SearchCollapse = styled(ACollapse)`
  border: none;
  background: white;
  margin-left: 20px;

  .ant-collapse-item {
    border: none;
  }

  .ant-collapse-content-box {
    margin-top: -20px;
  }

  .ant-collapse-content {
    border-top: none;
  }

  .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    margin-right: 8px;
    transition: transform 0.3s ease-in-out;
  }

  .ant-collapse-arrow.active {
    transform: rotate(90deg);
  }
`;

export const TitleResult = styled.span`
  font-weight: 600;
`;

export const TitleQuestion = styled.span`
  font-weight: 700;
`;

export const LineDivider = styled.div`
  width: calc(100% + 20px);
  border-bottom: 1px dashed #e6e6e6;
  margin-left: -20px;
`;

export const QuestionContent = styled.div`
  width: 100%;
  height: fit-content;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 14px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  .content-top {
    display: flex;
    justify-content: space-between;

    .name {
      font-weight: 700;
    }

    .like-box {
      display: flex;
      align-items: center;

      span {
        padding-left: 8px;
        font-size: 12px;
        color: #666666;
      }

      svg {
        cursor: pointer;
      }
    }
  }

  .content-bot {
    font-size: 12px;
    color: #666666;
  }
`;
