import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { PatientsManagerService } from '../../services/patients-manager/patients-manager.service';
import { userModel } from '../../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, RouterLink, NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private userManager: UserManagerService,
    private patientManager: PatientsManagerService,
    private fb: FormBuilder
  ) {
    this.searchPatientForm = this.fb.group({
      patient: ['', [Validators.required]],
    });
  }

  public userData!: userModel;
  public patientsList: any = [];
  searchPatientForm: FormGroup;

  ngOnInit() {
    this.getAllPatients()
  }

  getAllPatients(){
    this.userData = this.userManager.getUserData();
    this.patientManager.getPatients().subscribe(
      (response: any) => {
        this.patientsList = response;
      },
      (error: any) => {
        console.error('Response Error:', error);
      }
    );
  }

  searchPatient() {
    let patient = this.searchPatientForm.get('patient')?.value;
    this.patientManager.searchPatients(patient).subscribe(
      (response) => {
        this.patientsList = response
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
