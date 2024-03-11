import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;
  errorMessages: Message[] = [];

  loginRequest = {
    loginName: '',
    password: '',
  };

  constructor(private httpService: HttpService,
    private router: Router) { }
  login() {
    this.errorMessages = [];
    if (!this.loginRequest.loginName) {
      this.errorMessages.push({
        detail: 'A felhasználónév megadása kötelező!',
        severity: 'error',
        summary: 'Hiba',
      });
    }
    if (!this.loginRequest.password) {
      this.errorMessages.push({
        detail: 'Kérem adja meg a jelszavát!',
        severity: 'error',
        summary: 'Hiba',
      });
    }
    if (this.errorMessages.length > 0) {
      return;

    }
    this.httpService.login(this.loginRequest).subscribe({
      next: (result: boolean) => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err);

        this.errorMessages = [{
          detail: err.error?.message ?? err.message,
          severity: 'error',
          summary: 'Hiba',
        }];
      }
    })
  }
}
