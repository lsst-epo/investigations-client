import styled from "styled-components";
import { green20 } from "@/styles/globalStyles";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";

export const Heading = styled.h2`
  padding-block-end: ${fluidScale("57px", "47px")};
`;
export const InteractionGroup = styled.div`
  padding: ${fluidScale("40px", "30px")};
  background-color: ${green20};

  > section + section {
    margin-top: 30px;
  }
`;
