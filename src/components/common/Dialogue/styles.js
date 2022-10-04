import { Card as AntCard, Carousel as AntCarousel  } from "antd";
import styled from "styled-components";

export const Card = styled(AntCard)`
  border-bottom: 1px solid $grey-border-color;

  .ant-card-head {
    min-height: 0px;
    .ant-card-head-title {
      padding-top: 17px;
      padding-bottom: 14px;
      font-weight: 700;
      font-size: 20px;
      line-height: 25px;
      color: #333333;
    }
  }
  .ant-card-body {
    padding: 0px;

    button {
      margin-top: 14px;
      margin-left: 22px;
    }
  }
  .contents {
    padding: 20px 20px 20px 36px;

    p {
      font-family: "Quicksand";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #333333;
      padding-bottom: 17px;

      img {
        margin-right: 7px;
      }
    }
  }

  .footer {
    border-top: 1px solid #E6E6E6;
    padding-top: 13px;

    padding-right: 21px;

    .buttons {
      display: flex;
      align-items: center;
      gap: 7px;
      float: right;
      padding-bottom: 13px;

      .prev-btn-text {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        color: #999999;
      }
      .next-btn-text {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        color: #333333;
      }

      .prev-btn {
        border: 0px;
        margin-top: 0px !important;
        margin-left: 0px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .next-btn {
        border: 0px;
        width: 35px;
        height: 35px;
        background: #eff9f8;
        border-radius: 8px;
        margin-top: 0px !important;
        margin-left: 0px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export const Carousel = styled(AntCarousel)`
  ul {
    list-style-image: url('/images/dot.svg');
    &.slick-dots {
      display: none !important;
    }
  }
`;
