import { Component} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { userModel } from '../../models/user.model';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, RouterLink, NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent {

  constructor(private userManager: UserManagerService){
  }

  public userData!:userModel

  ngOnInit(){
     this.userData = this.userManager.getUserData()
  }

}
