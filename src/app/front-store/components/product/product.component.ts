import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CartProduct } from '../../models/CartProduct.model';
import { Product } from '../../models/Product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: number = 0;
  url = environment.url;

  constructor(
    public cartService: CartService,
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.productService.getProduct(this.id);
  }

  addToCart(product: Product) {
    const cartProduct: CartProduct = { ...product, quantity: 1 };
    return this.cartService.addProduct(cartProduct);
  }
}
