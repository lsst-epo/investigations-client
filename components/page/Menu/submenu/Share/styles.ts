import styled from "styled-components";
import {
  FacebookButton,
  CopyUrlButton,
  EmailButton,
  TwitterButton,
} from "@rubin-epo/epo-react-lib/Share";

export const Facebook = styled(FacebookButton)`
  --share-size: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  min-height: 3em;
`;
export const CopyUrl = styled(CopyUrlButton)`
  --share-size: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  min-height: 3em;
`;
export const Email = styled(EmailButton)`
  --share-size: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  min-height: 3em;
`;
export const Twitter = styled(TwitterButton)`
  --share-size: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  min-height: 3em;
`;
