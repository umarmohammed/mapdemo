import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { HereTileLayer } from 'src/app/models/here-tile-layer.model';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-style-actions',
  templateUrl: './style-actions.component.html',
  styleUrls: ['./style-actions.component.scss']
})
export class StyleActionsComponent {
  @Input() layers: HereTileLayer[];

  constructor(
    private store: Store<fromStore.State>,
    private fileSaverService: FileSaverService
  ) {}

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
    this.fileSaverService.saveText(JSON.stringify(this.layers), 'styles.json');
  }
}
