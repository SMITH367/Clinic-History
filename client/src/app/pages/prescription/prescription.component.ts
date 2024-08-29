import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { PrescriptionManagerService } from '../../services/prescription-manager/prescription-manager/prescription-manager.service';
import { RouterLink } from '@angular/router';
import { formatDate } from '../../utils/dateConverter';
import { PrescriptionPrintComponent } from '../prescription-print/prescription-print.component';

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [HeaderComponent, PrescriptionPrintComponent, RouterLink, NgFor],
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.css'
})
export class PrescriptionComponent {

  prescriptions:any = []
  formatDate = formatDate
  constructor(private prescriptionManager:PrescriptionManagerService){

  }

  ngOnInit(){
    this.getAllPrescriptions()
  }

  getAllPrescriptions(){
    this.prescriptionManager.getAllPrescriptions().subscribe((data)=>{
      this.prescriptions = data
    },
  (error)=>console.log(error))
  }

}
