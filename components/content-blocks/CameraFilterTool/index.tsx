"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { useTranslation } from "react-i18next";
import { BaseContentBlockProps } from "@/components/shapes";
import WidgetContainer from "@/components/layout/WidgetContainer";
import CameraFilterTool from "@rubin-epo/epo-widget-lib/CameraFilter";
import withModal from "@/components/hoc/withModal/withModal";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment CameraFilterToolBlock on contentBlocks_cameraFilterTool_BlockType {
    widgetInstructions
  }
`);

const CameraFilterToolBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = ({ openModal, isOpen, data }) => {
  const { widgetInstructions } = useFragment(Fragment, data);
  const { t } = useTranslation();

  return (
    <>
      {!isOpen && widgetInstructions && (
        <Styled.WidgetInstructions
          dangerouslySetInnerHTML={{ __html: widgetInstructions }}
        />
      )}
      <WidgetContainer
        title={t("widgets.camera_filter_tool")}
        paddingSize={isOpen ? "small" : "none"}
        instructions={widgetInstructions || undefined}
        variant="light"
        interactive
        {...{ openModal, isOpen }}
      >
        <CameraFilterTool />
      </WidgetContainer>
    </>
  );
};

CameraFilterToolBlock.displayName = "ContentBlock.CameraFilterTool";

export default withModal(CameraFilterToolBlock);
