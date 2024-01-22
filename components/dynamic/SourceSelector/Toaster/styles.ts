import styled from "styled-components";
export { Toaster } from "@/components/layout/Toaster/styles";

export const ToastContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin-inline: auto;
  width: 100%;

  & > [role="status"] {
    flex-grow: 0;
    margin: 0;
    padding: 0;
  }
`;
