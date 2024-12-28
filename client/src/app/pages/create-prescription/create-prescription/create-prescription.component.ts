import { Component } from '@angular/core';
import { PatientsManagerService } from '../../../services/patients-manager/patients-manager.service';
import { PrescriptionManagerService } from '../../../services/prescription-manager/prescription-manager/prescription-manager.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { userModel } from '../../../models/user.model';
import { RouterLink } from '@angular/router';
import { formatDate } from '../../../utils/dateConverter';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { PrescriptionPrintComponent } from '../../prescription-print/prescription-print.component';
import { Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-prescription',
  standalone: true,
  imports: [PrescriptionPrintComponent,ReactiveFormsModule, RouterLink, HeaderComponent, NgIf, NgFor],
  templateUrl: './create-prescription.component.html',
  styleUrl: './create-prescription.component.css',
})
export class CreatePrescriptionComponent {
  prescriptionDataForm!: any;
  public userData!: userModel;
  public patientsList: any = [];
  searchPatientForm!: FormGroup;
  formatDate = formatDate;
  currentDate: string = new Date().toString();
  searchControl = new FormControl('');
  selectedOption: string = '';
  dropdownOpen = false;
  prescriptionData!:any;


  constructor(
    private prescriptionManager: PrescriptionManagerService,
    private patientManager: PatientsManagerService,
    private fb: FormBuilder
  ) {
    this.prescriptionDataForm = this.fb.group({
      prescriptionData: ['', [Validators.required]],
      patient: ['', [Validators.required]]
    });
  }

  filteredOptions() {
    const searchText = (this.searchControl.value || '').toLowerCase();
    return this.patientsList.filter(
      (option: { identification: string; name: string }) =>
        option.name.toLowerCase().includes(searchText) || option.identification.toString().includes(searchText)
    );
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    setTimeout(() => (this.dropdownOpen = false), 200); // Cierra el dropdown después de un breve retraso
  }

  selectOption(patient: any,) {
    this.selectedOption = `${patient.name} ${patient.identification}`;
    this.searchControl.setValue('');
    this.dropdownOpen = false;
    this.prescriptionDataForm.get('patient')?.setValue(patient.identification)

    this.prescriptionData = {
      name:patient.name,
      last_name:patient.last_name,
      identification:`${patient.identificationType} ${patient.identification}`,
      birthday:patient.birthday,
      date_prescription:this.currentDate,
    }
  }

  ngOnInit() {
    this.getAllPatients();
  }

  getPrescriptionDataInfo(){
      return {
        ...this.prescriptionData,
        prescription: this.prescriptionDataForm.get('prescriptionData')?.value
      };

  }

  getAllPatients() {
    this.patientManager.getPatients().subscribe(
      (response: any) => {
        this.patientsList = response;
        console.log(this.patientsList);
      },
      (error: any) => {
        console.error('Response Error:', error);
      }
    );
  }

  createPrescription() {

    let prescription = {
      patient:this.prescriptionDataForm.get('patient')?.value,
      prescription:this.prescriptionDataForm.get('prescriptionData')?.value
    }
    this.prescriptionManager.createPrescription(prescription).subscribe(
      (response)=>{
        if(response.prescription_added == true){
          alert('Receta agregada correctamente')
          this.prescriptionDataForm.controls['patient'].setValue('')
          this.prescriptionDataForm.controls['prescriptionData'].setValue('')
        }

      },
      (error)=>{
        console.log(error)
      }
    )

  }
}
