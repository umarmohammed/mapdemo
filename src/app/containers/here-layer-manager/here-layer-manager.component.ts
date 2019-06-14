import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HereLayer } from 'src/app/models/here-layer.model';
import { AddHereLayerDialogComponent } from '../../components/add-here-layer-dialog/add-here-layer-dialog.component';
import { Subscription } from 'rxjs';
import { LayerOptions } from 'src/app/services/layer-options.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { Scenario } from 'src/app/models/scenario.model';

@Component({
  selector: 'app-here-layer-manager',
  templateUrl: './here-layer-manager.component.html',
  styleUrls: ['./here-layer-manager.component.scss']
})
export class HereLayerManagerComponent implements OnInit, OnDestroy {
  @Output()
  toggleNav = new EventEmitter();

  sub: Subscription;
  layers$ = this.store.pipe(select(fromStore.selectLayers));

  constructor(
    public dialog: MatDialog,
    public options: LayerOptions,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {}

  addLayer() {
    let dialogRef = this.dialog.open(AddHereLayerDialogComponent, {
      width: '600px'
    });

    this.sub = dialogRef.afterClosed().subscribe((layer: HereLayer) => {
      if (layer) {
        this.store.dispatch(fromStore.addLayer({ layer }));
      }
    });
  }

  removeLayer(layer: HereLayer) {
    this.store.dispatch(fromStore.removeLayer({ layer }));
  }

  updateLayer(layer: HereLayer, property: string, value: any) {
    layer = {
      ...layer,
      [property]: value
    };

    this.store.dispatch(fromStore.updateLayer({ layer }));
  }

  reorderLayers(event: CdkDragDrop<HereLayer[]>) {
    this.store.dispatch(fromStore.reorderLayers(event));
  }

  onFileSelected(fileInput: HTMLInputElement) {
    if (fileInput.files && fileInput.files.length) {
      const fileReader = new FileReader();
      fileReader.readAsText(fileInput.files.item(0));
      fileReader.onload = () => this.loadScenario(fileReader.result as string);
      fileInput.value = '';
    }
  }

  loadScenario(value: string) {
    const scenario: Scenario = JSON.parse(value);
    this.store.dispatch(fromStore.loadRoutes({ routes: scenario.routes }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
