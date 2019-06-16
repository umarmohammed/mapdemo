import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent implements OnInit {
  scenarioState$ = this.store.pipe(select(fromStore.getScenarioState));

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

  selectScenario(name: string) {
    this.store.dispatch(fromStore.setSelectedScenario({ name }));
  }
}
