"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { WidgetQuestion } from "..";
import { useTranslation } from "react-i18next";
// to-do: get this working at full width
// import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import { OrbitalSimProvider, OrbitalSim } from "@rubin-epo/epo-widget-lib/OrbitalSim";
import Loader from "@/components/page/Loader";
import * as OrbitalSimStyled from "@/components/content-blocks/OrbitalSim/styles";

const Fragment = graphql(`
  fragment OrbitalSimQuestion on questionWidgetsBlock_orbitalSimBlock_BlockType {
    orbitalSimTool {
        ... on widgets_orbitalSim_Entry {
            addTimeControls
            allowOrbitRotation
            showDetailsTable
            orbitalDatasets {
                ... on orbitalDatasets_orbital_BlockType{
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

/**
 * to-do: pass callback that will set selected answer
 */
const OrbitalSimQuestion: FunctionComponent<
  WidgetQuestion<FragmentType<typeof Fragment>>
> = ({ data, instructions, value = {}, onChangeCallback }) => {
  const [dataObj, setDataObj] = useState(null);
  const [url, setUrl] = useState<string>("");

  /**
   * to-do: this could use a second look, `use()` wasn't working and this
   *        was the alternative that worked, but there may be better solutions
   */
  useEffect(() => {
    async function getOrbitalData(url:string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching the JSON dataset for the Orbital Sim!");
        }
        const res = await response.json();
        setDataObj(res);
    }
    if (dataObj === null) {
      getOrbitalData(url);
    }
  }, [url, dataObj]);

  /**
   * to-do: uncomment this when the <WidgetContainerWithModal> styling
   *        has been added so we can translate the title
   */
  const { t } = useTranslation();
  const { orbitalSimTool } = useFragment(Fragment, data);
  const addTimeControls = orbitalSimTool[0]?.addTimeControls;
  const allowOrbitRotation = orbitalSimTool[0]?.allowOrbitRotation;
  const showDetailsTable = orbitalSimTool[0]?.showDetailsTable;

  if (url === "") {
    /**
     * to-do: use a helper like @/helpers/widgets::getDataset() to extract the URL
     *        or create a new one
     */
    setUrl(orbitalSimTool[0]?.orbitalDatasets[0]?.orbitalSimData[0]?.json[0]?.url);
  }

  /**
   * to-do: Figure out the <WidgetContainerWithModal> styling
   */
  return (
    <>
    {/* <WidgetContainerWithModal
      title={t("widgets.orbital_sim.title")}
      instructions={instructions}
    > */}
      {dataObj === null ? (
        <Loader />
      ) : (
        <OrbitalSimStyled.OrbitalSimWidgetContainer>
            <OrbitalSimProvider orbitData={ dataObj } showDetailsTable={showDetailsTable} allowOrbitRotation={allowOrbitRotation} showTimeControls={addTimeControls}>
                <OrbitalSim/>
            </OrbitalSimProvider>
        </OrbitalSimStyled.OrbitalSimWidgetContainer>

       ) }
    {/* </WidgetContainerWithModal> */}
    </>
  );
};

OrbitalSimQuestion.displayName = "Questions.Widget.OrbitalSimQuestion";

export default OrbitalSimQuestion;