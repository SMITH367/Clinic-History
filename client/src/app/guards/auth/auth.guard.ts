import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth-manager/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authManager = inject(AuthService)
  return authManager.getLoggedIn()
};
