import { FunctionComponent, use } from "react";
import { OrbitalSimProvider, OrbitalSim } from "@rubin-epo/epo-widget-lib/OrbitalSim";
import { BaseContentBlockProps } from "@/components/shapes";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Styled from "./styles";

/**
 * to-do: add other widget fields to this GQL query and parse them in the component
 *        function
 */
const Fragment = graphql(`
  fragment OrbitalSimWidget on contentBlocks_orbitalSimWidget_BlockType {
    __typename
    orbitalSimTool {
        ... on widgets_orbitalSim_Entry {
        addTimeControls
        allowOrbitRotation
        showDetailsTable
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

const OrbitalSimWidget: FunctionComponent<BaseContentBlockProps<FragmentType<typeof Fragment>>> = ({ data, locale }) => {

    /**
     * Add typing for `orbitalSimTool, this may come from codegen type
     */
    const { orbitalSimTool } = useFragment(Fragment, data);
    console.log("orbitalSimTool: ", orbitalSimTool);

    /**
     * to-do: use a helper like @/helpers/widgets::getDataset() to extract the URL
     *        or create a new one
     */
    const url = orbitalSimTool[0]?.orbitalDatasets[0]?.orbitalSimData[0]?.json[0]?.url;
    const addTimeControls = orbitalSimTool[0]?.addTimeControls;
    const allowOrbitRotation = orbitalSimTool[0]?.allowOrbitRotation;
    const showDetailsTable = orbitalSimTool[0]?.showDetailsTable;

    const dataObj = use(getOrbitalData(url));

    /**
     * to-do: flesh out styling for `OrbitalSimWidgetContainer`
     */
    return (
        <Styled.OrbitalSimWidgetContainer>
            <OrbitalSimProvider orbitData={ dataObj } showDetailsTable={showDetailsTable} allowOrbitRotation={allowOrbitRotation} showTimeControls={addTimeControls}>
                <OrbitalSim/>
            </OrbitalSimProvider>
        </Styled.OrbitalSimWidgetContainer>
    )
}

/**
 * to-do: use `fetcher` from `/lib/api` instead
 */
async function getOrbitalData(url:string) {

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("A fetch error occurred!");
    }
    const dataObj = await response.json();
    return dataObj;
}

export default OrbitalSimWidget;