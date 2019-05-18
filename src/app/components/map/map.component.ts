import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import Map from 'ol/map';
import View from 'ol/View';
import { LayerService } from 'src/app/services/layer.service';
import { Store } from 'src/app/store/store';
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

  mapLayers: any[] = [];

  constructor(private layerService: LayerService, private store: Store) {
    this.store.state$.subscribe(layers => this.updateLayers(layers));
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

  updateLayers(layers: HereLayer[]) {
    if (this.map) {
      this.mapLayers.forEach(layer => this.map.removeLayer(layer));
      this.mapLayers = [];

      layers.map(layer =>
        this.mapLayers.push(this.layerService.createOlTileLayer(layer))
      );
      this.mapLayers.forEach(layer => this.map.addLayer(layer));
      this.map.render();
    }
  }
}
