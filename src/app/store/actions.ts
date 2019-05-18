import { HereLayer } from '../models/here-layer.model';

export enum HereLayerActions {
  AddLayer = 'Add Layer',
  RemoveLayer = 'Remove Layer'
}

export class HereLayerAction {
  constructor(public type: HereLayerActionType, public payload: HereLayer) {}
}

type HereLayerActionType =
  | HereLayerActions.AddLayer
  | HereLayerActions.RemoveLayer;
