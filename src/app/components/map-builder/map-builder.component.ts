import { Component, OnInit } from '@angular/core';
import { LayerStore } from 'src/app/store/layer-store.service';

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.scss']
})
export class MapBuilderComponent implements OnInit {
  constructor(public store: LayerStore) {}

  ngOnInit() {}
}
