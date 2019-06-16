import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { Scenario } from 'src/app/models/scenario.model';

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

  clearScenarios() {
    this.store.dispatch(fromStore.clearScenarios());
  }

  onFileSelected(fileInput: HTMLInputElement) {
    if (fileInput.files && fileInput.files.length) {
      const fileReader = new FileReader();
      fileReader.readAsText(fileInput.files.item(0));
      fileReader.onload = () => this.loadScenario(fileReader.result as string);
      fileInput.value = '';
    }
  }

  loadScenario(value: string) {
    const scenario: Scenario = JSON.parse(value);
    this.store.dispatch(fromStore.loadScenario({ scenario }));
  }
}
