import { createAction, Action, props } from '@ngrx/store';
import { HereLayer } from 'src/app/models/here-layer.model';

export const addLayer = createAction(
  '[Layer Manager] add layer',
  props<{ layer: HereLayer }>()
);

export const removeLayer = createAction(
  '[Layer Manager] remove layer',
  props<{ layer: HereLayer }>()
);

export const updateLayer = createAction(
  '[Layer Manager] update layer',
  props<{ layer: HereLayer }>()
);

export const reorderLayers = createAction(
  '[Layer Manager] reorder layers',
  props<{ previousIndex: number; currentIndex: number }>()
);
