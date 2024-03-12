import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/user-model';
import { TerminalModel } from '../models/terminal.model';

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

  loginStatusChanged = new EventEmitter()

  constructor(private http: HttpClient) { }

  login(model: { loginName: string; password: string }): Observable<boolean> {
    return this.http.post<UserModel>(`${this.APIUrl}/login`, model).pipe(
      map((result: UserModel) => {
        this.userData = result;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.loginStatusChanged.emit();
        return true;
      })
    )
  }

  logout() {
    this.userData = {
      token: '',
      name: '',
      validTo: undefined,
    }
    localStorage.removeItem('user');
    this.loginStatusChanged.emit();
  }

  checkUserData() {
    const user = localStorage.getItem('user');
    if (user) {
      const userObject = JSON.parse(user);
      const validTo = new Date(userObject.validTo);
      if (validTo > new Date()) {
        this.userData = userObject;
        this.loginStatusChanged.emit();
      }
      else {
        this.logout();
      }
    }
  }

  getTerminals(): Observable<TerminalModel[]> {
    return this.http.get<TerminalModel[]>(`${this.APIUrl}/terminal`);
  }

  postTerminal(model: TerminalModel): Observable<TerminalModel> {
    return this.http.post<TerminalModel>(`${this.APIUrl}/terminal`, model);
  }

  modiflyTerminal(model: TerminalModel): Observable<TerminalModel> {
    return this.http.put<TerminalModel>(`${this.APIUrl}/terminal`, model);
  }

  deleteTerminal(id: number): Observable<any> {
    // var options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    //   body: {}
    // }
    return this.http.delete<any>(`${this.APIUrl}/terminal/${id}`);
  }
}
