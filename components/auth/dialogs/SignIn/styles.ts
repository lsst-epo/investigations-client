import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--PADDING_SMALL);
  justify-content: center;
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
  font-size: 16px;
  font-weight: 700;
  color: var(--turquoise70, #058b8c);
`;
