import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { AdminService } from '../../services/admin.service';
import { CartService } from '../../../front-store/services/cart.service';
import { Product } from '../../../front-store/models/Product.model';
import { Category } from '../categories/categories.component';

export interface ProductResponse {
  complete: boolean;
  products: Product[];
  categories: Category[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  url = environment.url;
  loading = false;

  @ViewChild('fileInput') fileInput: any;
  @ViewChild('editFileInput') editFileInput: any;

  emptyProduct: Product = {
    id: 0,
    title: '',
    image: '',
    description: '',
    category: '',
    category_id: 0,
    price: 0,
    discount: 0,
  };

  productDialog: boolean = false;
  errors: any = null;
  msgs: Message[] = [];
  product: Product = this.emptyProduct;
  products: Product[] = [];
  categories: Category[] = [];
  submitted: boolean = false;
  userForm: any;
  newImage: boolean = false;

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    public cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.adminService.getProducts().subscribe((data: ProductResponse) => {
      this.loading = false;
      this.products = data['products'];
      this.categories = data['categories'];
    });
  }

  openNew() {
    this.product = this.emptyProduct;
    this.submitted = false;
    this.productDialog = true;
  }

  back() {
    this.productDialog = false;
    this.errors = null;
  }

  onSubmit() {
    this.loading = true;
    const { files } = this.fileInput;

    if (
      this.product.title.trim() &&
      this.product.category_id &&
      this.product.price
    ) {
      const formData = new FormData();
      if (this.newImage && files && files[0]) {
        formData.append('image', files[0]);
      }
      formData.append('title', this.product.title);
      formData.append('description', this.product.description);
      formData.append('price', String(this.product.price));
      formData.append('category_id', String(this.product.category_id));
      formData.append('discount', String(this.product.discount));

      if (this.product.id) {
        formData.append('id', String(this.product.id));
        formData.append('_method', 'put');
        this.adminService.editProduct(formData).subscribe(
          (data) => {
            this.products = data['products'];
            this.loading = false;
            this.messageService.add({
              key: 'products-toast',
              severity: 'success',
              summary: 'Confirmed',
              detail: `Product updated`,
            });
            this.product = this.emptyProduct;
            this.errors = null;
            this.productDialog = false;
          },
          (response) => {
            this.loading = false;
            this.errors = response.error;
          }
        );
      } else {
        this.adminService.saveProduct(formData).subscribe(
          (data) => {
            this.products = data['products'];
            this.loading = false;
            this.messageService.add({
              key: 'products-toast',
              severity: 'success',
              summary: 'Confirmed',
              detail: `Product created`,
            });
            this.product = this.emptyProduct;
            this.errors = null;
            this.productDialog = false;
          },
          (response) => {
            this.loading = false;
            this.errors = response.error;
          }
        );
      }
    }
  }

  onImageSelect(e: any) {
    this.newImage = true;
  }

  getImageTitleString = (image: string) => {
    const imageStr = image.replace('images/', '');
    return imageStr.length > 25 ? imageStr.substr(0, 24) + '...' : imageStr;
  };

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  onEditSubmit(form: NgForm) {
    this.loading = true;
    let fileBrowser = this.editFileInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      formData.append('id', `${this.product.id}`);
      formData.append('image', fileBrowser.files[0]);
      formData.append('price', form.value.price);
      formData.append('title', form.value.title);
      formData.append('category', form.value.category);
      formData.append('discount', form.value.discount);
      formData.append('description', form.value.description);
      this.adminService.editProduct(formData).subscribe(
        (data) => {
          this.products = data['products'];
          this.loading = false;
          this.msgs = [
            {
              severity: 'success',
              summary: 'Confirmed',
              detail: `Product updated`,
            },
          ];
          this.product = this.emptyProduct;
          this.errors = null;
          this.productDialog = false;
        },
        (response) => {
          this.loading = false;
          this.errors = response.error;
        }
      );
    } else {
      form.value.id = this.product.id;
      this.adminService.editProduct(form.value).subscribe(
        (data) => {
          this.products = data['products'];
          this.loading = false;
          this.msgs = [
            {
              severity: 'success',
              summary: 'Confirmed',
              detail: `Product updated`,
            },
          ];
          this.product = this.emptyProduct;
          this.errors = null;
          this.productDialog = false;
        },
        (response) => {
          this.loading = false;
          this.errors = response.error;
        }
      );
    }
  }

  deleteProduct(product: Product) {
    const id = product.id;
    this.confirmationService.confirm({
      message: `Do you want to delete ${product.title}?`,
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.loading = true;
        this.adminService.deleteProduct(id).subscribe((data) => {
          this.loading = false;
          this.products = data['products'];
        });
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmed',
            detail: `${product.title} deleted`,
          },
        ];
      },
      reject: () => {
        this.loading = false;
      },
    });
  }
}
