import { BaseMapTile } from './base-map-tile.model';

export interface HereLayer {
  id: string;
  scheme: string;
  tile: BaseMapTile;
  visible: boolean;
  opacity: number;
}
