import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  errors;

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string, password_confirmation: string) {
    return this.http.post(environment.apiUrl + 'register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    });
  }

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl + 'login', {
      email: email,
      password: password,
    });
  }

  getToken() {
    // return localStorage.getItem('token');
    return localStorage['token'];
  }

  getUsername() {
    // return localStorage.getItem('username');
    return localStorage['username'];
  }

  getEmail() {
    // return localStorage.getItem('email');
    return localStorage['email'];
  }

  logout() {
    localStorage['token'] = undefined;
    localStorage['admin'] = undefined;
    localStorage['username'] = undefined;
    localStorage['email'] = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  isLoggedIn() {
    // return localStorage.getItem('token') ? true : false;
    return localStorage['token'] ? true : false;
  }

  isAdmin() {
    // return localStorage.getItem('admin') ? true : false;
    return localStorage['admin'] ? true : false;
  }
}

