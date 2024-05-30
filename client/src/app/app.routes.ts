import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth/auth.guard';
import { unauthGuard } from './guards/unauth/unauth.guard';

export const routes: Routes = [

  {
    path:'', component:LoginComponent, title:'Login', canMatch:[unauthGuard]
  },
  {
    path:'dashboard', component:DashboardComponent, title:'Dashboard', canMatch:[authGuard]
  },
  {
    path:'**', component:NotFoundComponent, title:"404"
  }
];
