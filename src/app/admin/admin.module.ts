import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { GrowlModule } from 'primeng/components/growl/growl';
import { AccordionModule } from 'primeng/components/accordion/accordion';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    GrowlModule,
    AccordionModule,
    LoaderModule
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent, CategoriesComponent, OrdersComponent, ProductsComponent, UsersComponent]
})
export class AdminModule { }
