import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PatientsManagerService } from '../../../services/patients-manager/patients-manager.service';
import { ClinicHistoryService } from '../../../services/clinic-history/clinic-history.service';
import { formatDate, calculateAge } from '../../../utils/dateConverter';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-update-consultation',
  standalone: true,
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './update-consultation.component.html',
  styleUrl: './update-consultation.component.css',
})
export class UpdateConsultationComponent {
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
  consultation_id: string = '';
  consultationData: any = {
    description: '',
    id_consultation: '',
  };
  updateConsultationForm!: FormGroup;
  formatDate = formatDate;
  calculateAge = calculateAge;

  constructor(
    private patientManager: PatientsManagerService,
    private consultationManager: ClinicHistoryService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateConsultationForm = this.fb.group({
      consultation_description: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
    });
  }

  ngOnInit() {
    const segments = window.location.href.split('/');
    this.patient_id = segments[segments.length - 1];
    this.consultation_id = segments[segments.length - 2];
    this.getPatient(this.patient_id);
    this.getConsultation(this.consultation_id);
  }

  private getPatient(identification: string) {
    this.patientManager.getPatient(identification).subscribe(
      (response) => {
        this.patientData = response;
      },
      (error) => {
        if (error.status === 404) {
          this.router.navigate(['/*']);
        }
      }
    );
  }

  private getConsultation(consultation_id: string) {
    this.consultationManager.getConsultationById(consultation_id).subscribe(
      (response) => {
        this.consultationData = response;
        if (this.patient_id != this.consultationData.patient) {
          this.router.navigate(['/*']);
        } else {
          this.updateConsultationForm
            .get('consultation_description')
            ?.setValue(this.consultationData.description);
        }
      },
      (error) => {
        if (error.status === 404) {
          this.router.navigate(['/*']);
        }
      }
    );
  }

  updateConsultation() {
    const updateData = {
      newDescription:this.updateConsultationForm.get('consultation_description')?.value,
      id_consultation:this.consultation_id
    }
    this.consultationManager.updateConsultation(updateData).subscribe(
      (response) => {
        if(response.consultation_modified == true){
          alert("Actualización de consulta realizada correctamente")
        }
      },
      (error) => {
        alert("Ha ocurrido un error en el servidor")
        console.error(error)
      }
    );
  }
}
