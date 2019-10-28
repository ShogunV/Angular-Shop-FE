import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/first';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors;
  login;
  private alive = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.authService.login(
      form.value.email,
      form.value.password
    ).first().subscribe(response => {
      // localStorage.setItem('token', response['token']);
      // localStorage.setItem('username', response['username']);
      // localStorage.setItem('email', response['email']);
      localStorage['token'] = response['token'];
      localStorage['username'] = response['username'];
      localStorage['email'] = response['email'];
      if (response['admin']) {
        // this.authService.isAdmin = response['admin'];
        localStorage['admin'] = response['admin'];
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['']);
      }
    },
      response => {
        this.errors = response.error;
      }
    );
  }

  goBack () {
    this.router.navigate(['']);
  }
}
