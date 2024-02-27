import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  userData: UserModel = {
    token: '',
    name: '',
    validTo: undefined,
  }

  APIUrl = 'https://acs.jedlik.cloud';

  constructor(private http: HttpClient) {}

  login(model: { loginName: string; password: string }): Observable<boolean> {
    return this.http.post<UserModel>(`${this.APIUrl}/login`, model).pipe(
      map((result: UserModel) => {
        this.userData = result;

        return true;
      })
    )
  }
}
