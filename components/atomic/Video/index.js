import React from "react";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Video = ({ url }) => {
  return (
    <Wrapper>
      <ReactPlayer url={url} />
    </Wrapper>
  );
};

Video.propTypes = {
  url: PropTypes.string,
};

export default Video;
