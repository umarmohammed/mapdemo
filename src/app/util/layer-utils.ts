import { Feature } from 'ol';
import * as layer from 'ol/layer';
import * as source from 'ol/source';
import * as style from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Stroke, Style } from 'ol/style';
import { LineString, Point } from 'ol/geom';
import { Stop } from '../models/stops.model';
import { HereTileLayer } from '../models/here-tile-layer.model';
import { environment } from 'src/environments/environment';
import { Job } from '../models/job.model';

export function toOlTileLayer(hereLayer: HereTileLayer): layer.Tile {
  return new layer.Tile({
    preload: Infinity,
    source: new source.XYZ({
      url: createUrl(hereLayer),
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

export function toLineVectorLayer(stops: Stop[], color: string) {
  const coordinates = stops.map(stop =>
    fromLonLat([stop.longitude, stop.latitude])
  );

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
          color
        }),
        zIndex: 2
      })
    ]
  });
}

export function toIconStyleLayer(jobs: Job[], svg: string) {
  const features = jobs.map(
    job =>
      new Feature({
        geometry: new Point(fromLonLat([job.longitude, job.latitude]))
      })
  );

  return new layer.Vector({
    source: new source.Vector({
      features
    }),
    style: [
      new Style({
        image: new style.Icon({
          opacity: 1,
          src: 'data:image/svg+xml;utf8,' + svg,
          scale: 0.3
        })
      })
    ]
  });
}

function createUrl(hereLayer: HereTileLayer) {
  return `https://{1-4}.base.maps.cit.api.here.com/maptile/2.1/${
    hereLayer.tile.key
  }/newest/${hereLayer.scheme}/{z}/{x}/{y}/256/png?app_id=${
    environment.hereCredentials.app_id
  }&app_code=${environment.hereCredentials.app_code}`;
}
