"use client";
import styled from "styled-components";

export const Container = styled.section`
  --figure-ui-size: calc(var(--content-gap) * 2);
  --figure-max-height: calc(
    calc(100vh - var(--global-ui-height) - var(--figure-ui-size)) *
      var(--video-aspect-ratio)
  );
  --intrinsic-width: calc(var(--figure-ui-size) + var(--video-width));
  --figure-width: min(var(--intrinsic-width), var(--figure-max-height));

  display: flex;
  justify-content: center;
  width: 100%;
`;
