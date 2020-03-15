import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './service/auth.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  // { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m=>m.AdminLayoutModule)
    }]
    
  }
  
];

@NgModule({
  imports: [
    // CommonModule,
    // BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
