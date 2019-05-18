import { Injectable } from '@angular/core';
import { BaseMapTile } from '../models/base-map-tile.model';
import { baseMapTiles } from '../constants/base-map-tiles';
import { schemes } from '../constants/schemes';

@Injectable({ providedIn: 'root' })
export class TileOptionsService {
  get baseMapTiles(): BaseMapTile[] {
    return baseMapTiles;
  }

  get schemes(): string[] {
    return schemes;
  }
}
