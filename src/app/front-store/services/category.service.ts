import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService {
  categories = [];
  category;

  constructor(private http: HttpClient) { }

  changeCategory(category) {
    this.category = category;
  }

  getCategories() {
    return this.http.get(environment.apiUrl + 'categories');
  }

}

