import styled from "styled-components";
import SelectListbox from "@rubin-epo/epo-react-lib/SelectListbox";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2em;
  gap: 1em;
`;
export const Select = styled(SelectListbox)`
  --select-height: 100%;

  font-size: 1em;
  height: 100%;
  width: 100%;
`;
