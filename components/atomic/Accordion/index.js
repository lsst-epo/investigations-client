import PropTypes from "prop-types";
import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
export default function Accordion({ summary, children }) {
  return (
    <details>
      <Summary>
        <Icon aria-hidden />
        <span>{summary}</span>
      </Summary>
      <Details>{children}</Details>
    </details>
  );
}

const toggleWidth = "1.333em";
const togglePadding = `calc(${toggleWidth} + 1em)`;

const Summary = styled.summary`
  position: relative;
  display: flex;
  align-self: baseline;
  padding-left: ${togglePadding};
  font-size: ${fluidScale("24px", "18px")};
  cursor: pointer;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus-visible {
    --Icon-background-color: var(--turquoise85);
  }
`;

const Icon = styled.span`
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: ${toggleWidth};
    height: ${toggleWidth};
    font-size: 1.25em;
    font-weight: 800;
    line-height: ${toggleWidth};
    color: var(--white);
    content: "+";
    background-color: var(--Icon-background-color, var(--turquoise55));
    transition: background-color 0.2s;
    place-content: center;
  }
`;

const Details = styled.div`
  padding-left: ${togglePadding};
  margin-top: 1.5em;
`;

Accordion.displayName = "Atomic.Accordion";

Accordion.propTypes = {
  summary: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
