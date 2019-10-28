import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { NgForm } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { AdminService } from '../../services/admin.service';
import { CartService } from '../../../front-store/services/cart.service';
import { Product } from '../../../front-store/models/Product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    url = environment.url;
    loading = false;

  @ViewChild('fileInput') fileInput;
  @ViewChild('editFileInput') editFileInput;

    displayNewDialog: boolean;
    displayEditDialog: boolean;

    errors = [];

    msgs: Message[] = [];

      product;

      selectedProduct;

      newProduct;

      products = [];
      categories= [];

      userForm: any;

      constructor(private adminService: AdminService, private confirmationService: ConfirmationService, private cartService: CartService) {}

      ngOnInit() {
        this.loading = true;
        this.adminService.getProducts().subscribe(data => {
            this.loading = false;
            this.products = data['products'];
            this.categories = data['categories'];
        });
      }

      showDialogToAdd() {
          this.newProduct = true;
          this.product = {};
          this.displayNewDialog = true;
      }

      back() {
          this.displayNewDialog = false;
          this.displayEditDialog = false;
          this.errors = [];
      }

      onSubmit(form: NgForm) {
        this.loading = true;
        let fileBrowser = this.fileInput.nativeElement;

        if (fileBrowser.files && fileBrowser.files[0]) {
            let formData = new FormData();
            formData.append('image', fileBrowser.files[0]);
            formData.append('price', form.value.price);
            formData.append('title', form.value.title);
            formData.append('category', form.value.category);
            formData.append('discount', form.value.discount);
            formData.append('description', form.value.description);
            this.adminService.saveProduct(formData).subscribe(data => {
                this.products = data['products'];
                this.loading = false;
                this.msgs = [{severity: 'success', summary: 'Confirmed', detail: `Product created`}];
                this.product = null;
                this.errors = [];
                this.displayNewDialog = false;
            },
                response => {
                    this.loading = false;
                    this.errors = response.error;
                }
            );
        } else {
            this.adminService.saveProduct(form.value).subscribe(data => {
                this.products = data['products'];
                this.loading = false;
                this.msgs = [{severity: 'success', summary: 'Confirmed', detail: `Product created`}];
                this.product = null;
                this.errors = [];
                this.displayNewDialog = false;
            },
                response => {
                    this.loading = false;
                    this.errors = response.error;
                }
            );
        }
      }

      onEditSubmit(form: NgForm) {
        this.loading = true;
        let fileBrowser = this.editFileInput.nativeElement;

        if (fileBrowser.files && fileBrowser.files[0]) {
            let formData = new FormData();
            formData.append('id', this.product.id);
            formData.append('image', fileBrowser.files[0]);
            formData.append('price', form.value.price);
            formData.append('title', form.value.title);
            formData.append('category', form.value.category);
            formData.append('discount', form.value.discount);
            formData.append('description', form.value.description);
            this.adminService.editProduct(formData).subscribe(data => {
                this.products = data['products'];
                this.loading = false;
                this.msgs = [{severity: 'success', summary: 'Confirmed', detail: `Product updated`}];
                this.product = null;
                this.errors = [];
                this.displayEditDialog = false;
            },
                response => {
                    this.loading = false;
                    this.errors = response.error;
                }
            );
        } else {
            form.value.id = this.product.id;
            this.adminService.editProduct(form.value).subscribe(data => {
                this.products = data['products'];
                this.loading = false;
                this.msgs = [{severity: 'success', summary: 'Confirmed', detail: `Product updated`}];
                this.product = null;
                this.errors = [];
                this.displayEditDialog = false;
            },
                response => {
                    this.loading = false;
                    this.errors = response.error;
                }
            );
        }
      }

      deleteProduct(product) {
        const id = product.id;
        this.confirmationService.confirm({
            message: `Do you want to delete ${product.title}?`,
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.loading = true;
                this.adminService.deleteProduct(id).subscribe(data => {
                    this.loading = false;
                    this.products = data['products'];
                });
                this.msgs = [{severity: 'info', summary: 'Confirmed', detail: `${product.title} deleted`}];
            },
            reject: () => {
                this.loading = false;
            }
        });
      }

      save() {
          let products = [...this.products];
          if (this.newProduct) {
            products.push(this.product);
          } else {
            products[this.findSelectedProductIndex()] = this.product;
          }
          this.products = products;
          this.product = null;
          this.displayNewDialog = false;
      }

      delete() {
          let index = this.findSelectedProductIndex();
          this.products = this.products.filter((val, i) => i !== index);
          this.product = null;
          this.displayNewDialog = false;
      }

      onRowSelect(product) {
          this.newProduct = false;
          this.product = product;
          this.displayEditDialog = true;
      }

      findSelectedProductIndex(): number {
          return this.products.indexOf(this.selectedProduct);
      }
  }

