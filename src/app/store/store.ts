import { HereLayer } from '../models/here-layer.model';
import { pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import {
  HereLayerActionType,
  HereLayerCrudActions,
  HereLayerListActions
} from './actions';
import { State } from './state';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Store {
  constructor() {}

  private store: BehaviorSubject<HereLayer[]> = new BehaviorSubject([]);

  layers$ = this.store.asObservable();

  dispatch(action: HereLayerActionType) {
    const state = this.reduce(this.store.value, action);
    this.store.next(state);
  }

  private reduce(state: HereLayer[], action: HereLayerActionType): HereLayer[] {
    switch (action.type) {
      case HereLayerCrudActions.AddLayer: {
        return [...state, action.payload];
      }
      case HereLayerCrudActions.RemoveLayer: {
        const updatedState = state.filter(
          layer => layer.id !== action.payload.id
        );
        return [...updatedState];
      }

      case HereLayerCrudActions.UpdateLayer: {
        const updatedState = state.map(layer =>
          layer.id === action.payload.id ? action.payload : layer
        );

        return [...updatedState];
      }

      case HereLayerListActions.Reorder: {
        return [...action.payload];
      }

      default:
        return state;
    }
  }
}
