import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const numericIdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (id !== null && !isNaN(Number(id))) {
    return true;
  } else {
    router.navigate(['/']).then();
    return false;
  }
};
