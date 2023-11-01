import styled from "styled-components";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";
import { BREAK_TABLET, BREAK_MOBILE } from "@/styles/globalStyles";
import Flag from "@/atomic/Flag";

export const EarlyAccess = styled(Flag)`
  font-size: ${fluidScale("12px", "8px", BREAK_TABLET, BREAK_MOBILE)};
  font-weight: 500;
  line-height: 1.2;
  color: var(--neutral90);
  text-align: center;
`;
