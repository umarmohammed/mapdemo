import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';

import { AppComponent } from './app.component';
import * as fromComponents from './components';
import * as fromContainers from './containers';

import { MaterialModule } from 'src/material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    ...fromComponents.components,
    ...fromContainers.containers
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    FileSaverModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [fromComponents.AddHereLayerDialogComponent]
})
export class AppModule {}
