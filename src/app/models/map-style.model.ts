import { HereTileLayer } from './here-tile-layer.model';
import { RouteColor } from './route-color.model';

export interface MapStyle {
  layers: HereTileLayer[];
  routeColors: RouteColor[];
  icons: string;
}
