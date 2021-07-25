import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { LoaderModule } from '../loader/loader.module';
import { AdminService } from './services/admin.service';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    AccordionModule,
    LoaderModule,
    FileUploadModule,
  ],
  exports: [HomeComponent],
  declarations: [
    HomeComponent,
    CategoriesComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
  ],
  providers: [AdminService, MessageService],
})
export class AdminModule {}
