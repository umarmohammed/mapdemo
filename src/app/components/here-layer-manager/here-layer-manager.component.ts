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
  HereLayerActionType,
  HereLayerCrudActions,
  HereLayerListActions
} from 'src/app/store/actions';
import { AddHereLayerDialogComponent } from '../add-here-layer-dialog/add-here-layer-dialog.component';
import { Subscription } from 'rxjs';
import { LayerService } from 'src/app/services/layer.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-here-layer-manager',
  templateUrl: './here-layer-manager.component.html',
  styleUrls: ['./here-layer-manager.component.scss']
})
export class HereLayerManagerComponent implements OnInit, OnDestroy {
  @Output()
  toggleNav = new EventEmitter();

  @Output()
  layerEvent = new EventEmitter<HereLayerActionType>();

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
        this.layerEvent.emit({ payload, type: HereLayerCrudActions.AddLayer });
      }
    });
  }

  removeLayer(payload: HereLayer) {
    this.layerEvent.emit({ payload, type: HereLayerCrudActions.RemoveLayer });
  }

  updateLayer(layer: HereLayer, property: string, value: any) {
    const payload = {
      ...layer,
      [property]: value
    };

    this.layerEvent.emit({ payload, type: HereLayerCrudActions.UpdateLayer });
  }

  reorderLayers(event: CdkDragDrop<HereLayer[]>) {
    const payload = [...this.layers];
    moveItemInArray(payload, event.previousIndex, event.currentIndex);
    this.layerEvent.emit({ payload, type: HereLayerListActions.Reorder });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
