"use client";
import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import withModal from "@/components/hoc/withModal";
import ModalProps from "@/components/shapes/modal";
import WidgetContainer from "@/components/layout/WidgetContainer";

const SupernovaThreeVector = dynamic(
  () =>
    import("@rubin-epo/epo-widget-lib/SupernovaThreeVector").then(
      (module) => module.default
    ),
  {
    ssr: false,
  }
);

interface SupernovaThreeVectorContainerProps extends ModalProps {
  step: number;
  album: any;
  supernovaData: Array<number>;
  userData: Array<any>;
}

const SupernovaThreeVectorContainer: FunctionComponent<
  SupernovaThreeVectorContainerProps
> = ({
  step,
  album,
  supernovaData,
  userData,
  openModal,
  closeModal,
  isOpen,
}) => {
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
    <WidgetContainer {...{ isOpen, openModal, closeModal }}>
      <SupernovaThreeVector
        {...{ step, histogramData, userData, binnedImages }}
      />
    </WidgetContainer>
  );
};

export default withModal(SupernovaThreeVectorContainer);
