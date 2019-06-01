import { Injectable } from '@angular/core';
import { HereLayer } from '../models/here-layer.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private layersKey = 'layers';

  get layers(): HereLayer[] {
    const layersString = localStorage.getItem(this.layersKey);
    return layersString ? JSON.parse(layersString) : [];
  }

  set layers(layers: HereLayer[]) {
    localStorage.setItem(this.layersKey, JSON.stringify(layers));
  }
}
