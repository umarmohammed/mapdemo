import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { LayerOptions } from 'src/app/services/layer-options.service';
import { HereLayer } from 'src/app/models/here-layer.model';
import { GuidService } from 'src/app/services/guid.service';

@Component({
  selector: 'app-here-layer-dialog',
  templateUrl: './add-here-layer-dialog.component.html',
  styleUrls: ['./add-here-layer-dialog.component.scss']
})
export class AddHereLayerDialogComponent implements OnInit {
  addHereLayerForm = this.fb.group({
    scheme: ['', Validators.required],
    tile: ['', Validators.required],
    opacity: ['100', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<AddHereLayerDialogComponent>,
    public options: LayerOptions,
    private fb: FormBuilder,
    private guid: GuidService
  ) {}

  ngOnInit() {}

  ok() {
    if (!this.addHereLayerForm.valid) return;

    const hereLayer: HereLayer = {
      ...this.addHereLayerForm.value,
      visible: true,
      id: this.guid.newGuid()
    };

    this.dialogRef.close(hereLayer);
  }

  onSliderChange(event: any) {
    this.addHereLayerForm.controls.opacity.setValue(event.value);
  }
}
