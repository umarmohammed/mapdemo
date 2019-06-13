import * as fromLayers from './layers.reducer';
import {
  createSelector,
  createFeatureSelector,
  MetaReducer,
  ActionReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

const selectLayersState = createFeatureSelector('layers');

export const selectLayers = createSelector(
  selectLayersState,
  (state: fromLayers.State) => (state ? state.layers : [])
);

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['layers'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer
];

export { reducer, State } from './layers.reducer';
