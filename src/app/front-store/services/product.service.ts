import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Product } from '../models/Product.model';
import { ProductResponse } from 'src/app/admin/components/products/products.component';

@Injectable()
export class ProductService {
  products: Product[] = [];
  prods: Product[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  getProducts() {
    this.loading = true;
    return this.http
      .get<ProductResponse>(environment.apiUrl + 'products')
      .subscribe((data: ProductResponse) => {
        this.products = data['products'];
        this.loading = false;
      });
  }

  getProduct(id: number) {
    if (!this.products.length) {
      this.loading = true;
      return this.http
        .get<ProductResponse>(environment.apiUrl + 'products')
        .subscribe((data: ProductResponse) => {
          this.prods = data['products'].filter(
            (prod: Product) => prod.id === id
          );
          this.loading = false;
        });
    }
    return (this.prods = this.products.filter(
      (prod: Product) => prod.id === id
    ));
  }
}
