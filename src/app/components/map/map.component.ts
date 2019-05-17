import { Component, OnInit } from '@angular/core';

import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const hereLayers = [
      {
        base: 'base',
        type: 'maptile',
        scheme: 'normal.day',
        app_id: '174bSJVz4Udf1Wk4xmpG',
        app_code: 'CWHmug8fv75vYfUPHCqprA'
      }
    ];

    var urlTpl =
      'https://{1-4}.{base}.maps.cit.api.here.com' +
      '/{type}/2.1/maptile/newest/{scheme}/{z}/{x}/{y}/256/png' +
      '?app_id={app_id}&app_code={app_code}';

    var layers = [];
    var i, ii;
    for (i = 0, ii = hereLayers.length; i < ii; ++i) {
      var layerDesc = hereLayers[i];
      layers.push(
        new TileLayer({
          preload: Infinity,
          source: new XYZ({
            url: this.createUrl(urlTpl, layerDesc),
            attributions:
              'Map Tiles &copy; ' +
              new Date().getFullYear() +
              ' ' +
              '<a href="http://developer.here.com">HERE</a>'
          })
        })
      );
    }

    console.log(layers);

    const map = new Map({
      target: 'map',
      layers,
      view: new View({
        center: [20371.9389, 6858337.7609],
        zoom: 9
      })
    });
  }

  createUrl(tpl, layerDesc) {
    return tpl
      .replace('{base}', layerDesc.base)
      .replace('{type}', layerDesc.type)
      .replace('{scheme}', layerDesc.scheme)
      .replace('{app_id}', layerDesc.app_id)
      .replace('{app_code}', layerDesc.app_code);
  }
}
