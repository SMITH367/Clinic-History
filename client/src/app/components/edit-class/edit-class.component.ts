import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { ClassesManagerService } from '../../services/classes-manager/classes-manager.service';

declare var $:any

@Component({
  selector: 'app-edit-class',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './edit-class.component.html',
  styleUrl: './edit-class.component.css'
})

export class EditClassComponent {
  updateClassForm!:FormGroup
  classUpdated:boolean = false
  newClassName:string = ''

  @Input() id_class!:string

  @Output() reloadClasses: EventEmitter<void> = new EventEmitter<void>();

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
    $('#editClassModal').modal('hide');
  }

  updateClass(){
    this.newClassName = this.updateClassForm.get('classToUpdate')?.value

    let data = {
      className:this.newClassName,
      class_id:this.id_class
    }

    this.classManager.updateClass(data).subscribe((response)=>{
      if(response.class_updated==true){

        this.classUpdated = true
        this.reloadClasses.emit()

        setTimeout(()=>{
          this.classUpdated = false
          this.closeModal()

        }, 1000)
      }
    },
  (error)=>{
    console.log(error)
  })

  }
}
