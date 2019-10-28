import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';

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
import { CartService } from './services/cart.service';
import { CategoryPipe } from './pipes/category.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FrontStoreRoutingModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    NoopAnimationsModule,
    LoaderModule,
    GrowlModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProductComponent,
    ProductsComponent,
    PageNotFoundComponent,
    CategoryPipe,
    SearchPipe
  ],
  providers: [CategoryService, AuthService, ProductService, CartService, ConfirmationService],
  exports: [NavbarComponent, FooterComponent, RouterModule]
})
export class FrontStoreModule { }
