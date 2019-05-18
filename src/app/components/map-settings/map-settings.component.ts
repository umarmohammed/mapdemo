import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTileComponent } from '../add-tile/add-tile.component';
import { HereLayer } from 'src/app/models/here-layer.model';
import { LayerAction, LayerActions } from 'src/app/store/actions';
import { layer } from 'openlayers';

@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.scss']
})
export class MapSettingsComponent implements OnInit {
  @Output()
  toggleNav = new EventEmitter();

  @Output()
  layerEvent = new EventEmitter<LayerAction>();

  @Input()
  layers: HereLayer[];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  addTile() {
    let dialogRef = this.dialog.open(AddTileComponent, {
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(layer => {
      if (layer)
        this.layerEvent.emit(new LayerAction(LayerActions.AddLayer, layer));
    });
  }

  removeTile(layer: HereLayer) {
    this.layerEvent.emit(new LayerAction(LayerActions.RemoveLayer, layer));
  }
}
