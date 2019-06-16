import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { AddHereLayerDialogComponent } from 'src/app/components';
import { HereTileLayer } from 'src/app/models/here-tile-layer.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as fromStore from '../../store';
import { Subscription } from 'rxjs';
import { LayerOptions } from 'src/app/services/layer-options.service';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.scss']
})
export class LayerEditorComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  layers$ = this.store.pipe(select(fromStore.getLayers));

  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.State>,
    public options: LayerOptions
  ) {}

  ngOnInit() {}

  addLayer() {
    let dialogRef = this.dialog.open(AddHereLayerDialogComponent, {
      width: '600px'
    });

    this.sub = dialogRef.afterClosed().subscribe((layer: HereTileLayer) => {
      if (layer) {
        this.store.dispatch(fromStore.addLayer({ layer }));
      }
    });
  }

  removeLayer(layer: HereTileLayer) {
    this.store.dispatch(fromStore.removeLayer({ layer }));
  }

  reorderLayers(event: CdkDragDrop<HereTileLayer[]>) {
    this.store.dispatch(fromStore.reorderLayers(event));
  }

  updateLayer(layer: HereTileLayer, event: { [key: string]: any }) {
    layer = {
      ...layer,
      ...event
    };
    this.store.dispatch(fromStore.updateLayer({ layer }));
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
