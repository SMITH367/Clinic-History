import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [HeaderComponent, RouterLink, NgIf],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {


  constructor (public userManager:UserManagerService, private router:Router){}

  ngOnInit(){
    //Validating when the user is logged in
    if(this.userManager.getLoginState() && window.location.pathname === "/" )
      this.router.navigate(['/dashboard'])
  }
}
