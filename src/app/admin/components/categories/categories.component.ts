import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

import { AdminService } from '../../services/admin.service';
import { CategoryService } from '../../../front-store/services/category.service';
import { Category } from 'src/app/front-store/models/Category.model';

type CategoryErrors = {
  title: string[];
};

export type CategoryResponse = {
  complete: boolean;
  categories: Category[];
};

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  noErrors: CategoryErrors = { title: [] };
  categoryErrors: CategoryErrors = this.noErrors;
  loading = false;

  emptyCategory = { id: 0, title: '' };

  msgs: Message[] = [];

  category: Category = this.emptyCategory;
  categoryDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.adminService.getCategories().subscribe((data: CategoryResponse) => {
      this.loading = false;
      this.categories = data['categories'];
    });
  }

  openNew() {
    this.category = this.emptyCategory;
    this.categoryDialog = true;
    this.submitted = false;
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.category.title) {
      if (this.category.id) {
        this.adminService.editCategory(this.category).subscribe(
          (data: CategoryResponse) => {
            this.categories = data['categories'];
            this.loading = false;
            this.categoryService.categories = data['categories'];
            this.messageService.add({
              key: 'categories-toast',
              severity: 'success',
              summary: 'Confirmed',
              detail: `Category updated`,
            });
            this.category = this.emptyCategory;
            this.categoryErrors = this.noErrors;
            this.categoryDialog = false;
          },
          (response) => {
            this.loading = false;
            if (response.status === 422) {
              return (this.categoryErrors = {
                ...this.categoryErrors,
                ...response.error.errors,
              });
            }
            return this.messageService.add({
              key: 'categories-toast',
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong!',
            });
          }
        );
      } else {
        this.adminService.saveCategory(this.category).subscribe(
          (data: CategoryResponse) => {
            this.categories = data['categories'];
            this.loading = false;
            this.categoryService.categories = data['categories'];
            this.messageService.add({
              key: 'categories-toast',
              severity: 'success',
              summary: 'Confirmed',
              detail: `Category created`,
            });
            this.category = this.emptyCategory;
            this.categoryErrors = this.noErrors;
            this.categoryDialog = false;
          },
          (response) => {
            this.loading = false;
            if (response.status === 422) {
              return (this.categoryErrors = {
                ...this.categoryErrors,
                ...response.error.errors,
              });
            }
            return this.messageService.add({
              key: 'categories-toast',
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong!',
            });
          }
        );
      }
    }
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    const id = category.id;
    this.confirmationService.confirm({
      message: `Do you want to delete ${category.title}?`,
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.loading = true;
        this.adminService
          .deleteCategory(id)
          .subscribe((data: CategoryResponse) => {
            this.categories = data['categories'];
            this.loading = false;
            this.categoryService.categories = data['categories'];
          });
        return this.messageService.add({
          key: 'categories-toast',
          severity: 'info',
          summary: 'Confirmed',
          detail: `${category.title} deleted`,
        });
      },
      reject: () => {
        this.loading = false;
      },
    });
  }

  back() {
    this.categoryDialog = false;
    this.categoryErrors = this.noErrors;
    this.submitted = false;
  }
}
