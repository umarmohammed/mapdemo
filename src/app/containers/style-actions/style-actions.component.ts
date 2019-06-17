import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { FileSaverService } from 'ngx-filesaver';
import { MapStyle } from 'src/app/models/map-style.model';

@Component({
  selector: 'app-style-actions',
  templateUrl: './style-actions.component.html',
  styleUrls: ['./style-actions.component.scss']
})
export class StyleActionsComponent {
  mapStyle$ = this.store$.pipe(select(fromStore.getMapStyle));

  constructor(
    private store$: Store<fromStore.State>,
    private fileSaverService: FileSaverService
  ) {}

  loadMapStyle(value: string) {
    const mapStyle: MapStyle = JSON.parse(value);
    this.store$.dispatch(fromStore.loadMapStyle({ mapStyle }));
  }

  onFileSelected(fileInput: HTMLInputElement) {
    if (fileInput.files && fileInput.files.length) {
      const fileReader = new FileReader();
      fileReader.readAsText(fileInput.files.item(0));
      fileReader.onload = () => this.loadMapStyle(fileReader.result as string);
      fileInput.value = '';
    }
  }

  saveStyles(mapStyle: MapStyle) {
    this.fileSaverService.saveText(JSON.stringify(mapStyle), 'styles.json');
  }
}
