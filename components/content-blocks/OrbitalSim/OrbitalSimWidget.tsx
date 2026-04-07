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
    orbitalSimTool {
        ... on widgets_orbitalSim_Entry {
        orbitalDatasets {
            ... on orbitalDatasets_orbital_BlockType {
                orbitalSimData {
                title
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

    /**
     * to-do: look at how the other widgets are parsing the GQL response do likewise so
     *        we don't have to daisy-chain in this messy way
     */
    const url = orbitalSimTool[0]?.orbitalDatasets[0]?.orbitalSimData[0]?.json[0]?.url;
    const dataObj = use(getOrbitalData(url));

    /**
     * to-do: flesh out styling for `OrbitalSimWidgetContainer`
     */
    return (
        <Styled.OrbitalSimWidgetContainer>
            <OrbitalSimProvider orbitData={ dataObj }>
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