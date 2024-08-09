import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--PADDING_SMALL);
  padding-top: var(--PADDING_SMALL);
`;

export const SSOSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--PADDING_SMALL);
`;

export const ForgetCreateContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LinkishButton = styled.button`
  color: var(--turquoise70, #058b8c);
  font-size: 16px;
  font-weight: 700;
`;
