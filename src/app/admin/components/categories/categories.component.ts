import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { GrowlModule } from 'primeng/components/growl/growl';

import { AdminService } from '../../services/admin.service';
import { CategoryService } from '../../../front-store/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = [];
  errors = [];
  loading = false;

  msgs: Message[] = [];

  newCategory: boolean;
  editCategory: boolean;
  category;
  displayNewDialog: boolean;
  displayEditDialog: boolean;

  constructor(private adminService: AdminService, private confirmationService: ConfirmationService,
    private categoryService: CategoryService) { }

  ngOnInit() {
      this.loading = true;
      this.adminService.getCategories().subscribe(data => {
        this.loading = false;
        this.categories = data['categories'];
    });
  }

  showDialogToAdd() {
    this.newCategory = true;
    this.category = {};
    this.displayNewDialog = true;
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.category = {name: form.value.name};
    this.adminService.saveCategory(this.category).subscribe(data => {
      this.categories = data['categories'];
      this.loading = false;
      this.categoryService.categories = data['categories'];
      this.msgs = [{severity: 'success', summary: 'Confirmed', detail: `Category created`}];
      this.category = null;
      this.errors = [];
      this.displayNewDialog = false;
    },
      response => {
        this.loading = false;
        this.errors = response.error;
      }
    );
  }

  showDialogToEdit(category) {
    this.newCategory = false;
    this.category = category;
    this.displayEditDialog = true;
  }

  onEditSubmit(form: NgForm) {
    this.loading = true;
    this.category = {id: this.category.id, name: form.value.name};
    this.adminService.editCategory(this.category).subscribe(data => {
      this.categories = data['categories'];
      this.loading = false;
      this.categoryService.categories = data['categories'];
      this.msgs = [{severity: 'success', summary: 'Confirmed', detail: `Category updated`}];
      this.category = null;
      this.errors = [];
      this.displayEditDialog = false;
    },
      response => {
        this.loading = false;
        this.errors = response.error;
      }
    );
  }

  deleteCategory(category) {
    const id = category.id;
    this.confirmationService.confirm({
        message: `Do you want to delete ${category.name}?`,
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
            this.loading = true;
            this.adminService.deleteCategory(id).subscribe(data => {
                this.categories = data['categories'];
                this.loading = false;
                this.categoryService.categories = data['categories'];
            });
            this.msgs = [{severity: 'info', summary: 'Confirmed', detail: `${category.name} deleted`}];
        },
        reject: () => {
          this.loading = false;
        }
    });
  }

  back() {
    this.displayNewDialog = false;
    this.displayEditDialog = false;
    this.errors = [];
  }

}
