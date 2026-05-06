"use client";
import type { FunctionComponent } from "react";
import type { WidgetReviewProps } from "..";
import { useState, useEffect } from "react";
import {
  OrbitalSimProvider,
  OrbitalSim,
} from "@rubin-epo/epo-widget-lib/OrbitalSim";
import * as OrbitalSimStyled from "@/components/content-blocks/OrbitalSim/styles";

const OrbitalSimReview: FunctionComponent<WidgetReviewProps> = ({
  data,
  value,
}) => {
  const [dataObj, setDataObj] = useState(null);

  const url =
    data.orbitalSimTool[0]?.orbitalDatasets[0]?.orbitalSimData[0]?.json[0]
      ?.url || "";

  /**
   * to-do: this could use a second look
   * Like in the components/questions/Widget/OrbitalSim/index.tsx
   * component this is what worked but their might be a better way
   * to get this data than a useEffect.
   */
  useEffect(() => {
    async function getOrbitalData(url: string) {
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

  /* return <p>Placeholder!</p> */

  return (
    <OrbitalSimStyled.OrbitalSimWidgetContainer>
      <OrbitalSimProvider
        swappableOrbits={false}
        orbitData={dataObj?.orbits || {}}
        showDetailsTable={false}
        allowOrbitRotation={false}
        showTimeControls={false}
        selectedAnswer={value.selectedObservation}
        updateSelectedAnswer={() => null}>
        <OrbitalSim />
      </OrbitalSimProvider>
    </OrbitalSimStyled.OrbitalSimWidgetContainer>
  );
};

OrbitalSimReview.displayName = "Review.Widget.OrbitalSim";

export default OrbitalSimReview;
