import { HereLayer } from '../models/here-layer.model';
import { pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import {
  HereLayerActionType,
  HereLayerCrudActions,
  HereLayerListActions
} from './actions';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class Store {
  private stateDoc = this.afs.doc<State>('states/demo');

  constructor(private afs: AngularFirestore) {}

  layers$ = this.stateDoc
    .valueChanges()
    .pipe(pluck<State, HereLayer[]>('layers'));

  dispatch(action: HereLayerActionType) {
    this.stateDoc
      .get()
      .toPromise()
      .then(value => {
        if (value.exists) {
          const layersInDb = (value.data() as State).layers;
          const layers = this.reduce(layersInDb, action);
          this.stateDoc.set({ layers });
        }
      });
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
