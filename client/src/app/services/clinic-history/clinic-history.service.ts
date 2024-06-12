import { Injectable } from '@angular/core';
import { RestService } from '../rest-service/rest-service.service';
import { UserManagerService } from '../user-manager/user-manager.service';
@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {

  constructor(private restService:RestService, private userManager:UserManagerService) { }

  getConsultations(patient:string) {
    return this.restService.getData(`consultations/${patient}`, this.userManager.getUserLogged())
  }

  getConsultationById(id_consultation:string) {
    return this.restService.getData(`consultation/${id_consultation}`, this.userManager.getUserLogged())
  }

  createConsultation(consultationData:any){
    return this.restService.postData(consultationData, `consultation`, this.userManager.getUserLogged())
  }
  updateConsultation(consultationData:any){
    return this.restService.putData(consultationData, `consultation`, this.userManager.getUserLogged())
  }
}
