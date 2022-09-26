import { Input as AntInput } from "antd";
import styled from "styled-components";

export const Input = styled(AntInput)`
  background: #f8f8f8;
  border-radius: 5px;
  border: none;
  &:focus {
    border-color: #30a867;
    box-shadow: 0 0 0 2px rgba(48 168 103 / 20%);
  }
`;