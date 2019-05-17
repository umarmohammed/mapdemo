import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { HereLayer } from '../models/here-layer.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LayerService {
  createTileLayer(hereLayer: HereLayer): TileLayer {
    return new TileLayer({
      preload: Infinity,
      source: new XYZ({
        url: this.createUrl(hereLayer),
        attributions:
          'Map Tiles &copy; ' +
          new Date().getFullYear() +
          ' ' +
          '<a href="http://developer.here.com">HERE</a>'
      })
    });
  }

  private createUrl(hereLayer: HereLayer) {
    return `https://{1-4}.base.maps.cit.api.here.com/maptile/2.1/${
      hereLayer.tile
    }/newest/${hereLayer.scheme}/{z}/{x}/{y}/256/png?app_id=${
      environment.hereCredentials.app_id
    }&app_code=${environment.hereCredentials.app_code}`;
  }
}