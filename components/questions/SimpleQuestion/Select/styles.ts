"use client";
import styled from "styled-components";
import SelectListbox from "@rubin-epo/epo-react-lib/SelectListbox";

export const Select = styled(SelectListbox)`
  && {
    --select-background-color: var(--question-background-color);
    --select-border-color: var(--question-border-color);
    --select-color: var(--question-input-color);
    --select-height: 2rem;

    display: block;
    margin-block-start: var(--PADDING_SMALL, 20px);
    font-size: 1rem;

    > button:not(:disabled):hover,
    > button:not(:disabled)[aria-expanded="true"] {
      outline: 2px solid var(--select-border-color);
      outline-width: 2px;
      outline-offset: -2px;
    }
  }
`;
