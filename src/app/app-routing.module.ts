import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

import { AuthGuardService } from './shared/authentication/auth-guard.service';

const routes: Routes = [
  { path: '#', redirectTo: '', pathMatch: 'full' },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginModule) }
    ],
  },
  {
    path: 'lock-screen',
    component: LoginLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/account/lock-screen/lock-screen.module').then(m => m.LockScreenModule) }
    ],
  },
  {
    path: 'dashboard',
    component: MasterLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', loadChildren: () => import('./pages/dashboard/dashboards.module').then(m => m.DashboardsModule) }
    ],
  },
  {
    path: 'agendamento',
    component: MasterLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', loadChildren: () => import('./pages/agendamento/agendamentos.module').then(m => m.AgendamentosModule) }
    ],
  },

  {
    path: 'error',
    component: BlankLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', loadChildren: () => import('./pages/error/errors.module').then(m => m.ErrorsModule) }
    ],
  },

  //{ path: 'login', redirectTo: '/' },
  //{ path: '**', redirectTo: '/' }
  //{path: '**', component: NotFoundComponent},
  //{ path: '', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
