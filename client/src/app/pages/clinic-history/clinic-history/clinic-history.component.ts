import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router } from '@angular/router';
import { ClinicHistoryService } from '../../../services/clinic-history/clinic-history.service';
import { PatientsManagerService } from '../../../services/patients-manager/patients-manager.service';
import { formatDate } from '../../../utils/dateConverter';

@Component({
  selector: 'app-clinic-history',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, HeaderComponent],
  templateUrl: './clinic-history.component.html',
  styleUrl: './clinic-history.component.css',
})
export class ClinicHistoryComponent {
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
  clinicHistoryPatient!: any;

  formatDate = formatDate

  constructor(
    private patientManger: PatientsManagerService,
    private clinicHistory: ClinicHistoryService,
    private router: Router
  ) {}
  ngOnInit() {
    const segments = window.location.href.split('/');
    this.patient_id = segments[segments.length - 1];
    console.log('HOLA');
    this.getPatient(this.patient_id);
    this.getClinicHistory(this.patient_id);
  }

  private getPatient(identification: string) {
    this.patientManger.getPatient(identification).subscribe(
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

  private getClinicHistory(identification: string) {
    this.clinicHistory.getConsultations(identification).subscribe(
      (response) => {
        this.clinicHistoryPatient = response;
        console.log(this.clinicHistoryPatient);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
