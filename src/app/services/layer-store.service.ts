import { HereLayer } from '../models/here-layer.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayerStore {
  private store: BehaviorSubject<HereLayer[]> = new BehaviorSubject([]);

  get state$() {
    return this.store.asObservable();
  }

  addLayer(layer: HereLayer) {
    this.store.next([...this.store.value, layer]);
  }
}
