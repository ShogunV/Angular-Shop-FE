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
import { Product } from 'src/app/front-store/models/Product.model';

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
      environment.apiUrl + 'admin/product/store',
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
      environment.apiUrl + 'admin/product/edit',
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
      environment.apiUrl + 'admin/product/' + id,
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }

  // deleteProduct(id) {
  //   return this.http.post<ProductResponse>(environment.apiUrl + 'admin/product/delete/' + id, id, {
  //     headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
  //     .set('Accept', 'application/json')
  //   });
  // }

  saveCategory(category: Category) {
    return this.http.post<CategoryResponse>(
      environment.apiUrl + 'admin/category/store',
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
    return this.http.put<CategoryResponse>(
      environment.apiUrl + 'admin/category/' + category.id,
      category,
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }

  // editCategory(category) {
  //   return this.http.post<CategoryResponse>(environment.apiUrl + 'admin/category/' + category.id, category, {
  //     headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
  //     .set('Accept', 'application/json')
  //   });
  // }

  deleteCategory(id: number) {
    return this.http.delete<CategoryResponse>(
      environment.apiUrl + 'admin/category/' + id,
      {
        headers: new HttpHeaders()
          .delete('Content-Type')
          .set('Authorization', `Bearer ${this.authService.getToken()}`)
          .set('Accept', 'application/json'),
      }
    );
  }

  // deleteCategory(id) {
  //   return this.http.post(environment.apiUrl + 'admin/category/delete/' + id, id, {
  //     headers: new HttpHeaders().delete('Content-Type').set('Authorization', `Bearer ${this.authService.getToken()}`)
  //     .set('Accept', 'application/json')
  //   });
  // }
}
