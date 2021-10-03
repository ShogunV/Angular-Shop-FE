import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product.model';
import { CartService } from '../../services/cart.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CartProduct } from '../../models/CartProduct.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  msgs: Message[] = [];
  loading = false;

  constructor(
    public cartService: CartService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cartService.msgs = [];
  }

  ngAfterViewInit() {
    const success = this.route.snapshot.queryParamMap.get('success');
    if (success) {
      this.messageService.add({
        key: 'cart-toast',
        severity: 'success',
        summary: 'Success',
        detail: 'Your purchase was successful!',
      });
      return this.cdr.detectChanges();
    }
    const canceled = this.route.snapshot.queryParamMap.get('canceled');
    if (canceled) {
      this.messageService.add({
        key: 'cart-toast',
        severity: 'error',
        summary: 'Failed',
        detail: 'Your purchase was not successful! Sorry!!!',
      });
      return this.cdr.detectChanges();
    }
  }

  addToCart(product: CartProduct) {
    this.cartService.addProduct(product);
  }

  removeOneFromCart(product: CartProduct) {
    this.cartService.deleteOneProduct(product);
  }

  removeFromCart(product: CartProduct) {
    this.cartService.deleteProducts(product);
  }

  removeAllFromCart() {
    this.cartService.clearCart();
  }

  onCheckout() {
    return this.cartService.checkout();
  }
}
