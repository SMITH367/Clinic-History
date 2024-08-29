import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreatePatientComponent } from './pages/create-patient/create-patient.component';
import { ClassesManagerComponent } from './pages/classes-manager/classes-manager/classes-manager.component';
import { PatientEditorComponent } from './pages/patient-editor/patient-editor/patient-editor.component';
import { ClinicHistoryComponent } from './pages/clinic-history/clinic-history/clinic-history.component';
import { CreateConsultationComponent } from './pages/create-consultation/create-consultation/create-consultation.component';
import { UpdateConsultationComponent } from './pages/update-consultation/update-consultation/update-consultation.component';
import { PrescriptionComponent } from './pages/prescription/prescription.component';
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
    path:'historia/paciente/:id', component:ClinicHistoryComponent, title:'Historia clinica', canMatch:[authGuard]
  },
  {
    path:'crear/consulta/:id', component:CreateConsultationComponent, title:'Historia clinica', canMatch:[authGuard]
  },
  {
    path:'editar/consulta/:consultation/:patient', component:UpdateConsultationComponent, title:'Historia clinica', canMatch:[authGuard]
  },
  {
    path:'convenios', component:ClassesManagerComponent, title:'Gestionar convenios', canMatch:[authGuard]
  },
  {
    path:'recetas', component:PrescriptionComponent, title:'Gestionar Recetas', canMatch:[authGuard]
  },
  {
    path:'**', component:NotFoundComponent, title:"404"
  }
];
