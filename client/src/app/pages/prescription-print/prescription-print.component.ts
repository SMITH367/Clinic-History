import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { calculateAge,formatDate } from '../../utils/dateConverter';
import { Input } from '@angular/core';
@Component({
  selector: 'app-prescription-print',
  standalone: true,
  imports: [],
  templateUrl: './prescription-print.component.html',
  styleUrl: './prescription-print.component.css'
})

export class PrescriptionPrintComponent {

  @Input() prescriptionData!:any

  downloadPDF() {

  console.log(this.prescriptionData)
    const doc = new jsPDF('p', 'cm', 'a4');
    doc.setFont('Arial');

    doc.text('RECETA MÉDICA', 2, 4);
    doc.text(`Paciente: ${this.prescriptionData.identification} ${this.prescriptionData.name} ${this.prescriptionData.last_name}`, 2, 5);
    doc.text(`Edad: ${calculateAge(this.prescriptionData.birthday)} años`, 2, 6);
    doc.text(`Fecha: ${formatDate(this.prescriptionData.date_prescription)}`, 2, 7);
    doc.text('Medicamentos:', 2, 8);
    doc.text(`${this.prescriptionData.prescription}`,2,9)
    doc.save(`Receta-medica-${this.prescriptionData.name}-${this.prescriptionData.last_name}-${formatDate(this.prescriptionData.date_prescription)}.pdf`);
  }
}
