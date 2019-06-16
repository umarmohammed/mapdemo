import { BaseMapTile } from './base-map-tile.model';

export interface HereTileLayer {
  id: string;
  scheme: string;
  tile: BaseMapTile;
  visible: boolean;
  opacity: number;
}
