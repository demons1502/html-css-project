import { Checkbox, Button } from 'antd';
import styled, { css } from 'styled-components';

const greyColor = '#e6e6e6';
const greyTableColor = '#cccccc';
const primaryColor = '#36b872';
const secondaryColor = '#f8f8f8';
const disabledColor = '#f4f4f4';
const fontSize = '1.4rem';

export const green50 = '#EFF9F8';
export const green100 = '#3DBD78';
export const green200 = '#3CBD77';
export const green300 = '#34B16D';
export const error = '#E9726F';
export const gray100 = '#F1F1F1';
export const gray200 = '#999999';

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

  ${({ $backgroundColor }) =>
    $backgroundColor &&
    css`
      background-color: ${$backgroundColor};
    `};

	${({ $borderRadius }) =>
    $borderRadius &&
    css`
      border-radius: ${$borderRadius};
    `};

  ${({ $wFull }) =>
    $wFull &&
    css`
      width: 100%;
    `};
`;

export const FlexContent = styled.div`
  display: flex;
	align-items: center;
  ${({ $justifyContent }) =>
    $justifyContent &&
    css`
  justify-content: ${$justifyContent};
  `}
`;

export const WrapText = styled.div`
  line-height: 20px;
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
  ${({ $fontWeight }) =>
    $fontWeight &&
    css`
      font-weight: ${$fontWeight === true ? 'bold' : $fontWeight};
    `}
  ${({ $padding }) =>
    $padding &&
    css`
      padding: ${$padding};
    `}
`;

const btnColorScheme = {
  green100: green100,
  green200: green200,
  green300: green300,
  error: error
}

export const WrapBtn = styled(Button)`
  display: flex;
  align-items: center;
  cursor: pointer;
	padding: ${({ $padding }) => $padding ? $padding : '8px'};
	border-radius: ${({ $borderRadius }) => $borderRadius ? $borderRadius : '8px'};
	font-size: ${({ $fontSize }) => $fontSize ? $fontSize : '12px'};
	width: ${({ $width }) => $width ? $width : 'initial'};
	${({ $variant, $colorScheme }) => {
    switch ($variant) {
      case 'outlined':
        return css`
					border: 1px solid ${green100};
					color: ${green100};
          &:hover {
            background-color: ${green300};
            color: white;
          };
				`;
      case 'filled':
        return css`
          background-color: ${btnColorScheme[$colorScheme] || green300};
          color: white;
        `;
      default:
        break;
    }
  }}
`;

export const BtnIcon = styled.div`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  color: #333333;
`;

export const WrapCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${green100};
    border-color: ${green100};
  }
`

