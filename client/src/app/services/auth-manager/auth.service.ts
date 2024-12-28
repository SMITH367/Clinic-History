import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserManagerService } from '../user-manager/user-manager.service';
import { RestService } from '../rest-service/rest-service.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookies: CookieService,
    private restService: RestService,
    private userManager: UserManagerService,
    private router: Router,
  ) {}

  setToken(token: string) {
    this.cookies.set('token', token);
  }

  setLoggedIn() {
    this.cookies.set('login', 'true');
    localStorage.setItem('login', 'true');
  }

  getLoggedIn(): Observable<boolean> {
    return of(Boolean(this.cookies.get('login')));
  }

  login(dataUser: any) {

    this.restService.postData(dataUser, 'login').subscribe(
      (response: any) => {
        console.log(response)
        this.setToken(response.accessToken);

        this.userManager.setUserData({
          id: 0,
          name: response.name,
          email: response.email,
        });
        this.setLoggedIn();
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error('Response POST Error:', error);
        if(error.status === 403)
          alert("Usuario o contraseña invalidos")
        else
          alert("Ha ocurrido un error en el servidor")
      }
    );
  }

  logOut() {
    this.cookies.deleteAll();
    localStorage.removeItem('login');
    return true
  }
}
