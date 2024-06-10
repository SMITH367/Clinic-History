import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { ClassesManagerService } from '../../../services/classes-manager/classes-manager.service';
import { UserManagerService } from '../../../services/user-manager/user-manager.service';
import { CreateClassComponent } from '../../../components/create-class/create-class.component';
import { userModel } from '../../../models/user.model';
import { NgFor } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-classes-manager',
  standalone: true,
  imports: [HeaderComponent, CreateClassComponent,NgFor],
  templateUrl: './classes-manager.component.html',
  styleUrl: './classes-manager.component.css'
})
export class ClassesManagerComponent {

  constructor(private classesManager:ClassesManagerService, private userManager:UserManagerService){}

  classesList:any = []
  userData!:userModel
  classId:any = ''

  ngOnInit(){
    this.userData = this.userManager.getUserData();
    this.classesManager.getClasess().subscribe(
      (response: any) => {
        this.classesList = response;
        console.log(response)
      },
      (error: any) => {
        console.error('Response Error:', error);
      }
    );
  }

  createClass(element:any){
    this.classId = element.url_key;
    const modal = $('#editSlugModal');
    modal.find('.input-edit-slug').val(`${element.destination_url}`)
    modal.modal('show');
  }

}
