"use client";

import type { WidgetInput } from "@/types/answers";

import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrbitalSimProvider,
  OrbitalSim,
} from "@rubin-epo/epo-widget-lib/OrbitalSim";
import SelectListbox from "@rubin-epo/epo-react-lib/SelectListbox";
import { BaseContentBlockProps } from "@/components/shapes";
import useAnswer from "@/hooks/useAnswer";
import Loader from "@/components/page/Loader";
import { isUserAnEducator } from "@/components/auth/serverActions";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment OrbitalSimWidget on contentBlocks_orbitalSimWidget_BlockType {
    __typename
    orbitalSimTool {
      id
      ... on widgets_orbitalSim_Entry {
        defaultZoom
        addTimeControls
        allowOrbitRotation
        showDetailsTable
        containsSwappableOrbits
        orbitalDatasets {
          ... on orbitalDatasets_orbital_BlockType {
            orbitalSimData {
              ... on datasets_orbitalSimOrbits_Entry {
                json {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`);

function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

const OrbitalSimWidget: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = ({ data, locale }) => {
  const [dataObj, setDataObj] = useState(null);
  const [url, setUrl] = useState<string>("");
  const [isEducator, setIsEducator] = useState(false);
  const { t } = useTranslation();

  /**
   * Add typing for `orbitalSimTool, this may come from codegen type
   */
  const { orbitalSimTool } = useFragment(Fragment, data);
  const { answer: value, onChangeCallback: setNeoIndex } =
    useAnswer<WidgetInput>(orbitalSimTool[0]?.id || "");

  const assignedNeoIndex = value?.assignedNeoIndex;
  const defaultZoom = orbitalSimTool[0]?.defaultZoom;
  const addTimeControls = orbitalSimTool[0]?.addTimeControls;
  const allowOrbitRotation = orbitalSimTool[0]?.allowOrbitRotation;
  const showDetailsTable = orbitalSimTool[0]?.showDetailsTable;
  const swappableOrbits = orbitalSimTool[0]?.containsSwappableOrbits;

  if (!url) {
    /**
     * to-do: use a helper like @/helpers/widgets::getDataset() to extract  the URL
     * or create a new one
     */
    setUrl(
      orbitalSimTool[0]?.orbitalDatasets[0]?.orbitalSimData[0]?.json[0]?.url,
    );
  }

  useEffect(() => {
    async function callServerFunction() {
      setIsEducator(await isUserAnEducator());
    }
    callServerFunction();
  }, []);

  useEffect(() => {
    if (!showDetailsTable || !dataObj || assignedNeoIndex != null) return;

    const newIndex = getRandomIndex(dataObj?.orbits?.neos?.length ?? 0);
    setNeoIndex({
      assignedNeoIndex: newIndex,
      dataType: "content",
    });
  }, [showDetailsTable, dataObj, assignedNeoIndex, setNeoIndex]);

  useEffect(() => {
    async function getOrbitalData(url: string) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching the JSON dataset for the Orbital Sim!");
      }
      const res = await response.json();
      setDataObj(res);
    }

    if (!dataObj) {
      getOrbitalData(url);
    }
  }, [url, dataObj]);

  /**
   * to-do: flesh out styling for `OrbitalSimWidgetContainer`
   */
  return (
    <Styled.OrbitalSimWidgetContainer>
      {!dataObj ? (
        <Loader />
      ) : (
        <>
          <OrbitalSimProvider
            swappableOrbits={swappableOrbits}
            orbitData={dataObj.orbits}
            defaultZoom={defaultZoom ?? 0.5}
            showDetailsTable={showDetailsTable}
            allowOrbitRotation={allowOrbitRotation}
            showTimeControls={addTimeControls}
            selectedNeoIndex={
              showDetailsTable ? assignedNeoIndex ?? 0 : undefined
            }>
            <OrbitalSim />
          </OrbitalSimProvider>
          {showDetailsTable && isEducator && (
            <>
              <p>{t("widgets.orbital_sim.instructor_neo_override_tip")}</p>
              <SelectListbox
                value={assignedNeoIndex}
                options={dataObj?.orbits?.neos?.map((neo, i) => ({
                  value: i,
                  label: neo.Principal_desig,
                }))}
                onChangeCallback={(newIndex) =>
                  setNeoIndex({
                    ...value,
                    assignedNeoIndex: newIndex,
                    dataType: "content",
                  })
                }
              />
            </>
          )}
        </>
      )}
    </Styled.OrbitalSimWidgetContainer>
  );
};

export default OrbitalSimWidget;
