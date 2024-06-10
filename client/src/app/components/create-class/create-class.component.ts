import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormBuilder,  ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { ClassesManagerService } from '../../services/classes-manager/classes-manager.service';

declare var $:any

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.css'
})

export class CreateClassComponent {

  updateClassForm!:FormGroup
  classUpdated:boolean = false
  newClassName:string = ''

  constructor(
    private fb: FormBuilder,
    private userManager: UserManagerService,
    private classManager:ClassesManagerService
  ) {
    this.updateClassForm = this.fb.group({
      classToUpdate: ['', [Validators.required]],
    });
  }

  closeModal(){
    $('#editSlugModal').modal('hide');
  }

  createClass(){
    this.newClassName = this.updateClassForm.get('classToUpdate')?.value

    let data = {
      className:this.newClassName
    }

    this.classManager.createClass(data).subscribe((response)=>{
      console.log(response)
      if(response.class_added==true){
        this.closeModal()
      }
    },
  (error)=>{
    console.log(error)
  })

  }
}
