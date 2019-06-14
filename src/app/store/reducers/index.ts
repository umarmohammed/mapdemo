import * as fromLayers from './layers.reducer';
import * as fromRoutes from './routes.reducer';
import {
  createSelector,
  MetaReducer,
  ActionReducer,
  ActionReducerMap
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { toOlTileLayer, toLineVectorLayer } from 'src/app/util/layer-utils';

export interface State {
  layers: fromLayers.State;
  routes: fromRoutes.State;
}

export const reducers: ActionReducerMap<State> = {
  layers: fromLayers.reducer,
  routes: fromRoutes.reducer
};

export const selectLayers = createSelector(
  (state: State) => state.layers,
  state => (state ? state.layers : [])
);

export const selectOlTileLayers = createSelector(
  selectLayers,
  layers => (layers ? layers.map(layer => toOlTileLayer(layer)) : [])
);

export const selectLineVectorLayers = createSelector(
  (state: State) => state.routes,
  state =>
    state ? state.routes.map(route => toLineVectorLayer(route.stops)) : []
);

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['layers', 'routes'], rehydrate: true })(
    reducer
  );
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer
];
