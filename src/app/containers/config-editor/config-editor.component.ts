import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.scss']
})
export class ConfigEditorComponent {
  @Output() toggleNav = new EventEmitter();
}
