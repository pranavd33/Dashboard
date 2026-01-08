import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { SelectionComponent } from './components/selection/selection';
import { DetailsComponent } from './components/details/details';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'selection', component: SelectionComponent },
  { path: 'details/:type', component: DetailsComponent },
];