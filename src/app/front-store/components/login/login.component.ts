import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.model';

export type LoginResponse = {
  complete: boolean;
  token: string;
  user: User;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errors: any = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    this.authService
      .login(form.value.email, form.value.password)
      .pipe(first())
      .subscribe(
        (response: LoginResponse) => {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('username', response['user'].name);
          localStorage.setItem('email', response['user'].email);
          if (response['user'].role === 'admin') {
            localStorage.setItem('admin', 'true');
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['']);
          }
        },
        (response) => {
          const { errors } = response.error;
          this.errors = errors ? errors : response.error;
        }
      );
  }

  goBack() {
    this.router.navigate(['']);
  }
}
