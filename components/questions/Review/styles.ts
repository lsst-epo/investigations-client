"use client";
import styled from "styled-components";
import { token } from "@rubin-epo/epo-react-lib/styles";

export const ReviewListItem = styled.li`
  --review-item-padding: 1em;

  padding: var(--review-item-padding);
  background-color: var(--review-background-color);
  border-radius: 10px;

  @container review-list (min-width: ${token("BREAK_TABLET_MIN")}) {
    --review-item-padding: 2em;
  }

  @media print {
    --review-item-padding: 0;

    page-break-inside: avoid;
  }
`;

export const Text = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2rem;
  padding: 0;
  padding-inline: 1ch;
  margin-block-start: 1em;
  font-size: 1rem;
  color: var(--review-input-color);
  background-color: var(--review-input-background-color);
  border: 1px solid var(--review-input-border-color);
  border-radius: 5px;
`;

export const PrintWrapper = styled.div`
  --target-height: 1;
  --global-ui-height: calc(
    var(--pager-height, 0px) + var(--header-height, 0px)
  );
  --widget-ui-height: calc(var(--review-item-padding, 0px) * 2 + 1em);
  --screen-height: calc(
    100vh - var(--global-ui-height) - var(--widget-ui-height)
  );
  --widget-max-height: calc(var(--screen-height) * var(--target-height));

  container-type: inline-size;
  display: flex;
  justify-content: center;
  margin-block-start: 1em;

  @container (min-width: ${token("BREAK_LARGE_TABLET")}) {
    --target-height: 0.85;
  }

  @media only print {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;

    --target-height: 0.5;
    --widget-max-height: calc(100vh * var(--target-height));
  }
`;
