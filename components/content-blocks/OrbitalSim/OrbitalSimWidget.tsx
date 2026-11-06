"use client";

import type { WidgetInput } from "@/types/answers";

import { ComponentProps, FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
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
        showDetailsOnSelect
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

type OrbitalSimData = {
  orbits: ComponentProps<typeof OrbitalSimProvider>["orbitData"];
};

function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

const OrbitalSimWidget: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = ({ data, locale }) => {
  const [dataObj, setDataObj] = useState<OrbitalSimData | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isEducator, setIsEducator] = useState(false);
  const { t } = useTranslation();

  /**
   * Add typing for `orbitalSimTool, this may come from codegen type
   */
  const fragmentData = useFragment(Fragment, data);

  const orbitalSimTool =
    fragmentData.orbitalSimTool[0]?.__typename === "widgets_orbitalSim_Entry"
      ? fragmentData.orbitalSimTool[0]
      : null;

  const { answer: value, onChangeCallback: setNeoIndex } =
    useAnswer<WidgetInput>(orbitalSimTool?.id || "");

  const assignedNeoIndex = value?.assignedNeoIndex;

  const defaultZoom = orbitalSimTool?.defaultZoom;
  const addTimeControls = orbitalSimTool?.addTimeControls || undefined;
  const allowOrbitRotation = orbitalSimTool?.allowOrbitRotation || undefined;
  const showDetailsOnSelect = orbitalSimTool?.showDetailsOnSelect || false;
  const showDetailsTable = orbitalSimTool?.showDetailsTable || undefined;
  const swappableOrbits = orbitalSimTool?.containsSwappableOrbits || undefined;

  const orbitalSimData =
    orbitalSimTool?.orbitalDatasets?.[0]?.orbitalSimData[0];

  if (!url) {
    /**
     * to-do: use a helper like @/helpers/widgets::getDataset() to extract  the URL
     * or create a new one
     */
    setUrl(
      orbitalSimData?.__typename === "datasets_orbitalSimOrbits_Entry"
        ? orbitalSimData.json[0]?.url ?? ""
        : "",
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
    <WidgetContainerWithModal>
      <Styled.OrbitalSimWidgetContainer>
        {!dataObj ? (
          <Loader />
        ) : (
          <>
            <OrbitalSimProvider
              swappableOrbits={swappableOrbits}
              orbitData={dataObj.orbits}
              defaultZoom={defaultZoom ?? 0.5}
              showDetailsTable={showDetailsOnSelect || showDetailsTable}
              allowOrbitRotation={allowOrbitRotation}
              showTimeControls={addTimeControls}
              selectedNeoIndex={
                showDetailsTable ? assignedNeoIndex ?? 0 : undefined
              }
              showDetailsOnSelect={showDetailsOnSelect}
            >
              <OrbitalSim />
            </OrbitalSimProvider>
            {showDetailsTable && isEducator && (
              <>
                <p>{t("widgets.orbital_sim.instructor_neo_override_tip")}</p>
                <SelectListbox
                  value={assignedNeoIndex?.toString() ?? null}
                  options={
                    dataObj.orbits.neos?.map((neo, i) => ({
                      value: i.toString(),
                      label: neo.Principal_desig,
                    })) ?? []
                  }
                  onChangeCallback={(newIndex) => {
                    if (typeof newIndex !== "string") return;

                    setNeoIndex({
                      ...value,
                      assignedNeoIndex: Number(newIndex),
                      dataType: "content",
                    });
                  }}
                />
              </>
            )}
          </>
        )}
      </Styled.OrbitalSimWidgetContainer>
    </WidgetContainerWithModal>
  );
};

export default OrbitalSimWidget;
