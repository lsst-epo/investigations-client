import PropTypes from "prop-types";
import styled from "styled-components";

export default function Loader({
  className,
  size = 38,
  fill = "currentColor",
}) {
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    enableBackground: "new 0 0 38 38",
    viewBox: "0 0 38 38",
    width: size,
    height: size,
    fill,
    className,
  };

  return (
    <Wrapper>
      <StyledLoader {...svgProps}>
        <title>Loader icon</title>
        <g transform="translate(1 1)">
          <circle className="st0" cx="18" cy="18" r="18" />
          <path className="st1" d="m36 18c0-9.9-8.1-18-18-18">
            <animateTransform
              fill="remove"
              accumulate="none"
              additive="replace"
              attributeName="transform"
              calcMode="linear"
              dur="1s"
              from="0 18 18"
              repeatCount="indefinite"
              restart="always"
              to="360 18 18"
              type="rotate"
            ></animateTransform>
          </path>
        </g>
      </StyledLoader>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  place-content: center;
`;

const StyledLoader = styled.svg`
  .st0 {
    fill: none;
    stroke: #058b8c;
    stroke-width: 2;
    stroke-opacity: 0.5;
  }
  .st1 {
    fill: none;
    stroke: #058b8c;
    stroke-width: 2;
  }
`;

Loader.displayName = "SVG.Loader";

Loader.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  size: PropTypes.number,
};
