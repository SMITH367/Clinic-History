import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth-manager/auth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const unauthGuard: CanActivateFn = (route, state) => {

  const authManager = inject(AuthService)
  let isLoggedIn:any;

  authManager.getLoggedIn().subscribe((res)=> isLoggedIn = res)

  return of(!isLoggedIn)
};
