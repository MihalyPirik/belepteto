import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpService } from './http.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpService = inject(HttpService);
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: httpService.userData.token,
    }
  });
  return next(cloneReq);
};

