import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { Map, View } from 'ol';
import { Subscription } from 'rxjs';

import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import TileLayer from 'ol/layer/Tile';
import { Vector } from 'ol/layer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  map: Map;
  sub: Subscription;

  @Output()
  toggleNav = new EventEmitter();

  tileLayers = [];
  lineVectorLayers = [];

  constructor(private store$: Store<fromStore.State>) {}

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      controls: [],
      view: new View({
        center: [20371.9389, 6858337.7609],
        zoom: 9
      })
    });

    this.sub = this.store$
      .pipe(select(fromStore.selectOlTileLayers))
      .subscribe(layers => this.updateLayers(layers, this.lineVectorLayers));

    this.store$
      .pipe(select(fromStore.selectLineVectorLayers))
      .subscribe(routes => this.updateLayers(this.tileLayers, routes));
  }

  updateLayers(layers: TileLayer[], lineVectorLayers: Vector[]) {
    if (this.map) {
      this.tileLayers.forEach(layer => this.map.removeLayer(layer));
      this.tileLayers = [];

      layers.forEach(layer => this.tileLayers.push(layer));
      this.tileLayers.forEach(layer => this.map.addLayer(layer));

      this.lineVectorLayers.forEach(layer => this.map.removeLayer(layer));
      this.lineVectorLayers = [];

      lineVectorLayers.forEach(layer => this.lineVectorLayers.push(layer));
      this.lineVectorLayers.forEach(layer => this.map.addLayer(layer));
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
