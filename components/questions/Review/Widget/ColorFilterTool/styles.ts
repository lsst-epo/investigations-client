import styled from "styled-components";
import ColorFilterDisplay from "@/components/dynamic/ColorFilterDisplay";

export const Display = styled(ColorFilterDisplay)`
  margin-block-start: 1em;

  @media only print {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
`;
