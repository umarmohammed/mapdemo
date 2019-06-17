import { createAction, props } from '@ngrx/store';
import { RouteColor } from 'src/app/models/route-color.model';

export const addRouteColor = createAction(
  '[Color Editor] Add Route Color',
  props<{ routeColor: RouteColor }>()
);

export const removeRouteColor = createAction(
  '[Color Editor] Remove Route Color',
  props<{ id: string }>()
);

export const reorderRouteColors = createAction(
  '[Color Editor] Reorder Route Colors',
  props<{ previousIndex: number; currentIndex: number }>()
);
