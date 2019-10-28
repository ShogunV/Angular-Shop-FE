import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../front-store/services/auth.service';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrders() {
    return this.http.get(environment.apiUrl + 'admin/orders', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`)
    });
  }

  getProducts() {
    return this.http.get(environment.apiUrl + 'admin/products', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`)
    });
  }

  getUsers() {
    return this.http.get(environment.apiUrl + 'admin/users', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`)
    });
  }

  getCategories() {
    return this.http.get(environment.apiUrl + 'admin/categories', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`)
    });
  }

  saveProduct(form) {
    return this.http.post(environment.apiUrl + 'admin/product/store', form, {
      headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
      .set('Accept', 'application/json')
    });
  }

  editProduct(form) {
    return this.http.post(environment.apiUrl + 'admin/product/edit', form, {
      headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
      .set('Accept', 'application/json')
    });
  }

  deleteProduct(id) {
    return this.http.delete(environment.apiUrl + 'admin/product/' + id, {
      headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
      .set('Accept', 'application/json')
    });
  }

  // deleteProduct(id) {
  //   return this.http.post(environment.apiUrl + 'admin/product/delete/' + id, id, {
  //     headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
  //     .set('Accept', 'application/json')
  //   });
  // }

  saveCategory(category) {
    return this.http.post(environment.apiUrl + 'admin/category/store', category, {
      headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
      .set('Accept', 'application/json')
    });
  }

  editCategory(category) {
    return this.http.put(environment.apiUrl + 'admin/category/' + category.id, category, {
      headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
      .set('Accept', 'application/json')
    });
  }

  // editCategory(category) {
  //   return this.http.post(environment.apiUrl + 'admin/category/' + category.id, category, {
  //     headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
  //     .set('Accept', 'application/json')
  //   });
  // }

  deleteCategory(id) {
    return this.http.delete(environment.apiUrl + 'admin/category/' + id, {
      headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
      .set('Accept', 'application/json')
    });
  }

  // deleteCategory(id) {
  //   return this.http.post(environment.apiUrl + 'admin/category/delete/' + id, id, {
  //     headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
  //     .set('Accept', 'application/json')
  //   });
  // }

}
