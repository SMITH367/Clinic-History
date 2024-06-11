import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ClassesManagerService } from '../../services/classes-manager/classes-manager.service';
import { PatientsManagerService } from '../../services/patients-manager/patients-manager.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { userModel } from '../../models/user.model';
@Component({
  selector: 'app-create-patient',
  standalone: true,
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule, NgFor],
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.css',
})
export class CreatePatientComponent {
  createPatientForm!: FormGroup;
  userData!: userModel;
  classesList: any;

  constructor(
    private classesManager: ClassesManagerService,
    private userManager: UserManagerService,
    private patientManger: PatientsManagerService,
    private fb: FormBuilder
  ) {
    this.createPatientForm = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      typeDocument: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      class: ['', [Validators.required]],
      born_date: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {
    this.userData = this.userManager.getUserData();
    this.classesManager.getClasess().subscribe(
      (response: any) => {
        this.classesList = response;
        console.log(response);
      },
      (error: any) => {
        console.error('Response Error:', error);
      }
    );
  }

  createPatient($event: any) {
    let newPatient = {
      name: this.createPatientForm.get('name')?.value,
      last_name: this.createPatientForm.get('last_name')?.value,
      identification: this.createPatientForm.get('identification')?.value,
      identificationType: this.createPatientForm.get('typeDocument')?.value,
      class_patient: this.createPatientForm.get('class')?.value,
      birthday: this.createPatientForm.get('born_date')?.value,
      phone_number:this.createPatientForm.get('phone')?.value
    };

    this.patientManger.savePatients(newPatient).subscribe(
      (response) => {
        if(response.patient_added == true){
          alert("Paciente agregado correctamente")
          this.createPatientForm.controls['name'].setValue('')
          this.createPatientForm.controls['last_name'].setValue('')
          this.createPatientForm.controls['identification'].setValue('')
          this.createPatientForm.controls['typeDocument'].setValue('')
          this.createPatientForm.controls['class'].setValue('')
          this.createPatientForm.controls['born_date'].setValue('')
          this.createPatientForm.controls['phone'].setValue('')
        }
      },
      (error) => {
        console.log("Ha ocurrido un error")
        console.log(error)
      }
    );
  }
}
