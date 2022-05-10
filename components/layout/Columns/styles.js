import styled from "styled-components";

export const Columns = styled.div`
  columns: ${({ $width }) => $width || 300}px auto;
  column-gap: ${({ $gap }) => $gap || 25}px;
`;
