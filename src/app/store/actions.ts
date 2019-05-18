import { HereLayer } from '../models/here-layer.model';

export enum HereLayerActions {
  AddLayer = 'Add Layer',
  RemoveLayer = 'Remove Layer',
  ToggleVisibility = 'Toggle Visibility'
}

export class HereLayerAction {
  constructor(public type: HereLayerActionType, public payload: HereLayer) {}
}

export type HereLayerActionType =
  | HereLayerActions.AddLayer
  | HereLayerActions.RemoveLayer
  | HereLayerActions.ToggleVisibility;
