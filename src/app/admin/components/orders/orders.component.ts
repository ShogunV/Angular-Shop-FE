import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { SharedModule } from 'primeng/components/common/shared';

import { AdminService } from '../../services/admin.service';
import { CartService } from '../../../front-store/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders = [];
  loading = false;
  ie;

  constructor(private adminService: AdminService, private cartService: CartService) { }

  ngOnInit() {
    this.loading = true;
    this.adminService.getOrders().subscribe(data => {
      this.loading = false;
      this.orders = data['orders'];
    });

    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');

    if (msie > 0  || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return this.ie = true;
    } else {
      return this.ie = false;
    }
  }

}

