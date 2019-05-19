import { HereLayer } from '../models/here-layer.model';

export enum HereLayerActions {
  AddLayer = 'add',
  RemoveLayer = 'remove',
  UpdateLayer = 'update'
}

export interface HereLayerAction {
  type: HereLayerActionType;
  payload: HereLayer;
}

export type HereLayerActionType =
  | HereLayerActions.AddLayer
  | HereLayerActions.RemoveLayer
  | HereLayerActions.UpdateLayer;
