import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpService = inject(HttpService);
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: httpService.userData.token,
    }
  });
  return next(cloneReq).pipe(
    map((result: HttpEvent<any>) => {
      if (result instanceof HttpResponse && result.status === 200) {
        const session = result.headers.get('session');
      }
      return result;
    })
  )
};

