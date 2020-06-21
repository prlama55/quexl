import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../helpers/auth.guard";

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'services',
    canActivate: [AuthGuard],
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    loadChildren: () => import('./history/history.module').then(m => m.HistoryModule)
  },
  {
    path: 'datasets',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dataset/dataset.module').then(m => m.DatasetModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
