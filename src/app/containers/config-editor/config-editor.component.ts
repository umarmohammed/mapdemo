import { Component, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'app-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.scss']
})
export class ConfigEditorComponent {
  @Output() toggleNav = new EventEmitter();

  layers$ = this.store.pipe(select(fromStore.getLayers));

  constructor(private store: Store<fromStore.State>) {}
}
