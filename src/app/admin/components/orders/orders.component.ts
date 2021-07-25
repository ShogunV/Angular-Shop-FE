import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { CartService } from '../../../front-store/services/cart.service';

export type Product = {
  id: number;
  title: string;
  description: string;
  image: File | string;
  price: number;
  discount: number;
  category: string;
  category_id: number;
};

export interface CartProduct extends Product {
  quantity: number;
}

export type Order = {
  id: number;
  user: string;
  created_at: string;
  total: number;
  data: CartProduct[];
};

export interface OrderResponse {
  complete: boolean;
  orders: Order[];
}

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
