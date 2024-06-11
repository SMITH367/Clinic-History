import { Injectable } from '@angular/core';
import { UserManagerService } from '../user-manager/user-manager.service';
import { RestService } from '../rest-service/rest-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientsManagerService {

  constructor(
    private restService: RestService,
    private userManager: UserManagerService,
    private router: Router,
  ) {}

  getPatients() {
    return this.restService.getData('patients', this.userManager.getUserLogged())
  }
  getPatient(identification:string) {
    return this.restService.getData(`patients/${identification}`, this.userManager.getUserLogged())
  }
  searchPatients(patient:string) {
    return this.restService.getData(`patients/search/${patient}`, this.userManager.getUserLogged())
  }

  savePatients(patient:any){
    return this.restService.postData(patient, 'patients', this.userManager.getUserLogged())
  }


}
