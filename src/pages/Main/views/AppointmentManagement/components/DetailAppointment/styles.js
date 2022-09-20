import styled from 'styled-components';

export const WrapContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

export const WrapTitle = styled.h3`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
`;

export const WrapInfo = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.07);
`;

export const WrapTop = styled.div`
  display: flex;
  flex-direction: column;
  padding: 13px 10px;
  border-bottom: 1px dashed #e6e6e6;
`;

export const BoxTitle = styled.span`
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #333333;
`;

export const SubTitle = styled.span`
  margin: 0 20px 0;
  font-weight: 600;
  font-size: 12px;
`;

export const WrapTime = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const wrapMiddle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 13px 10px;
  border-bottom: 1px dashed #e6e6e6;
`;

export const ItemMiddle = styled.div`
  display: flex;
  flex-direction: row;
`;
