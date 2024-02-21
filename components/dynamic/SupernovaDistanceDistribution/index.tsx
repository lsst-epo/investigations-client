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
  album: any;
  supernovaData: Array<number>;
  userData: Array<any>;
  instructions?: string;
}

const SupernovaDistanceDistributionContainer: FunctionComponent<
  SupernovaDistanceDistributionContainerProps
> = ({
  step,
  album,
  supernovaData,
  userData,
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
    const {
      width,
      height,
      url: { directUrlPreview: url },
    } = album.find(({ name }: { name: string }) => {
      const regex = new RegExp(`${bin}_`);
      return name.search(regex) === 0;
    });

    return { width, height, url };
  });

  return (
    <WidgetContainer
      title={t("widgets.supernova_three_vector") || undefined}
      variant="light"
      fillScreen
      {...{ isOpen, openModal, closeModal, instructions }}
    >
      <SupernovaDistanceDistribution
        {...{ step, histogramData, userData, binnedImages }}
      />
    </WidgetContainer>
  );
};

export default withModal(SupernovaDistanceDistributionContainer);
