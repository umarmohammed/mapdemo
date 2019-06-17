import TileLayer from 'ol/layer/Tile';
import { Vector } from 'ol/layer';

export interface MapViewModel {
  tiles: TileLayer[];
  vectors: Vector[];
  icons: Vector;
}
