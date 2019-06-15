import * as fromLayers from './layers.reducer';
import * as fromRoutes from './routes.reducer';
import {
  createSelector,
  MetaReducer,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { toOlTileLayer, toLineVectorLayer } from 'src/app/util/layer-utils';
import { MapViewModel } from 'src/app/models/map-view.model';

export interface State {
  layers: fromLayers.State;
  routes: fromRoutes.State;
}

export const reducers: ActionReducerMap<State> = {
  layers: fromLayers.reducer,
  routes: fromRoutes.reducer
};

export const selectLayerState = createFeatureSelector<fromLayers.State>(
  'layers'
);

export const selectRouteState = createFeatureSelector<fromRoutes.State>(
  'routes'
);

export const selectLayers = createSelector(
  selectLayerState,
  state => (state ? state.layers : [])
);

export const selectOlTileLayers = createSelector(
  selectLayers,
  layers => (layers ? layers.map(layer => toOlTileLayer(layer)) : [])
);

export const selectLineVectorLayers = createSelector(
  selectRouteState,
  state =>
    state ? state.routes.map(route => toLineVectorLayer(route.stops)) : []
);

export const selectMapViewModel = createSelector(
  selectOlTileLayers,
  selectLineVectorLayers,
  (tiles, vectors): MapViewModel => ({
    tiles,
    vectors
  })
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
