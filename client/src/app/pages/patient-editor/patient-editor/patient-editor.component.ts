import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ClassesManagerService } from '../../../services/classes-manager/classes-manager.service';
import { PatientsManagerService } from '../../../services/patients-manager/patients-manager.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserManagerService } from '../../../services/user-manager/user-manager.service';
import { userModel } from '../../../models/user.model';
import {formatDate} from '../../../utils/dateConverter'

@Component({
  selector: 'app-patient-editor',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './patient-editor.component.html',
  styleUrl: './patient-editor.component.css',
})
export class PatientEditorComponent {
  updatePatientForm!: FormGroup;
  userData!: userModel;
  classesList: any;
  patient_id: string = '';
  patientData!:any;

  constructor(
    private classesManager: ClassesManagerService,
    private userManager: UserManagerService,
    private patientManger: PatientsManagerService,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.updatePatientForm = this.fb.group({
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
    const segments = window.location.href.split('/');
    this.patient_id = segments[segments.length - 1];
    this.getPatient(this.patient_id)
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


  private getPatient(identification:string){
    this.patientManger.getPatient(identification).subscribe((response)=>{
        this.patientData = response
        console.log(this.patientData)
        this.updatePatientForm.controls['name'].setValue(this.patientData.name)
          this.updatePatientForm.controls['last_name'].setValue(this.patientData.last_name)
          this.updatePatientForm.controls['typeDocument'].setValue(this.patientData.identificationType)
          this.updatePatientForm.controls['identification'].setValue(this.patientData.identification)
          this.updatePatientForm.controls['class'].setValue(this.patientData.type)
          console.log(this.updatePatientForm.get('class')?.value)
          let newDate = formatDate(this.patientData.birthday)
          this.updatePatientForm.controls['born_date'].setValue(newDate)
          this.updatePatientForm.controls['phone'].setValue(this.patientData.phone_number)
    },
    (error)=>{
      if(error.status === 404){
        this.router.navigate(['/*'])
      }
    })

  }

  updatePatient($event: any) {

    const patientClass = this.updatePatientForm.get('class')?.value
    let patientClassId = null

    for (let i in this.classesList){
      if(this.classesList[i].name === patientClass){
        patientClassId = this.classesList[i].class_id
      }
    }

    let updatePatient = {
      name: this.updatePatientForm.get('name')?.value,
      last_name: this.updatePatientForm.get('last_name')?.value,
      identificationType: this.updatePatientForm.get('typeDocument')?.value,
      class_patient: patientClassId,
      birthday: this.updatePatientForm.get('born_date')?.value,
      phone_number: this.updatePatientForm.get('phone')?.value,
    };

    this.patientManger.updatePatient(updatePatient, this.patient_id).subscribe(
      (response) => {
        if(response.patient_modified == true){
          alert("Paciente actualizado correctamente")
        }
      },
      (error) => {
        alert("Ha ocurrido un error en el servidor, intente nuevamente")
      }
    );
  }
}
