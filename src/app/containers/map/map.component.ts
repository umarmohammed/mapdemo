import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { Map, View } from 'ol';
import { LayerService } from 'src/app/services/layer.service';
import { HereLayer } from 'src/app/models/here-layer.model';
import { Subscription } from 'rxjs';

import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';

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

  mapLayers: any[] = []; // temp hack to get map deleting to work

  constructor(
    private layerService: LayerService,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      controls: [],
      view: new View({
        center: [20371.9389, 6858337.7609],
        zoom: 9
      })
    });

    this.store
      .pipe(select(fromStore.selectLayers))
      .subscribe(layers => this.updateLayers(layers));
  }

  updateLayers(layers: HereLayer[]) {
    if (this.map) {
      this.mapLayers.forEach(layer => this.map.removeLayer(layer));
      this.mapLayers = [];

      layers.map(layer =>
        this.mapLayers.push(this.layerService.createOlTileLayer(layer))
      );
      this.mapLayers.push(this.layerService.lineVectorLayer);
      this.mapLayers.forEach(layer => this.map.addLayer(layer));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
