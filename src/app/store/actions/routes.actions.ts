import { createAction, props } from '@ngrx/store';
import { Route } from 'src/app/models/route.model';

export const loadRoutes = createAction(
  '[Layer Manager] Load Routes',
  props<{ routes: Route[] }>()
);
