import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.register(
      form.value.name,
      form.value.email,
      form.value.password,
      form.value.password_confirmation
    ).first().subscribe(response => {
      // localStorage.setItem('token', response['token']);
      // localStorage.setItem('username', response['username']);
      // localStorage.setItem('email', response['email']);
      localStorage['token'] = response['token'];
      localStorage['username'] = response['username'];
      localStorage['email'] = response['email'];
      this.router.navigate(['']);
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
