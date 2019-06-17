import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { GuidService } from 'src/app/services/guid.service';
import { FormBuilder } from '@angular/forms';
import { bgHexToTextColor } from 'src/app/util/color-utils';
import { RouteColor } from 'src/app/models/route-color.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.scss']
})
export class ColorEditorComponent implements OnInit {
  routeColors$ = this.store$.pipe(select(fromStore.getRouteColors));

  colorControl = this.fb.control('');

  constructor(
    private store$: Store<fromStore.State>,
    private guid: GuidService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  addRouteColor() {
    if (this.colorControl.errors) return;

    this.store$.dispatch(
      fromStore.addRouteColor({ routeColor: this.createRouteColor() })
    );

    this.colorControl.reset();
  }

  removeRouteColor(id: string) {
    this.store$.dispatch(fromStore.removeRouteColor({ id }));
  }

  reorderRouteColors(event: CdkDragDrop<RouteColor[]>) {
    this.store$.dispatch(fromStore.reorderRouteColors(event));
  }

  private createRouteColor(): RouteColor {
    const hexValue = this.colorControl.value.startsWith('#')
      ? this.colorControl.value
      : `#${this.colorControl.value}`;

    return {
      hexValue,
      id: this.guid.newGuid(),
      textColor: bgHexToTextColor(hexValue)
    };
  }
}
