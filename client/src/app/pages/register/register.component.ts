import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RestService } from '../../services/rest-service/rest-service.service'
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

declare var bootstrap: any;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.css',
})

export class RegisterComponent {

  registerForm: FormGroup;
  private modal: any;

  constructor(private fb: FormBuilder, private restService: RestService, private router: Router) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  openModal(): void {
    this.modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    this.modal.show();
  }

  closeModal(): void {
    this.modal.hide();
  }

  //Method for create a new user
  registerUser(event: Event) {

    event.preventDefault();

    let dataUser = {
      "email":this.registerForm.get('email')?.value,
      "password":this.registerForm.get('password')?.value,
      "password_confirmation":this.registerForm.get('confirmPassword')?.value,
      "name":this.registerForm.get('userName')?.value,
    }

    this.restService.postData(dataUser,'register').subscribe(
      (response) => {
        this.openModal()
        setTimeout(()=> {
          this.closeModal()
        }, 4000)
        this.router.navigate(['/login'])
      },
      (error) => {
        console.error('Response POST Error:', error);
      }
    );

  }
}
