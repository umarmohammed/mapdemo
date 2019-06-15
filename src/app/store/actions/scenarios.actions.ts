import { createAction, props } from '@ngrx/store';
import { Scenario } from 'src/app/models/scenario.model';

export const loadScenario = createAction(
  '[Layer Manager] Load Scenario',
  props<{ scenario: Scenario }>()
);

export const setSelectedScenario = createAction(
  '[Layer Manager] Set Selected Scenario',
  props<{ name: string }>()
);

export const clearScenarios = createAction('[Layer Manager] Clear Scenarios');
