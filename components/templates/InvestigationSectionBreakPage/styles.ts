"use client";

import styled from "styled-components";
import { Title } from "../InvestigationChildPage/styles";

type TitleProps = {
  srOnly: string;
}

// We want to hide the <h1> but still make it readable by screenreaders, this is common pattern that
// CSS frameworks use:
const srOnlyHidden = `
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
export const SectionBreakTitle = styled(Title)<TitleProps>`
  margin-block-start: var(--title-margin);
  ${props => {if(props.srOnly === "true") return srOnlyHidden}}
`;

// If the title is screen-reader only then manually apply the margin that the h1 styling otherwise would
export const ReviewLinkContainer = styled.div<TitleProps>`
  display: flex;
  justify-content: center;
  ${props => {if(props.srOnly === "true") return "margin-top: 100px"}}
`;
