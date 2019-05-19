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
import { HereLayerAction, HereLayerActions } from 'src/app/store/actions';
import { AddHereLayerDialogComponent } from '../add-here-layer-dialog/add-here-layer-dialog.component';
import { Subscription } from 'rxjs';
import { LayerService } from 'src/app/services/layer.service';

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

  constructor(public dialog: MatDialog, public options: LayerService) {}

  ngOnInit() {}

  addLayer() {
    let dialogRef = this.dialog.open(AddHereLayerDialogComponent, {
      width: '600px'
    });

    this.sub = dialogRef.afterClosed().subscribe(payload => {
      if (payload) {
        this.layerEvent.emit({ payload, type: HereLayerActions.AddLayer });
      }
    });
  }

  removeLayer(payload: HereLayer) {
    this.layerEvent.emit({ payload, type: HereLayerActions.RemoveLayer });
  }

  updateLayer(layer: HereLayer, property: string, value: any) {
    const payload = {
      ...layer,
      [property]: value
    };

    this.layerEvent.emit({ payload, type: HereLayerActions.UpdateLayer });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
