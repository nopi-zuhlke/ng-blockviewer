import { Routes } from '@angular/router';
import { PageContainer } from './components/page-container/page-container';

export const routes: Routes = [
  { path: '**', component: PageContainer },
];
