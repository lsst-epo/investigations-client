import styled from "styled-components";
import SelectListbox from "@rubin-epo/epo-react-lib/SelectListbox";

export const InputContainer = styled.div`
  width: max-content;
  max-width: 30ch;
`;
export const Select = styled(SelectListbox)`
  --select-height: 100%;

  margin-inline-start: 1em;
  float: right;
  height: 2rem;
  aspect-ratio: 1;

  > button {
    justify-content: center;

    span {
      display: none;
    }

    svg {
      margin: 0;
    }
  }

  > ul {
    right: 0;

    label {
      width: max-content;
      max-width: 40ch;

      span {
        white-space: normal;
      }
    }
  }
`;
