import styled, { css } from 'styled-components';

const greyColor = '#e6e6e6';
const greyTableColor = '#cccccc';
const primaryColor = '#36b872';
const secondaryColor = '#f8f8f8';
const disabledColor = '#f4f4f4';
const fontSize = '1.4rem';

export const green100 = '#3DBD78';
export const green200 = '#3CBD77';
export const green300 = '#34B16D';
export const error = '#E9726F';
export const gray = '#999999';

export const WrapHeader = styled.div`
  padding-top: 6px;
  padding-bottom: 10px;
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

  ${({ $borderColor }) =>
    $borderColor &&
    css`
      border: 1px solid ${$borderColor};
    `};
`;

export const WrapText = styled.div`
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize};
    `}
`;
