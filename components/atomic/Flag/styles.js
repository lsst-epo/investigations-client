import styled from "styled-components";

export const Flag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OffsetWrapper = styled.div`
  display: block;
`;

export const FlagBody = styled.div`
  padding: 14px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const FlagTail = styled.svg`
  display: block;
`;
