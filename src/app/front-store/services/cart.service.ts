import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

import { environment } from '../../../environments/environment';
import { Product } from './../models/Product.model';
import { AuthService } from '../services/auth.service';
import { CartProduct } from 'src/app/admin/components/orders/orders.component';
import { Router } from '@angular/router';

type CheckoutData = {
  completed: boolean;
  url: string;
};

@Injectable()
export class CartService {
  public cart: CartProduct[] = [];
  msgs: Message[] = [];
  loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  addProduct(item: Product) {
    const inCart = this.cart.find((el) => el.id === item.id);
    if (inCart) {
      inCart.quantity++;
      return this.cart
    } else {
      const newItem = { ...item, quantity: 1 };
      return this.cart = [...this.cart, newItem];
    }
  }

  deleteOneProduct(item: CartProduct) {
    if (item.quantity <= 1) {
      this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
    } else {
      this.cart[this.cart.indexOf(item)].quantity--;
    }
  }

  deleteProducts(item: Product) {
    this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
  }

  clearCart() {
    this.cart = [];
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
      this.confirmationService.confirm({
        message: `This is a portfolio web store. You CAN NOT buy anything here. DO NOT try to submit your real information.
        For card number use 4242 4242 4242 4242,
        any expiration date in the future,
        any three digit CVC code.`,
        header: 'Warning',
        icon: 'fa fa-exclamation-triangle',
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
                return (this.msgs = [
                  {
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'Your purchase was not successful! Sorry!!!',
                  },
                ]);
              },
              (response) => {
                this.loading = false;
                this.msgs = [
                  {
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'Your purchase was not successful! Sorry!!!',
                  },
                ];
              }
            );
        },

        reject: () => {},
      });
    } else {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Info',
          detail: 'You need to be logged in to continue with your purchase',
        },
      ];
    }
  }
}
