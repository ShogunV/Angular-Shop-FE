import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CategoryPipe } from '../../pipes/category.pipe';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(public categoryService: CategoryService, public authService: AuthService, public cartService: CartService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categoryService.categories = data['categories'];
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
