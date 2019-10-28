import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { CategoryPipe } from '../../pipes/category.pipe';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, DoCheck {
  products;
  category;
  searchText;
  url = environment.url;

  constructor(public productService: ProductService, private cartService: CartService,
    public categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProducts();
  }

  ngDoCheck() {
    this.categoryService.category = this.route.snapshot.params['category'];
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }

}
