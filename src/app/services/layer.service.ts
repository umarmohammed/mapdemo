import { Injectable } from '@angular/core';

import { HereLayer } from '../models/here-layer.model';
import { environment } from 'src/environments/environment';
import { BaseMapTile } from '../models/base-map-tile.model';

import { schemes, points, baseMapTiles } from '../constants';

import { Feature } from 'ol';
import * as layer from 'ol/layer';
import * as source from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Stroke, Style } from 'ol/style';
import { LineString } from 'ol/geom';

@Injectable({ providedIn: 'root' })
export class LayerService {
  createOlTileLayer(hereLayer: HereLayer): layer.Tile {
    return new layer.Tile({
      preload: Infinity,
      source: new source.XYZ({
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

    return new layer.Vector({
      source: new source.Vector({
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
