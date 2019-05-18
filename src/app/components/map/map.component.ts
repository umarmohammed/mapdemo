import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import Map from 'ol/map';
import View from 'ol/View';
import { LayerService } from 'src/app/services/layer.service';
import { LayerStore } from 'src/app/services/layer-store.service';
import { HereLayer } from 'src/app/models/here-layer.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map;

  @Output()
  toggleNav = new EventEmitter();

  constructor(private layerService: LayerService, private store: LayerStore) {
    this.store.state$.subscribe(layers => {
      if (layers.length) {
        this.addTile(layers[layers.length - 1]);
      }
    });
  }

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      controls: [],
      view: new View({
        center: [20371.9389, 6858337.7609],
        zoom: 9
      })
    });
  }

  addTile(layer: HereLayer) {
    this.map.addLayer(this.layerService.createTileLayer(layer));
  }
}
