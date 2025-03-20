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
  min-height: 3em;
  font-weight: bold;
`;
export const CopyUrl = styled(CopyUrlButton)`
  --share-size: 45px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 3em;
  font-weight: bold;
`;
export const Email = styled(EmailButton)`
  --share-size: 45px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 3em;
  font-weight: bold;
`;
export const Twitter = styled(TwitterButton)`
  --share-size: 45px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 3em;
  font-weight: bold;
`;
