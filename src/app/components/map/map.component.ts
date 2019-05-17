import { Component, OnInit } from '@angular/core';

import Map from 'ol/map';
import View from 'ol/View';
import { LayerService } from 'src/app/services/layer.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map;

  constructor(private layerService: LayerService) {}

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        this.layerService.createTileLayer({
          scheme: 'normal.day',
          tile: 'basetile'
        })
      ],
      view: new View({
        center: [20371.9389, 6858337.7609],
        zoom: 9
      })
    });
  }

  addTile() {
    this.map.addLayer(
      this.layerService.createTileLayer({
        scheme: 'normal.day',
        tile: 'streettile'
      })
    );
  }
}
