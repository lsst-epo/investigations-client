"use client";
import { FC } from "react";
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import * as Styled from "./styles";

const YouTubePlayerWithLoading = dynamic(
  () => import("@rubin-epo/epo-react-lib/Video"),
  {
    ssr: false,
    loading: () => (
      <Styled.SkeletonContainer
        as={Skeleton}
        style={{ aspectRatio: "16 / 9" }}
        height="100%"
      />
    ),
  },
);

interface YouTubePlayerProps {
  url: string;
  className?: string;
}

const YouTubePlayer: FC<YouTubePlayerProps> = ({ url, className }) => {
  return <YouTubePlayerWithLoading {...{ url, className }} />;
};

YouTubePlayer.displayName = "ContentBlock.AssessmentVideo.YouTube";

export default YouTubePlayer;
