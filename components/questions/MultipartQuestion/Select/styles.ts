"use client";
import styled from "styled-components";
import SelectListbox from "@rubin-epo/epo-react-lib/SelectListbox";

export const InlineSelect = styled(SelectListbox)`
  && {
    --select-height: 100%;

    display: inline-block;
    height: calc(1em * 1.25);
    font-size: 1em;

    > button {
      display: inline-flex;
      width: auto;
      vertical-align: text-bottom;
    }
  }
`;
