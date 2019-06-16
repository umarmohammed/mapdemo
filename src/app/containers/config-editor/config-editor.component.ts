import { Component, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';
import { FileSaverService } from 'ngx-filesaver';
import { HereTileLayer } from 'src/app/models/here-tile-layer.model';

@Component({
  selector: 'app-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.scss']
})
export class ConfigEditorComponent {
  @Output() toggleNav = new EventEmitter();

  private layers: HereTileLayer[];

  constructor(
    private store: Store<fromStore.State>,
    private _FileSaverService: FileSaverService
  ) {
    this.store
      .pipe(select(fromStore.getLayers))
      .subscribe(layers => (this.layers = layers));
  }

  loadMapStyle(value: string) {
    const layers: HereTileLayer[] = JSON.parse(value);
    this.store.dispatch(fromStore.loadLayers({ layers }));
  }

  onFileSelected(fileInput: HTMLInputElement) {
    if (fileInput.files && fileInput.files.length) {
      const fileReader = new FileReader();
      fileReader.readAsText(fileInput.files.item(0));
      fileReader.onload = () => this.loadMapStyle(fileReader.result as string);
      fileInput.value = '';
    }
  }

  saveStyles() {
    this._FileSaverService.saveText(JSON.stringify(this.layers), 'styles.json');
  }
}
