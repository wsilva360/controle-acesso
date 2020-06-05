import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

import { AuthGuardService } from './shared/authentication/auth-guard.service';

const routes: Routes = [
  /*
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
  */
  
  
  { path: '#', redirectTo: '', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginModule) }
    ],
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      { path: ':tokenCliente/:urlOrigem/:idCliente', loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginModule) }
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
  { path: '', redirectTo: '/', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
