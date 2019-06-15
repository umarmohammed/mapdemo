import * as fromLayers from './layers.reducer';
import * as fromScenarios from './scenarios.reducer';
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
import { Scenario } from 'src/app/models/scenario.model';

export interface State {
  layers: fromLayers.State;
  scenarios: fromScenarios.State;
}

export const reducers: ActionReducerMap<State> = {
  layers: fromLayers.reducer,
  scenarios: fromScenarios.reducer
};

export const getLayerState = createFeatureSelector<fromLayers.State>('layers');

export const getScenarioState = createFeatureSelector<fromScenarios.State>(
  'scenarios'
);

export const getLayers = createSelector(
  getLayerState,
  state => (state ? state.layers : [])
);

export const getOlTileLayers = createSelector(
  getLayers,
  layers => (layers ? layers.map(layer => toOlTileLayer(layer)) : [])
);

export const getScenarios = createSelector(
  getScenarioState,
  state => fromScenarios.getItems(state)
);

export const getSelectedScenarioName = createSelector(
  getScenarioState,
  state => state.selectedItemName
);

export const getSelectedScenario = createSelector(
  getScenarios,
  getSelectedScenarioName,
  (scenarios, selectedScenarioName) =>
    scenarios.find(scenario => scenario.name === selectedScenarioName) ||
    ({} as Scenario)
);

export const getLineVectorLayers = createSelector(
  getSelectedScenario,
  scenario =>
    scenario && scenario.routes
      ? scenario.routes.map(route => toLineVectorLayer(route.stops))
      : []
);

export const getMapViewModel = createSelector(
  getOlTileLayers,
  getLineVectorLayers,
  (tiles, vectors): MapViewModel => ({
    tiles,
    vectors
  })
);

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['layers', 'scenarios'], rehydrate: true })(
    reducer
  );
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer
];
