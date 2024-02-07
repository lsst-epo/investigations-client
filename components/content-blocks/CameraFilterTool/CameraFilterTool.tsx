"use client";
import { FunctionComponent } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { useTranslation } from "react-i18next";
import WidgetContainer from "@/components/layout/WidgetContainer";
import CameraFilterTool from "@rubin-epo/epo-widget-lib/CameraFilter";
import withModal from "@/components/hoc/withModal/withModal";

const CameraFilterToolBlock: FunctionComponent<BaseContentBlockProps> = ({
  openModal,
  isOpen,
}) => {
  const { t } = useTranslation();

  return (
    <WidgetContainer
      title={t("widgets.camera_filter_tool")}
      paddingSize={isOpen ? "small" : "none"}
      variant="light"
      interactive
      {...{ openModal, isOpen }}
    >
      <CameraFilterTool />
    </WidgetContainer>
  );
};

CameraFilterToolBlock.displayName = "ContentBlock.CameraFilterTool";

export default withModal(CameraFilterToolBlock);
