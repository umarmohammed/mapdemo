import { Route } from './route.model';
import { Job } from './job.model';

export interface Scenario {
  name: string;
  routes: Route[];
  jobs: Job[];
}
