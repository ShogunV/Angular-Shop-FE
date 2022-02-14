import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { FrontStoreRoutingModule } from './front-store-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CategoryPipe } from './pipes/category.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FrontStoreRoutingModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProductComponent,
    ProductsComponent,
    PageNotFoundComponent,
    CategoryPipe,
    SearchPipe,
  ],
  providers: [CategoryService, AuthService, ProductService],
  exports: [NavbarComponent, FooterComponent, LoaderComponent, RouterModule],
})
export class FrontStoreModule {}
