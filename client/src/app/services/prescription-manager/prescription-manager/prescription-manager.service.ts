import { Injectable } from '@angular/core';
import { RestService } from '../../rest-service/rest-service.service';
import { UserManagerService } from '../../user-manager/user-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionManagerService {

  constructor(private restService:RestService, private userManager:UserManagerService) { }

  getAllPrescriptions(){
    return this.restService.getData('prescriptions', this.userManager.getUserLogged())
  }

  deletePrescription(idPrescription:string){
    return this.restService.deleteData(`prescription/${idPrescription}`, this.userManager.getUserLogged())
  }
}
