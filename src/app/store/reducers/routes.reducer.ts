import { createReducer, Action, on } from '@ngrx/store';
import * as RouteActions from '../actions/routes.actions';
import { Route } from 'src/app/models/route.model';

export interface State {
  routes: Route[];
}

export const initialState = {
  routes: []
};

const routesReducer = createReducer(
  initialState,
  on(RouteActions.loadRoutes, (state, { routes }) => ({ ...state, routes }))
);

export function reducer(state: State, action: Action) {
  return routesReducer(state, action);
}
