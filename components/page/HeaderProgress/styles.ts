import styled, { css } from "styled-components";
import {
  Marker,
  ProgressBar as BaseProgressBar,
} from "@rubin-epo/epo-react-lib";

const colors = [
  "#019305",
  "var(--turquoise85,#12726c)",
  "#006DA8",
  "#8C65A5",
  "#F0B670",
];

export const HeaderProgress = styled.ul`
  background-color: var(--neutral10, #f5f5f5);
  display: flex;
  align-items: center;
  gap: calc(var(--PADDING-SMALL, 20px) / 2);
  padding-inline: var(--PADDING-SMALL, 20px);
  height: 30px;
  width: 100%;
`;
export const ProgressBar = styled(BaseProgressBar)``;

export const SectionProgress = styled.li.attrs<{ $proportion: number }>(
  ({ $proportion }) => ({ style: { flexBasis: `${$proportion}%` } })
)<{ $proportion: number }>`
  ${colors.reduce(
    (prev, curr, i) =>
      prev.concat(`
      &:nth-of-type(${colors.length}n + ${i + 1}) {
        ${ProgressBar} {
          --progress-bar-background: ${curr}
        }
      }
    `),
    css``
  )}
`;
export const IconMarker = styled(Marker)<{ $backgroundColor: string }>``;
