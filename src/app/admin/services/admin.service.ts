import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../front-store/services/auth.service';
import {
  Category,
  CategoryResponse,
} from '../components/categories/categories.component';
import { OrderResponse } from '../components/orders/orders.component';
import { ProductResponse } from '../components/products/products.component';
import { UserResponse } from '../components/users/users.component';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrders() {
    return this.http.get<OrderResponse>(environment.apiUrl + 'admin/orders', {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.getToken()}`
      ),
    });
  }

  getProducts() {
    return this.http.get<ProductResponse>(
      environment.apiUrl + 'admin/products',
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.authService.getToken()}`
        ),
      }
    );
  }

  getUsers() {
    return this.http.get<UserResponse>(environment.apiUrl + 'admin/users', {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.getToken()}`
      ),
    });
  }

  getCategories() {
    return this.http.get<CategoryResponse>(
      environment.apiUrl + 'admin/categories',
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.authService.getToken()}`
        ),
      }
    );
  }

  saveProduct(form: any) {
    return this.http.post<ProductResponse>(
      environment.apiUrl + 'admin/products/',
      form,
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }

  editProduct(form: any) {
    return this.http.post<ProductResponse>(
      environment.apiUrl + 'admin/products/' + form.get('id'),
      form,
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<ProductResponse>(
      environment.apiUrl + 'admin/products/' + id,
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }

  saveCategory(category: Category) {
    return this.http.post<CategoryResponse>(
      environment.apiUrl + 'admin/categories',
      category,
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }

  editCategory(category: Category) {
    return this.http.post<CategoryResponse>(
      environment.apiUrl + 'admin/categories/' + category.id,
      { ...category, _method: 'put' },
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }

  deleteCategory(id: number) {
    return this.http.delete<CategoryResponse>(
      environment.apiUrl + 'admin/categories/' + id,
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }
}
