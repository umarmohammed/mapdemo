import { HereLayer } from '../models/here-layer.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HereLayerAction, HereLayerActions } from './actions';

@Injectable({ providedIn: 'root' })
export class Store {
  private store: BehaviorSubject<HereLayer[]> = new BehaviorSubject([]);

  state$ = this.store.asObservable();

  dispatch(action: HereLayerAction) {
    const state = this.reduce(this.store.value, action);

    this.store.next(state);
  }

  private reduce(state: HereLayer[], action: HereLayerAction): HereLayer[] {
    switch (action.type) {
      case HereLayerActions.AddLayer: {
        return [...state, action.payload];
      }
      case HereLayerActions.RemoveLayer: {
        const updatedState = state.filter(
          layer => layer.id !== action.payload.id
        );
        return [...updatedState];
      }

      case HereLayerActions.UpdateLayer: {
        const updatedState = state.map(layer =>
          layer.id === action.payload.id ? action.payload : layer
        );

        return [...updatedState];
      }

      default:
        return state;
    }
  }
}
