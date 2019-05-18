import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HereLayer } from 'src/app/models/here-layer.model';
import {
  HereLayerAction,
  HereLayerActions,
  HereLayerActionType
} from 'src/app/store/actions';
import { AddHereLayerDialogComponent } from '../add-here-layer-dialog/add-here-layer-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-here-layer-manager',
  templateUrl: './here-layer-manager.component.html',
  styleUrls: ['./here-layer-manager.component.scss']
})
export class HereLayerManagerComponent implements OnInit, OnDestroy {
  @Output()
  toggleNav = new EventEmitter();

  @Output()
  layerEvent = new EventEmitter<HereLayerAction>();

  @Input()
  layers: HereLayer[];

  sub: Subscription;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  get actionTypes() {
    return HereLayerActions;
  }

  addLayer() {
    let dialogRef = this.dialog.open(AddHereLayerDialogComponent, {
      width: '600px'
    });

    this.sub = dialogRef.afterClosed().subscribe(layer => {
      if (layer)
        this.layerEvent.emit(
          new HereLayerAction(HereLayerActions.AddLayer, layer)
        );
    });
  }

  emitAction(layer: HereLayer, action: HereLayerActionType) {
    this.layerEvent.emit(new HereLayerAction(action, layer));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
