import { createReducer, on, Action } from '@ngrx/store';
import * as StopIconActions from '../actions/stop-icons.actions';
import * as MapStyleActions from '../actions/map-style.actions';

export interface State {
  svg: string;
}

export const initialState: State = {
  svg: ''
};

const stopIconReducer = createReducer(
  initialState,
  on(StopIconActions.loadStopIcon, (state, { svg }) => ({
    ...state,
    svg
  })),
  on(MapStyleActions.loadMapStyle, (state, { mapStyle }) => ({
    ...state,
    svg: mapStyle.icons
  }))
);

export function reducer(state: State, action: Action) {
  return stopIconReducer(state, action);
}
