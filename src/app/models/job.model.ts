export interface Job {
  latitude: number;
  longitude: number;
  stopType: StopType;
}

export enum StopType {
  Delivery,
  PickupDepot
}
