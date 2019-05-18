import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTileComponent } from '../add-tile/add-tile.component';
import { HereLayer } from 'src/app/models/here-layer.model';

@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.scss']
})
export class MapSettingsComponent implements OnInit {
  @Output()
  toggleNav = new EventEmitter();

  @Output()
  layerAdded = new EventEmitter<HereLayer>();

  @Input()
  layers: HereLayer[];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  addTile() {
    let dialogRef = this.dialog.open(AddTileComponent, {
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((layer: HereLayer) => {
      if (layer) {
        this.layerAdded.emit(layer);
      }
    });
  }
}
