import { createReducer, on, Action } from '@ngrx/store';
import * as RouteColorActions from '../actions/route-colors.actions';
import * as MapStyleActions from '../actions/map-style.actions';
import { RouteColor } from 'src/app/models/route-color.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';

export interface State {
  routeColors: RouteColor[];
}

export const initialState: State = {
  routeColors: []
};

const colorsReducer = createReducer(
  initialState,
  on(RouteColorActions.addRouteColor, (state, { routeColor }) => ({
    ...state,
    routeColors: [...state.routeColors, routeColor]
  })),
  on(RouteColorActions.removeRouteColor, (state, { id }) => ({
    ...state,
    routeColors: state.routeColors.filter(c => c.id !== id)
  })),
  on(
    RouteColorActions.reorderRouteColors,
    (state, { previousIndex, currentIndex }) => {
      const routeColors = [...state.routeColors];
      moveItemInArray(routeColors, previousIndex, currentIndex);
      return { ...state, routeColors: [...routeColors] };
    }
  ),
  on(MapStyleActions.loadMapStyle, (state, { mapStyle }) => ({
    ...state,
    routeColors: mapStyle.routeColors
  }))
);

export function reducer(state: State, action: Action) {
  return colorsReducer(state, action);
}

export const getColor = (routeColors: RouteColor[], index: number): string =>
  routeColors.length
    ? routeColors[index % routeColors.length].hexValue
    : '#000';
