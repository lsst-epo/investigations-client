"use client";
import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import withModal from "@/components/hoc/withModal";
import ModalProps from "@/components/shapes/modal";
import WidgetContainer from "@/components/layout/WidgetContainer";
import Loader from "@/components/page/Loader";

const SupernovaDistanceDistribution = dynamic(
  () =>
    import("@rubin-epo/epo-widget-lib/SupernovaThreeVector").then(
      (module) => module.default
    ),
  {
    loading: () => <Loader height="20rem" />,
    ssr: false,
  }
);

interface SupernovaDistanceDistributionContainerProps extends ModalProps {
  step: number;
  album: Array<any>;
  supernovaData: Array<number>;
  userData: Array<any>;
  instructions?: string;
}

const SupernovaDistanceDistributionContainer: FunctionComponent<
  SupernovaDistanceDistributionContainerProps
> = ({
  step,
  album = [],
  supernovaData,
  userData = [],
  instructions,
  openModal,
  closeModal,
  isOpen,
}) => {
  const { t } = useTranslation();
  const histogramData = supernovaData.map((value, i) => {
    return {
      bin: i * step,
      value,
    };
  });

  const binnedImages = histogramData.map(({ bin }) => {
    const matchedImage = album.find(({ name }: { name: string }) => {
      const regex = new RegExp(`${bin}_`);
      return name.search(regex) === 0;
    });

    if (typeof matchedImage === "undefined") {
      return undefined;
    }

    const {
      width,
      height,
      url: { directUrlPreview: url },
    } = matchedImage;

    return { width, height, url };
  });

  const imageCount = binnedImages.length;
  const filteredBinnedImages = binnedImages.filter(
    (img): img is { width: number; height: number; url: string } =>
      typeof img !== "undefined"
  );
  const imageMismatch = filteredBinnedImages.length !== imageCount;

  return (
    <WidgetContainer
      title={t("widgets.supernova_three_vector") || undefined}
      variant="light"
      fillScreen
      {...{ isOpen, openModal, closeModal, instructions }}
    >
      <SupernovaDistanceDistribution
        step={step || 100}
        binnedImages={imageMismatch ? [] : filteredBinnedImages}
        {...{ histogramData, userData }}
      />
    </WidgetContainer>
  );
};

export default withModal(SupernovaDistanceDistributionContainer);
