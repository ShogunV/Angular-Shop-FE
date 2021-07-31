import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { CartService } from '../../../front-store/services/cart.service';
import { Order } from 'src/app/front-store/models/Order.model';

export type OrderResponse = {
  complete: boolean;
  orders: Order[];
};

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;

  constructor(
    private adminService: AdminService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.adminService.getOrders().subscribe((data: OrderResponse) => {
      this.loading = false;
      this.orders = data['orders'];
    });
  }
}
