import styled from "styled-components";
import { token } from "@rubin-epo/epo-react-lib/styles";

export const ReviewListItem = styled.li`
  --review-item-padding: 1em;

  background-color: var(--review-background-color);
  border-radius: 10px;
  padding: var(--review-item-padding);

  @container review-list (min-width: ${token("BREAK_TABLET_MIN")}) {
    --review-item-padding: 2em;
  }

  @media print {
    --review-item-padding: 0;
    page-break-inside: avoid;
  }
`;

export const Text = styled.span`
  background-color: var(--review-input-background-color);
  border: 1px solid var(--review-input-border-color);
  border-radius: 5px;
  color: var(--review-input-color);
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-block-start: 1em;
  padding: 0;
  padding-inline: 1ch;
  width: 100%;
  min-height: 2rem;
`;

export const Widget = styled.div`
  margin-block-start: 1em;

  @media only print {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
`;
