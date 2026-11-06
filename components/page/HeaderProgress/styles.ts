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

export const HeaderProgress = styled.ul<{
  $backgroundColor: string;
  $padding: boolean;
}>`
  display: flex;
  gap: calc(var(--PADDING-SMALL, 20px) / 2);
  align-items: center;
  width: 100%;
  height: 30px;
  ${({ $padding }) =>
    $padding
      ? css`
          padding-inline: var(--PADDING-SMALL, 20px);
        `
      : ""}
  background-color: ${({ $backgroundColor }) => $backgroundColor}
`;
export const ProgressBar = styled(BaseProgressBar)`/* stylelint-disable-line no-empty-source */`;

export const SectionProgress = styled.li.attrs<{ $proportion: number }>(
  ({ $proportion }) => ({ style: { flexBasis: `${$proportion}%` } })
)<{ $proportion: number }>`
  list-style-type: none;
  ${colors.reduce(
    (prev, curr, i) =>
      prev.concat(`
      &:nth-of-type(${colors.length}n + ${i + 1}) {
        ${ProgressBar} {
          --progress-bar-background: ${curr}
        }
      }
    `),
    css`/* stylelint-disable-line no-empty-source */`
  )}
`;
export const IconMarker = styled(Marker)<{ $backgroundColor: string }>`/* stylelint-disable-line no-empty-source */`;
