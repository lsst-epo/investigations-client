"use client";
import { token } from "@rubin-epo/epo-react-lib/styles";
import styled from "styled-components";

export const Body = styled.body`
  --header-height: 80px;
  --pager-height: 40px;
  --scrollbar-width: calc(100vw - 100%);
  --global-ui-height: calc(
    var(--pager-height, 0px) + var(--header-height, 0px)
  );
  --content-gap: calc(var(--PADDING_SMALL, 20px) / 2);

  overflow-y: scroll;

  @media screen and (min-width: ${token("BREAK_TABLET_MIN")}) {
    --pager-height: 80px;
  }
  @media screen and (min-width: ${token("BREAK_LARGE_TABLET")}) {
    --content-gap: var(--PADDING_SMALL, 20px);
  }
  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    --pager-height: 70px;
  }
`;

export const WideWidthContainer = styled.div`
  --max-page-width: 2000px;

  margin-inline: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: var(--max-page-width);
`;
