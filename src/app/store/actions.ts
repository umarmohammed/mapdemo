import { HereLayer } from '../models/here-layer.model';

export enum HereLayerCrudActions {
  AddLayer = 'add',
  RemoveLayer = 'remove',
  UpdateLayer = 'update'
}

export enum HereLayerListActions {
  Reorder = 'reorder'
}

export interface HereLayerCrudAction {
  type: HereLayerCrudActions;
  payload: HereLayer;
}

export class HereLayerListAction {
  readonly type = HereLayerListActions.Reorder;
  constructor(public payload: HereLayer[]) {}
}

export type HereLayerActionType = HereLayerCrudAction | HereLayerListAction;
