import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TileOptionsService } from 'src/app/services/tile-options.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HereLayer } from 'src/app/models/here-layer.model';

@Component({
  selector: 'app-add-tile',
  templateUrl: './add-tile.component.html',
  styleUrls: ['./add-tile.component.scss']
})
export class AddTileComponent implements OnInit {
  addTileForm = this.fb.group({
    scheme: ['', Validators.required],
    tile: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<AddTileComponent>,
    public options: TileOptionsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  ok() {
    if (!this.addTileForm.valid) return;

    this.dialogRef.close(this.addTileForm.value);
  }
}
