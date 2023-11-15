import styled from "styled-components";

export const Form = styled.form`
  margin-inline: auto;
  max-width: 70ch;

  > * + * {
    margin-block-start: var(--content-block-margin, var(--PADDING_SMALL, 20px));
  }
`;

export const Checkpoint = styled.h2`
  background-color: #b1f2ef;
  border-radius: 5px;
  color: var(--neutral95, #1f2121);
  display: flex;
  align-items: center;
  gap: 1em;
  font-size: 1rem;
  font-weight: normal;
  padding: 1em;
`;

export const CheckpointIcon = styled.div`
  aspect-ratio: 1;
  background-color: var(--white, #fff);
  border-radius: 50%;
  color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
`;

export const CheckpointDivider = styled.div`
  background-color: var(--neutral95, #1f2121);
  height: 3em;
  width: 1px;
`;
