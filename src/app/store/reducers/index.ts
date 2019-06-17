import * as fromLayers from './layers.reducer';
import * as fromScenarios from './scenarios.reducer';
import * as fromRouteColors from './route-colors.reducer';
import {
  createSelector,
  MetaReducer,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import {
  toOlTileLayer,
  toLineVectorLayer,
  toIconStyleLayer
} from 'src/app/util/layer-utils';
import { MapViewModel } from 'src/app/models/map-view.model';
import { Scenario } from 'src/app/models/scenario.model';
import { MapStyle } from 'src/app/models/map-style.model';
import { Vector } from 'ol/layer';

export interface State {
  layers: fromLayers.State;
  scenarios: fromScenarios.State;
  routeColors: fromRouteColors.State;
}

export const reducers: ActionReducerMap<State> = {
  layers: fromLayers.reducer,
  scenarios: fromScenarios.reducer,
  routeColors: fromRouteColors.reducer
};

export const getLayerState = createFeatureSelector<fromLayers.State>('layers');

export const getRouteColorsState = createFeatureSelector<fromRouteColors.State>(
  'routeColors'
);

export const getScenarioState = createFeatureSelector<fromScenarios.State>(
  'scenarios'
);

export const getLayers = createSelector(
  getLayerState,
  state => (state ? state.layers : [])
);

export const getRouteColors = createSelector(
  getRouteColorsState,
  state => (state ? state.routeColors : [])
);

export const getMapStyle = createSelector(
  getRouteColors,
  getLayers,
  (routeColors, layers): MapStyle => ({
    routeColors,
    layers
  })
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
  getRouteColors,
  (scenario, routeColors) =>
    scenario && scenario.routes
      ? scenario.routes.map((route, i) =>
          toLineVectorLayer(
            route.stops,
            fromRouteColors.getColor(routeColors, i)
          )
        )
      : []
);

export const getIconStyleLayers = createSelector(
  getSelectedScenario,
  (scenario): Vector =>
    scenario && scenario.jobs ? toIconStyleLayer(scenario.jobs) : null
);

export const getMapViewModel = createSelector(
  getOlTileLayers,
  getLineVectorLayers,
  getIconStyleLayers,
  (tiles, vectors, icons): MapViewModel => ({
    tiles,
    vectors,
    icons
  })
);

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['layers', 'scenarios', 'routeColors'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer
];
