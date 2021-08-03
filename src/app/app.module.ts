import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FrontStoreModule } from './front-store/front-store.module';
import { AdminModule } from './admin/admin.module';
import { LoaderModule } from './loader/loader.module';
import { CartService } from './front-store/services/cart.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NoopAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FrontStoreModule,
    AdminModule,
    LoaderModule,
  ],
  providers: [CartService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
