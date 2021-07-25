import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  errors: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.authService
      .register(
        form.value.name,
        form.value.email,
        form.value.password,
        form.value.password_confirmation
      )
      .pipe(first())
      .subscribe(
        (response: LoginResponse) => {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('username', response['user'].name);
          localStorage.setItem('email', response['user'].email);
          this.router.navigate(['']);
        },
        (response) => {
          this.errors = response.error;
        }
      );
  }

  goBack() {
    this.router.navigate(['']);
  }
}
