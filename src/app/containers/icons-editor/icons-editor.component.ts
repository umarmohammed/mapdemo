import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-icons-editor',
  templateUrl: './icons-editor.component.html',
  styleUrls: ['./icons-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsEditorComponent {
  icon$ = this.store$.pipe(
    select(fromStore.getStopIcons),
    map(icon => this.domSanitizer.bypassSecurityTrustHtml(icon))
  );

  constructor(
    private store$: Store<fromStore.State>,
    private domSanitizer: DomSanitizer
  ) {}

  onFileSelected(fileInput: HTMLInputElement) {
    if (fileInput.files && fileInput.files.length) {
      const fileReader = new FileReader();
      fileReader.readAsText(fileInput.files.item(0));
      fileReader.onload = () => this.loadIcon(fileReader.result as string);
      fileInput.value = '';
    }
  }

  loadIcon(svg: string) {
    this.store$.dispatch(fromStore.loadStopIcon({ svg }));
  }
}
