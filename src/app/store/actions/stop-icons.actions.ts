import { createAction, props } from '@ngrx/store';

export const loadStopIcon = createAction(
  '[Icon Editor] Load Stop Icon',
  props<{ svg: string }>()
);
