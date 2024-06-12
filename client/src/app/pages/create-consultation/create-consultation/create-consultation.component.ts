import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PatientsManagerService } from '../../../services/patients-manager/patients-manager.service';
import { ClinicHistoryService } from '../../../services/clinic-history/clinic-history.service';
import { formatDate, calculateAge } from '../../../utils/dateConverter';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { error } from 'jquery';
@Component({
  selector: 'app-create-consultation',
  standalone: true,
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './create-consultation.component.html',
  styleUrl: './create-consultation.component.css',
})
export class CreateConsultationComponent {
  patientData: any = {
    birthday: '',
    identification: '',
    identificationType: '',
    last_name: '',
    name: '',
    phone_number: '',
    type: '',
  };
  patient_id: string = '';
  createConsultationForm!: FormGroup;
  currentDate:string = new Date().toString()
  formatDate = formatDate;
  calculateAge = calculateAge;

  constructor(
    private patientManager: PatientsManagerService,
    private consultationManager: ClinicHistoryService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createConsultationForm = this.fb.group({
      consultation_description: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
    });
  }

  ngOnInit() {
    const segments = window.location.href.split('/');
    this.patient_id = segments[segments.length - 1];
    this.getPatient(this.patient_id);
  }

  private getPatient(identification: string) {
    this.patientManager.getPatient(identification).subscribe(
      (response) => {
        this.patientData = response;
        console.log(this.patientData);
      },
      (error) => {
        if (error.status === 404) {
          this.router.navigate(['/*']);
        }
      }
    );
  }

  createConsultation() {
    const consultationData = {
      patient: this.patient_id,
      description: this.createConsultationForm.get('consultation_description')
        ?.value,
    };

    this.consultationManager.createConsultation(consultationData).subscribe(
      (response) => {
        console.log(response);
        if (response.consultation_added === true) {
          alert('Consulta creada correctamente');
          this.router.navigate(['/historia/paciente/',this.patient_id]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
