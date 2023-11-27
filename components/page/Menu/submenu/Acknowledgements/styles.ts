import styled from "styled-components";

export const MenuText = styled.div`
  & > * + * {
    margin-block-start: calc(var(--menu-padding) / 2);
  }

  ul,
  ol {
    list-style-position: inside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }
`;
