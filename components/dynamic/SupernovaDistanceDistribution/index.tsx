"use client";
import { FunctionComponent, useContext } from "react";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";
import dynamic from "next/dynamic";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { useTranslation } from "react-i18next";
import Loader from "@/components/page/Loader";
import { WidgetInput } from "@/types/answers";
import { exists, isDefined } from "@/lib/utils";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import { isEntryValid } from "@/helpers/gql";

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

const Fragment = graphql(`
  fragment LightCurveQuestionData on contentBlocks_supernovaDistanceDistribution_BlockType {
    questionEntries {
      ... on questions_default_Entry {
        id
        questionWidgetsBlock {
          ... on questionWidgetsBlock_lightCurveBlock_BlockType {
            lightCurveTool {
              ... on widgets_lightCurveTool_Entry {
                title
                displayName
                dataset {
                  ... on datasets_supernovaGalaxyObservations_Entry {
                    id
                    title
                    distance
                    lat: galacticLatitude
                    long: galacticLongitude
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

interface SupernovaDistanceDistributionContainerProps {
  step: number;
  album: Array<any>;
  supernovaData: Array<number>;
  questionData: FragmentType<typeof Fragment>;
  instructions?: string;
}

const SupernovaDistanceDistributionContainer: FunctionComponent<
  SupernovaDistanceDistributionContainerProps
> = ({ step, album = [], supernovaData, questionData, instructions }) => {
  const { questionEntries } = useFragment(Fragment, questionData);
  const { answers } = useContext(StoredAnswersContext);

  const { t } = useTranslation();

  const histogramData = supernovaData.map((value, i) => {
    return {
      bin: i * step,
      value,
    };
  });

  const userData = [...questionEntries]
    .map((entry) => {
      if (!isEntryValid(entry, "questions_default_Entry")) return undefined;

      const { questionWidgetsBlock, id } = entry;

      if (
        isNull(id) ||
        isNull(questionWidgetsBlock) ||
        !isEntryValid(
          questionWidgetsBlock[0],
          "questionWidgetsBlock_lightCurveBlock_BlockType"
        )
      )
        return undefined;

      const { data } = answers[id] || {};

      // if there is no answer, exit
      if (isUndefined(data)) return undefined;

      const { lightCurveTool } = questionWidgetsBlock[0];

      if (
        isNull(lightCurveTool) ||
        !isEntryValid(lightCurveTool[0], "widgets_lightCurveTool_Entry")
      )
        return undefined;

      const { dataset, title, displayName } = lightCurveTool[0];

      const source = dataset.find((source) => {
        if (!isEntryValid(source, "datasets_supernovaGalaxyObservations_Entry"))
          return false;

        return (data as WidgetInput).datasetId === source.id;
      });

      if (!isEntryValid(source, "datasets_supernovaGalaxyObservations_Entry"))
        return undefined;

      const { title: datasetName, distance, lat, long } = source;

      return {
        id: `${displayName || title}: ${datasetName}`,
        distance,
        lat,
        long,
        magnitude: 0,
      };
    })
    .filter(exists);

  const binnedImages = histogramData.map(({ bin }) => {
    const matchedImage = album.find(({ name }: { name: string }) => {
      const regex = new RegExp(`${bin}_`);
      return name.search(regex) === 0;
    });

    if (isUndefined(matchedImage)) {
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
  const filteredBinnedImages = binnedImages.filter(isDefined);
  const imageMismatch = filteredBinnedImages.length !== imageCount;

  return (
    <WidgetContainerWithModal
      title={t("widgets.supernova_three_vector")}
      {...{ instructions }}
    >
      <SupernovaDistanceDistribution
        step={step || 100}
        binnedImages={imageMismatch ? [] : filteredBinnedImages}
        {...{ histogramData, userData }}
      />
    </WidgetContainerWithModal>
  );
};

export default SupernovaDistanceDistributionContainer;
