import { HereTileLayer } from 'src/app/models/here-tile-layer.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as LayerActions from '../actions/layers.actions';
import { moveItemInArray } from '@angular/cdk/drag-drop';

export interface State {
  layers: HereTileLayer[];
}

export const initialState: State = { layers: [] };

const layerReducer = createReducer(
  initialState,
  on(LayerActions.addLayer, (state, { layer }) => {
    const layers = [...state.layers, layer];
    return { ...state, layers };
  }),
  on(LayerActions.removeLayer, (state, { layer }) => {
    const layers = state.layers.filter(l => l.id !== layer.id);
    return { ...state, layers };
  }),
  on(LayerActions.updateLayer, (state, { layer }) => {
    const layers = state.layers.map(l => (l.id === layer.id ? layer : l));
    return { ...state, layers };
  }),
  on(LayerActions.reorderLayers, (state, { previousIndex, currentIndex }) => {
    const layers = [...state.layers];
    moveItemInArray(layers, previousIndex, currentIndex);
    return { ...state, layers: [...layers] };
  }),
  on(LayerActions.loadLayers, (state, { layers }) => ({
    ...state,
    layers
  }))
);

export function reducer(state: State, action: Action) {
  return layerReducer(state, action);
}
