import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartProduct } from 'src/app/admin/components/orders/orders.component';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService],
})
export class CartComponent implements OnInit {
  private products: CartProduct[] = [];
  msgs: Message[] = [];
  loading = false;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
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
