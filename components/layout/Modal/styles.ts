"use client";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: component;
  justify-content: center;
  width: 100%;
  height: 100%;
  container-type: inline-size;

  &[data-modal-open="true"] {
    overflow-y: auto;
  }
`;
