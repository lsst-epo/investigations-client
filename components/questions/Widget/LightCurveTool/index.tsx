import "@/lib/temml/Temml-Latin-Modern.css";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import { WidgetQuestion } from "..";
import LightCurveToolContainer from "@/components/dynamic/LightCurveTool/LightCurvePlot";
import Loader from "@/components/page/Loader";
import { getDataset } from "@/helpers/widgets";

const Fragment = graphql(`
  fragment LightCurveQuestion on questionWidgetsBlock_lightCurveBlock_BlockType {
    __typename
    lightCurveTool {
      ... on widgets_lightCurveTool_Entry {
        title
        displayName
        dataset {
          ... on datasets_supernovaGalaxyObservations_Entry {
            id
            peakMjd: mjd
            json {
              ... on datasets_Asset {
                url
              }
            }
          }
        }
        yMin: yAxisMin
        yMax: yAxisMax
      }
    }
  }
`);

const LightCurveToolQuestion: FunctionComponent<
  WidgetQuestion<FragmentType<typeof Fragment>>
> = ({ data, instructions, value = {}, onChangeCallback }) => {
  const { t } = useTranslation();
  const { lightCurveTool } = useFragment(Fragment, data);

  if (
    lightCurveTool === null ||
    lightCurveTool[0] === null ||
    lightCurveTool[0].__typename !== "widgets_lightCurveTool_Entry"
  )
    return null;

  const { datasetId } = value;
  const [{ title, displayName, dataset: datasets, yMin, yMax }] =
    lightCurveTool;

  const dataset = getDataset(datasets, datasetId);

  const handleChange = (newValue: any) => {
    return (
      onChangeCallback &&
      onChangeCallback({ ...value, ...newValue, datasetId: dataset.id })
    );
  };

  return (
    <WidgetContainerWithModal
      title={t("widgets.light_curve.title_interactive") || undefined}
      instructions={instructions}
    >
      {typeof dataset === "undefined" ? (
        <Loader />
      ) : (
        <LightCurveToolContainer
          name={displayName || title || undefined}
          data={value}
          onChangeCallback={handleChange}
          yMin={yMin || undefined}
          yMax={yMax || undefined}
          {...{ dataset }}
        />
      )}
    </WidgetContainerWithModal>
  );
};

LightCurveToolQuestion.displayName = "Questions.Widget.LightCurveTool";

export default LightCurveToolQuestion;
