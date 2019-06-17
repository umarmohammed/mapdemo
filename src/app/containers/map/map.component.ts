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
import { MapViewModel } from 'src/app/models/map-view.model';
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
  iconLayer: Vector;

  constructor(private store$: Store<fromStore.State>) {}

  ngOnInit() {
    this.initialiseMap();

    this.sub = this.store$
      .pipe(select(fromStore.getMapViewModel))
      .subscribe(vm => this.updateLayers(vm));
  }

  private initialiseMap() {
    this.map = new Map({
      target: 'map',
      controls: [],
      view: new View({
        center: [20371.9389, 6858337.7609],
        zoom: 9
      })
    });
  }

  // Unable to refactor this. When I do
  // the map refuses to remove the last TileLayer.
  // Not spending anymore time on this for now.
  // Anyone reading this is welcome to try.
  private updateLayers(vm: MapViewModel) {
    if (this.map) {
      this.tileLayers.forEach(layer => this.map.removeLayer(layer));
      this.tileLayers = [];

      vm.tiles.forEach(layer => this.tileLayers.push(layer));
      this.tileLayers.forEach(layer => this.map.addLayer(layer));

      this.lineVectorLayers.forEach(layer => this.map.removeLayer(layer));
      this.lineVectorLayers = [];

      vm.vectors.forEach(layer => this.lineVectorLayers.push(layer));
      this.lineVectorLayers.forEach(layer => this.map.addLayer(layer));

      if (this.iconLayer) {
        this.map.removeLayer(this.iconLayer);
        this.iconLayer = null;
      }

      if (vm.icons) {
        this.iconLayer = vm.icons;
        this.map.addLayer(vm.icons);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
