import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { LoginResponse } from '../components/login/login.component';

@Injectable()
export class AuthService {
  errors: any;

  constructor(private http: HttpClient) {}

  register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http.post<LoginResponse>(environment.apiUrl + 'register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    });
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(environment.apiUrl + 'login', {
      email: email,
      password: password,
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  isAdmin() {
    return localStorage.getItem('admin') ? true : false;
  }
}
