import styled from "styled-components";
import { Marker } from "@rubin-epo/epo-react-lib";

export const HeaderProgress = styled.ul`
  background-color: var(--neutral10, #f5f5f5);
  display: flex;
  align-items: center;
  gap: calc(var(--PADDING-SMALL, 20px) / 2);
  padding-inline: var(--PADDING-SMALL, 20px);
  height: 30px;
  width: 100%;
`;

export const SectionProgress = styled.li.attrs<{ $proportion: number }>(
  ({ $proportion }) => ({ style: { flexBasis: `${$proportion}%` } })
)<{ $proportion: number }>``;

export const IconMarker = styled(Marker)<{ $backgroundColor: string }>``;
