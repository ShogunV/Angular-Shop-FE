import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

import { environment } from '../../../environments/environment';
import { Product } from './../models/Product.model';
import { AuthService } from '../services/auth.service';
import { CartProduct } from '../models/CartProduct.model';

type CheckoutData = {
  completed: boolean;
  url: string;
};

@Injectable()
export class CartService {
  cart: CartProduct[] = [];
  msgs: Message[] = [];
  loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {}

  addProduct(item: CartProduct) {
    const newCart = [...this.cart];
    const inCart = newCart.find((el) => el.id === item.id);
    if (inCart) {
      inCart.quantity++;
      return (this.cart = newCart);
    } else {
      const { id, title, price, discount } = item;
      const cartProduct = { id, title, price, discount, quantity: 1 };
      return (this.cart = [...this.cart, cartProduct]);
    }
  }

  deleteOneProduct(item: CartProduct) {
    if (item.quantity <= 1) {
      return (this.cart = this.cart.filter(
        (cartItem) => cartItem.id !== item.id
      ));
    } else {
      const newCart = [...this.cart];
      const inCart = newCart.find((cartProduct) => cartProduct.id === item.id);
      if (!inCart) {
        return;
      }
      inCart.quantity--;
      return (this.cart = newCart);
    }
  }

  deleteProducts(item: CartProduct) {
    return (this.cart = this.cart.filter(
      (cartItem) => cartItem.id !== item.id
    ));
  }

  clearCart() {
    return (this.cart = []);
  }

  getProducts(): CartProduct[] {
    return this.cart;
  }

  getDiscountPrice(item: Product | CartProduct) {
    return Math.round(item.price * (1 - item.discount / 100));
  }

  getProductsPrice(item: CartProduct) {
    return Math.round(item.quantity * this.getDiscountPrice(item));
  }

  getTotalPrice() {
    return this.cart.reduce((sum, cartItem) => {
      return (
        (sum +=
          Math.round(this.getDiscountPrice(cartItem)) * cartItem.quantity),
        sum
      );
    }, 0);
  }

  getTotalQuantity() {
    return this.cart.reduce((tq, cartItem) => {
      return (tq += cartItem.quantity);
    }, 0);
  }

  checkout() {
    if (this.authService.isLoggedIn()) {
      return this.confirmationService.confirm({
        message: `This is a portfolio web store. You CAN NOT buy anything here. DO NOT try to submit your real information.
        For card number use 4242 4242 4242 4242,
        any expiration date in the future,
        any three digit CVC code.`,
        header: 'Warning',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true;
          const authToken = localStorage.getItem('token');
          this.http
            .post<CheckoutData>(
              environment.apiUrl + 'checkout-session',
              {
                cart: this.cart,
                total: this.getTotalPrice(),
                totalQuantity: this.getTotalQuantity(),
              },
              {
                headers: new HttpHeaders().set(
                  'Authorization',
                  `Bearer ${authToken}`
                ),
              }
            )
            .subscribe(
              (data: CheckoutData) => {
                if (data.url) {
                  return (window.location.href = data.url);
                }
                this.clearCart();
                this.loading = false;
                return this.messageService.add({
                  key: 'cart-toast',
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Your purchase was not successful! Sorry!!!',
                });
              },
              (response) => {
                this.loading = false;
                return this.messageService.add({
                  key: 'cart-toast',
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Your purchase was not successful! Sorry!!!',
                });
              }
            );
        },

        reject: () => {},
      });
    } else {
      return this.messageService.add({
        key: 'cart-toast',
        severity: 'info',
        summary: 'Info',
        detail: 'You need to be logged in to continue with your purchase',
      });
    }
  }
}
