export interface LightCurveData {
  datasetId?: string;
  gaussianWidth?: number;
  yOffset?: number;
  userMagnitude?: number;
}

export interface SourceSelectorData {
  selectedSource: Array<string>;
}

export interface IsochronePlotData {
  datasetId?: string;
  age?: number;
  distance?: number;
}
