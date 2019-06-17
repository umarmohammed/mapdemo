import { createAction, props } from '@ngrx/store';
import { HereTileLayer } from 'src/app/models/here-tile-layer.model';

export const addLayer = createAction(
  '[Layer Manager] add layer',
  props<{ layer: HereTileLayer }>()
);

export const removeLayer = createAction(
  '[Layer Manager] remove layer',
  props<{ layer: HereTileLayer }>()
);

export const updateLayer = createAction(
  '[Layer Manager] update layer',
  props<{ layer: HereTileLayer }>()
);

export const reorderLayers = createAction(
  '[Layer Manager] reorder layers',
  props<{ previousIndex: number; currentIndex: number }>()
);
