import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const routeGuardGuard: CanActivateFn = (route, state) => {

  
  let _Router: Router = inject(Router);
  let _AuthenticationService = inject(AuthenticationService);


  if (localStorage.getItem('userToken') != null) {
    _AuthenticationService.handleUserInfo();
    return true;
  } else {
    _Router.navigate(['/login'])
    return false;
  }

};
