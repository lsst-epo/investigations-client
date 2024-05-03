import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { useTranslation } from "@/lib/i18n";
import { BaseContentBlockProps } from "@/components/shapes";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import CameraFilterTool from "@rubin-epo/epo-widget-lib/CameraFilter";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment CameraFilterToolBlock on contentBlocks_cameraFilterTool_BlockType {
    widgetInstructions
  }
`);

const CameraFilterToolBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = async ({ data, locale }) => {
  const { widgetInstructions } = useFragment(Fragment, data);
  const { t } = await useTranslation(locale, "translation");

  return (
    <>
      <Styled.WidgetInstructions
        dangerouslySetInnerHTML={{ __html: widgetInstructions || "" }}
      />
      <WidgetContainerWithModal
        title={t("widgets.camera_filter_tool") || undefined}
        instructions={widgetInstructions || undefined}
      >
        <CameraFilterTool />
      </WidgetContainerWithModal>
    </>
  );
};

CameraFilterToolBlock.displayName = "ContentBlock.CameraFilterTool";

export default CameraFilterToolBlock;
