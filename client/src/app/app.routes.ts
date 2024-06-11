import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreatePatientComponent } from './pages/create-patient/create-patient.component';
import { ClassesManagerComponent } from './pages/classes-manager/classes-manager/classes-manager.component';
import { PatientEditorComponent } from './pages/patient-editor/patient-editor/patient-editor.component';
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
    path:'crear/paciente', component:CreatePatientComponent, title:'Crear paciente', canMatch:[authGuard]
  },
  {
    path:'editar/paciente/:id', component:PatientEditorComponent, title:'Editar paciente', canMatch:[authGuard]
  },
  {
    path:'convenios', component:ClassesManagerComponent, title:'Gestionar convenios', canMatch:[authGuard]
  },
  {
    path:'**', component:NotFoundComponent, title:"404"
  }
];
