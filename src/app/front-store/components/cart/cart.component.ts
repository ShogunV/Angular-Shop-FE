import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartProduct } from 'src/app/admin/components/orders/orders.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  private products: CartProduct[] = [];
  loading = false;

  constructor(
    public cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
    this.cartService.msgs = [];
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }

  removeOneFromCart(product: CartProduct) {
    this.cartService.deleteOneProduct(product);
    this.products = this.cartService.getProducts();
  }

  removeFromCart(product: Product) {
    this.cartService.deleteProducts(product);
    this.products = this.cartService.getProducts();
  }

  removeAllFromCart() {
    this.cartService.clearCart();
    this.products = this.cartService.getProducts();
  }

  onCheckout() {
    this.cartService.checkout();
  }
}
