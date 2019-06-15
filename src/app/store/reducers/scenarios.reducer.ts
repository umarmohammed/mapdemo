import { createReducer, Action, on } from '@ngrx/store';
import * as ScenarioActions from '../actions/scenarios.actions';
import { Scenario } from 'src/app/models/scenario.model';

export interface State {
  items: Scenario[];
  selectedItemName: string;
}

export const initialState: State = {
  items: [],
  selectedItemName: ''
};

const scenariosReducer = createReducer(
  initialState,
  on(ScenarioActions.loadScenario, (state, { scenario }) => {
    const items = [
      ...state.items.filter(item => item.name !== scenario.name),
      scenario
    ];
    return { ...state, items, selectedItemName: scenario.name };
  }),
  on(ScenarioActions.setSelectedScenario, (state, { name }) => ({
    ...state,
    selectedItemName: name
  })),
  on(ScenarioActions.clearScenarios, state => ({
    ...state,
    items: [],
    selectedItemName: ''
  }))
);

export function reducer(state: State, action: Action) {
  return scenariosReducer(state, action);
}

export const getItems = (state: State) =>
  state && state.items ? state.items : [];
