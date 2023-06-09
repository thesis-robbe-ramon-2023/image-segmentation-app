export class ParameterSet {
  constructor(
    public edgeIndicator: EdgeIndicator,
    public inner_iterations: number,
    public outer_iterations: number,
    public alpha: number,
    public lmbda: number,
    public sigma:number
    ) {
  }
}

export enum EdgeIndicator {
  SCALAR_DIFFERENCE,
  GEODESIC_DISTANCE,
  EUCLIDEAN_DISTANCE
}