import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { LayerService } from 'src/app/services/layer.service';
import { HereLayer } from 'src/app/models/here-layer.model';

@Component({
  selector: 'app-here-layer-dialog',
  templateUrl: './add-here-layer-dialog.component.html',
  styleUrls: ['./add-here-layer-dialog.component.scss']
})
export class AddHereLayerDialogComponent implements OnInit {
  addHereLayerForm = this.fb.group({
    scheme: ['', Validators.required],
    tile: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<AddHereLayerDialogComponent>,
    public options: LayerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  ok() {
    if (!this.addHereLayerForm.valid) return;

    const hereLayer: HereLayer = {
      ...this.addHereLayerForm.value,
      visible: true
    };

    this.dialogRef.close(hereLayer);
  }
}
