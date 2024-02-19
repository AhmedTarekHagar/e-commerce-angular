import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const lastPageGuard: CanActivateFn = (route, state) => {

  let _Router: Router = inject(Router);

  const redirectValue = localStorage.getItem('lastPage');

  if (redirectValue == null) {
    _Router.navigate(['/home'])
  } else {
    _Router.navigate([redirectValue])
  }

  return true;
};
