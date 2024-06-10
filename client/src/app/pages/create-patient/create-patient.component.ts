import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-create-patient',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.css'
})
export class CreatePatientComponent {

}
