import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {
  Category,
  CategoryResponse,
} from 'src/app/admin/components/categories/categories.component';

@Injectable()
export class CategoryService {
  categories: Category[] = [];
  category: string | null = null;

  constructor(private http: HttpClient) {}

  changeCategory(category: string) {
    this.category = category;
  }

  getCategories() {
    return this.http.get<CategoryResponse>(environment.apiUrl + 'categories');
  }
}
