import styled from "styled-components";

export const Container = styled.section`
  padding: var(--size-spacing-xs);

  &[data-dark-mode="true"] {
    color: var(--color-font-invert);
    color-scheme: dark;
  }
`;
