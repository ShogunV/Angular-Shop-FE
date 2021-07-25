import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/admin/components/categories/categories.component';
import { CartProduct } from 'src/app/admin/components/orders/orders.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, DoCheck {
  products: Product[] | null = [];
  category: Category | null = null;
  searchText: string = '';
  url = environment.url;

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    public categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getProducts();
  }

  ngDoCheck() {
    this.categoryService.category = this.route.snapshot.params['category'];
  }

  addToCart(product: Product) {
    const cartProduct: CartProduct = { ...product, quantity: 1 };
    this.cartService.addProduct(cartProduct);
  }
}
