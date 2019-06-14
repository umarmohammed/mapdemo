import { Injectable } from '@angular/core';

import { BaseMapTile } from '../models/base-map-tile.model';

import { schemes, baseMapTiles } from '../constants';

@Injectable({ providedIn: 'root' })
export class LayerOptions {
  get baseMapTiles(): BaseMapTile[] {
    return baseMapTiles;
  }

  get schemes(): string[] {
    return schemes;
  }
}
