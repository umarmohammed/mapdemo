import { HereLayer } from '../models/here-layer.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HereLayerAction, HereLayerActions } from './actions';

@Injectable({ providedIn: 'root' })
export class Store {
  private store: BehaviorSubject<HereLayer[]> = new BehaviorSubject([]);

  get state$() {
    return this.store.asObservable();
  }

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
        const updatedState = state.filter(layer => layer !== action.payload);
        return [...updatedState];
      }

      case HereLayerActions.ToggleVisibility: {
        const updatedState = state.map(layer => {
          if (layer === action.payload) {
            console.log('toggle ', layer);
            console.log('not ', !layer.visible);
            return {
              ...action.payload,
              visible: !layer.visible
            };
          }

          return layer;
        });

        console.log(updatedState);
        return [...updatedState];
      }

      default:
        return state;
    }
  }
}
