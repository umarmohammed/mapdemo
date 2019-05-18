import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HereLayer } from 'src/app/models/here-layer.model';
import {
  HereLayerAction,
  HereLayerActions,
  HereLayerActionType
} from 'src/app/store/actions';
import { AddHereLayerDialogComponent } from '../add-here-layer-dialog/add-here-layer-dialog.component';

@Component({
  selector: 'app-here-layer-manager',
  templateUrl: './here-layer-manager.component.html',
  styleUrls: ['./here-layer-manager.component.scss']
})
export class HereLayerManagerComponent implements OnInit {
  @Output()
  toggleNav = new EventEmitter();

  @Output()
  layerEvent = new EventEmitter<HereLayerAction>();

  @Input()
  layers: HereLayer[];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  get actionTypes() {
    return HereLayerActions;
  }

  addLayer() {
    let dialogRef = this.dialog.open(AddHereLayerDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(layer => {
      if (layer)
        this.layerEvent.emit(
          new HereLayerAction(HereLayerActions.AddLayer, layer)
        );
    });
  }

  emitAction(layer: HereLayer, action: HereLayerActionType) {
    this.layerEvent.emit(new HereLayerAction(action, layer));
  }
}
