import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;
  errorMessage = '';

  loginRequest = {
    loginName: '',
    password: '',
  };

  constructor(private httpService: HttpService) {}
  login() {
    if (!this.loginRequest.loginName) {
      this.errorMessage = 'A felhasználónév megadása kötelező!';
      return;
    }
    if (!this.loginRequest.password) {
      this.errorMessage = 'A jelszó megadása kötelező!';
      return;
    }
    this.httpService.login(this.loginRequest).subscribe({
      next: (result: boolean) => {},
      error: (err: any) => {
        this.errorMessage = err.error?.message ?? err.message;
      }
    })
  }
}
