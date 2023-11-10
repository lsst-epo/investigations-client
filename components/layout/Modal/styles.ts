"use client";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  grid-area: component;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &[data-modal-open="true"] {
    overflow-y: auto;
  }
`;
