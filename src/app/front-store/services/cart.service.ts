import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';

import { environment } from '../../../environments/environment';
import { Product } from './../models/Product.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CartService {
  public cart: Product[] = [];
  msgs: Message[] = [];
  loading = false;

  constructor(private http: HttpClient, private authService: AuthService, private confirmationService: ConfirmationService) { }

  addProduct(item: Product) {
    const a = this.cart.filter(e => e.id === item.id);
    if (a.length > 0) {
      const b = a[ a.length - 1 ];
      const c = this.cart.indexOf(b);
      this.cart[c].quantity++;
    } else {
      item.quantity = 1;
      this.cart.push(item);
    }
  }

  deleteOneProduct(item: Product) {
    if (item.quantity <= 1) {
      this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
    } else {
      this.cart[this.cart.indexOf(item)].quantity--;
    }
  }

  deleteProducts(item: Product) {
    this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
  }

  clearCart() {
    this.cart = [];
  }

  getProducts(): Product[] {
    return this.cart;
  }

  getDiscountPrice(item: Product) {
    return Math.round(item.price * (1 - (item.discount / 100)));
  }

  getProductsPrice(item: Product) {
    return Math.round(item.quantity * this.getDiscountPrice(item));
  }

  getTotalPrice() {
    return this.cart.reduce((sum, cartItem) => {
      return sum += Math.round(this.getDiscountPrice(cartItem)) * cartItem.quantity, sum;
    }, 0);
  }

  getTotalQuantity() {
    return this.cart.reduce((tq, cartItem) => {
      return tq += cartItem.quantity;
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
          const handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_9bvS1qEKfI4a2pFl2dW0ywZz',
            // image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            image: environment.url + 'img/logo1.png',
            locale: 'auto',
            email: this.authService.getEmail(),
            token: (token: any) => {
              // You can access the token ID with `token.id`.
              // Get the token ID to your server-side code for use.
              this.loading = true;
              const authToken = localStorage.getItem('token');
              this.http.post(environment.apiUrl + 'purchase', {
                stripeEmail: token.email,
                stripeToken: token.id,
                cart: this.cart,
                total: this.getTotalPrice(),
                totalQuantity: this.getTotalQuantity()
              }, {
                headers: new HttpHeaders().set('Authorization', `Bearer ${authToken}`),
              })
                .subscribe(data => {
                  this.clearCart();
                  this.loading = false;
                  this.msgs = [{severity: 'success', summary: 'Success', detail: 'Your purchase was successful'}];
                },
                response => {
                  this.loading = false;
                  this.msgs = [{severity: 'error', summary: 'Failed', detail: 'Your purchase was not successful! Sorry!!!'}];
                }
              );
            }
          });

          handler.open({
            name: 'Larbonne',
            description: 'Checkout',
            amount: this.getTotalPrice()
          });
        },
        reject: () => {
        }
      });
    } else {
      this.msgs = [{severity: 'info', summary: 'Info', detail: 'You need to be logged in to continue with your purchase'}];
    }
  }
}

