import { Injectable } from '@angular/core';
import { UserManagerService } from '../user-manager/user-manager.service';
import { RestService } from '../rest-service/rest-service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClassesManagerService {

  constructor(private restService:RestService, private userManager:UserManagerService) { }

  getClasess() {
    return this.restService.getData('classes', this.userManager.getUserLogged())
  }

  createClass(className:any){
    return this.restService.postData(className,'classes/add', this.userManager.getUserLogged())
  }

}
