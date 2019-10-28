import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class ProductService {
  products = [];
  prods;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(environment.apiUrl + 'products').subscribe(data => {
      this.products = data['products'];
    });
  }

  getProduct(id) {
    if (!this.products.length) {
      return this.http.get(environment.apiUrl + 'products').subscribe(data => {
        this.prods = data['products'].filter(prod => prod.id === id);
      });
    }
    return this.prods = this.products.filter(prod => prod.id === id);
  }

}

