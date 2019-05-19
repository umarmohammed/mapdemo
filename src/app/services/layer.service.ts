import { Injectable } from '@angular/core';

import { HereLayer } from '../models/here-layer.model';
import { environment } from 'src/environments/environment';
import { BaseMapTile } from '../models/base-map-tile.model';

import { schemes, points, baseMapTiles } from '../constants';

import TileLayer from 'ol/layer/Tile';
import Layer from 'ol/layer/Vector';
import Source from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import LineString from 'ol/geom/LineString';

@Injectable({ providedIn: 'root' })
export class LayerService {
  createOlTileLayer(hereLayer: HereLayer): TileLayer {
    return new TileLayer({
      preload: Infinity,
      source: new XYZ({
        url: this.createUrl(hereLayer),
        attributions:
          'Map Tiles &copy; ' +
          new Date().getFullYear() +
          ' ' +
          '<a href="http://developer.here.com">HERE</a>'
      }),
      visible: hereLayer.visible,
      opacity: hereLayer.opacity / 100
    });
  }

  get baseMapTiles(): BaseMapTile[] {
    return baseMapTiles;
  }

  get schemes(): string[] {
    return schemes;
  }

  get lineVectorLayer() {
    const coordinates = points.map(point => fromLonLat([point[0], point[1]]));

    return new Layer({
      source: new Source({
        features: [
          new Feature({
            geometry: new LineString(coordinates)
          })
        ]
      }),
      style: [
        new Style({
          stroke: new Stroke({
            width: 3,
            lineDash: [4, 8],
            color: 'rgba(0, 0, 255, 1)'
          }),
          zIndex: 2
        })
      ]
    });
  }

  private createUrl(hereLayer: HereLayer) {
    return `https://{1-4}.base.maps.cit.api.here.com/maptile/2.1/${
      hereLayer.tile.key
    }/newest/${hereLayer.scheme}/{z}/{x}/{y}/256/png?app_id=${
      environment.hereCredentials.app_id
    }&app_code=${environment.hereCredentials.app_code}`;
  }
}
