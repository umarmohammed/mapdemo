import { createAction, props } from '@ngrx/store';
import { MapStyle } from 'src/app/models/map-style.model';

export const loadMapStyle = createAction(
  '[Side Nav] Load Map Style',
  props<{ mapStyle: MapStyle }>()
);
