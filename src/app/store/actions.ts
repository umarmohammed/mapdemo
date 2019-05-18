import { HereLayer } from '../models/here-layer.model';

export enum LayerActions {
  AddLayer = 'Add Layer',
  RemoveLayer = 'Remove Layer'
}

export class LayerAction {
  constructor(public type: LayerActionType, public payload: HereLayer) {}
}

type LayerActionType = LayerActions.AddLayer | LayerActions.RemoveLayer;
